
const { Blogs, BlogsDrafts } = require('../models/blogs');
const HanlderAsync = require("express-async-handler");
const PATH = process.env.FILE_URL;
//save blogsdata
const BlogsSave = HanlderAsync(async (req, res, next) => {
    const { title, catagories, blogspost } = req.body;
    const blogs = Blogs({
        title,
        catagories,
        featuredimg: PATH + "public/" + req.file.filename,
        blogspost
    })
    await blogs.save((error, data) => {
        if (data) {
            res.status(201).json({
                title: blogs.title,
                catagories: blogs.catagories,
                featuredimg: blogs.featuredimg,
                blogspost: blogs.blogspost
            })
        }
        if (error) {
            res.status(400).json({ error: "Unable to save the form data" });
        }
    })
})
//find all the blogs data
const BlogsFindAll = HanlderAsync(async (req, res, next) => {
    try {
        const BlogsAll = await Blogs.find({});
        if (BlogsAll) {
            res.status(201).json(BlogsAll)
        }
    }
    catch (error) {
        res.status(400).json({ error: error })
    }

})
//find the blogs data by id
const BlogsFindByID = HanlderAsync(async (req, res, next) => {
    try {
        const BlogsById = await Blogs.findById(req.params.id);
        if (BlogsById) {
            res.status(201).json(BlogsById)
        }

    }
    catch (error) {
        res.status(400).json({ error: error })
    }
})
//update the blogs data by id
const UpdateBlogs = HanlderAsync(async (req, res, next) => {
    try {
        const { title, catagories, blogspost } = req.body;
        const featuredimg = PATH + "public/" + req.file.filename;
        const UpdatedBlogs = await Blogs.findByIdAndUpdate(req.params.id, { $set: { title, catagories, featuredimg, blogspost } }, { new: true })
        if (UpdatedBlogs) {
            res.status(201).json(UpdatedBlogs);
        }
    }
    catch (error) {
        res.status(400).json({ error: error })
    }

})
//delete the blogs data by id
const deleteBlogs = HanlderAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBlog = Blogs.findByIdAndDelete({ id });
        if (deletedBlog) {
            res.status(201).json(deletedBlog)
        }
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
})
//save to database
const BlogsDraft = HanlderAsync(
    async (req, res, next) => {
        const { title, catagories, blogspost } = req.body;
        const blogsDraftsSave = BlogsDrafts({
            title,
            catagories,
            featuredimg: PATH + "public/" + req.file.filename,
            blogspost
        })

        await blogsDraftsSave.save((error, data) => {

            if (data) {
                res.json({
                    title: blogsDraftsSave.title,
                    catagories: blogsDraftsSave.catagories,
                    featuredimg: blogsDraftsSave.featuredimg,
                    blogspost: blogsDraftsSave.blogspost
                })
            }
            if (error) {
                res.json({ error: "Unable to save the blogs data" })
            }
        })
    }
);

// //find all the blogs data
const BlogsDraftsFindAll = HanlderAsync(async (req, res, next) => {

    try {
        const BlogsAll = await BlogsDrafts.find({});

        if (BlogsAll) {
            res.status(201).json(BlogsAll)
        }

    }
    catch (error) {
        res.status(400).json({ error: error })
    }

})
//find the blogs data by id
const BlogsFindByIDdrafts = HanlderAsync(async (req, res, next) => {
    try {
        const BlogsById = await BlogsDrafts.findById(req.params.id);
        if (BlogsById) {
            res.status(201).json(BlogsById)
        }

    }
    catch (error) {
        res.status(400).json({ error: error })
    }
})
//update the blogs data by id
const UpdateBlogsDrafts = HanlderAsync(async (req, res, next) => {
    try {
        const { title, catagories, blogspost } = req.body;
        const featuredimg = PATH + "public/" + req.file.filename;
        const UpdatedBlogs = await BlogsDrafts.findByIdAndUpdate(req.params.id, { $set: { title, catagories, featuredimg, blogspost } }, { new: true })
        if (UpdatedBlogs) {
            res.status(201).json(UpdatedBlogs);
        }
    }
    catch (error) {
        res.status(400).json({ error: error })
    }

})
//delete the blogs data by id
const deleteBlogsDrafts = HanlderAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBlog = Blogs.findByIdAndDelete({ id });
        if (deletedBlog) {
            res.status(201).json(deletedBlog)
        }
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
})
const filterAllBlogs = HanlderAsync(

    async (req, res, next) => {

        try {
            const PAGE_SIZE = 5;
            //get the page from the query
            const page = parseInt(req.query.page || "0");
            //returns the total documents present
            const total = await Blogs.countDocuments({});
            //limits the documents at the same time skips the previous documents
            const blogs = await Blogs.find({})
                .limit(PAGE_SIZE)
                .skip(PAGE_SIZE * page);
            //return total number of pages and filtered blogs
            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                blogs
            })
        }
        catch (error) {
            res.status(400).json({ error: error })
        }
    }
)
module.exports =
{
    BlogsSave,
    BlogsFindAll,
    BlogsFindByID,
    UpdateBlogs,
    deleteBlogs,
    BlogsDraft,
    BlogsDraftsFindAll,
    BlogsFindByIDdrafts,
    UpdateBlogsDrafts,
    deleteBlogsDrafts,
    filterAllBlogs
};