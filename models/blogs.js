const moongose = require('mongoose');
const Schema = moongose.Schema;
const BlogsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    catagories: {
        type: String,
        required: true
    },
    blogspost: {
        type: String,
        required: true
    },
    featuredimg: {
        type: String,
        required: true
    },

}, { timestamps: true })
const Blogs = moongose.model("BlogsSave", BlogsSchema);
const BlogsDrafts = moongose.model("BlogsDrafts", BlogsSchema);
module.exports = { Blogs, BlogsDrafts };
