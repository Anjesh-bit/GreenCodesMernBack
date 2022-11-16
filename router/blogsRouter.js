const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const
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
    }
        = require('../controllers/blogController');

router.post("/blogSave", upload, BlogsSave);
router.get("/blogsAllData", BlogsFindAll);
router.get("/blogsDraftFindall", BlogsDraftsFindAll);
router.get("/paginatedBlogs", filterAllBlogs);
router
    .route("/:id")
    .get(BlogsFindByID)
    .put(upload, UpdateBlogs)
    .delete(deleteBlogs)

router.post("/blogsDraftSave", upload, BlogsDraft);
router.route("/drafts/:id")
    .get(BlogsFindByIDdrafts)
    .put(upload, UpdateBlogsDrafts)
    .delete(deleteBlogsDrafts);


module.exports = router;