const mongoose = require('mongoose');
const marked = require('marked');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title);
    }
    next();
});

articleSchema.methods.markdownToHtml = function() {
    return marked(this.content);
};

function slugify(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

module.exports = mongoose.model('Article', articleSchema);
