const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/wiki', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Models
const Article = require('./models/article');

// Routes
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ title: 1 });
    res.render('index', { articles });
});

app.get('/new', (req, res) => {
    res.render('new', { article: new Article() });
});

app.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article) {
        res.render('show', { article });
    } else {
        res.redirect('/');
    }
});

app.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        content: req.body.content
    });
    try {
        article = await article.save();
        res.redirect(`/${article.slug}`);
    } catch (e) {
        res.render('new', { article });
    }
});

app.put('/:slug', async (req, res) => {
    let article = await Article.findOne({ slug: req.params.slug });
    article.title = req.body.title;
    article.content = req.body.content;
    try {
        article = await article.save();
        res.redirect(`/${article.slug}`);
    } catch (e) {
        res.render('edit', { article });
    }
});

app.delete('/:slug', async (req, res) => {
    await Article.findOneAndDelete({ slug: req.params.slug });
    res.redirect('/');
});

app.get('/:slug/edit', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    res.render('edit', { article });
});

app.listen(PORT, () => {
    console.log(`Wiki app listening at http://localhost:${PORT}`);
});
