const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/wiki', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Add error handler for MongoDB connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

// Middleware
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Models
const Article = require('./models/article');

// Routes
app.get('/', async (req, res, next) => {
    try {
        const articles = await Article.find().sort({ title: 1 });
        res.render('index', { articles });
    } catch (err) {
        next(err);
    }
});

app.get('/new', (req, res) => {
    res.render('new', { article: new Article() });
});

app.get('/:slug', async (req, res, next) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (article) {
            res.render('show', { article });
        } else {
            res.status(404).render('error', {
                message: 'Article not found',
                error: { status: 404 }
            });
        }
    } catch (err) {
        next(err);
    }
});

app.post('/', async (req, res, next) => {
    let article = new Article({
        title: req.body.title,
        content: req.body.content
    });
    try {
        article = await article.save();
        res.redirect(`/${article.slug}`);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.render('new', { 
                article,
                error: { message: 'Validation Error', details: err.errors }
            });
        } else {
            next(err);
        }
    }
});

app.put('/:slug', async (req, res, next) => {
    try {
        let article = await Article.findOne({ slug: req.params.slug });
        if (!article) {
            return res.status(404).render('error', {
                message: 'Article not found',
                error: { status: 404 }
            });
        }
        
        article.title = req.body.title;
        article.content = req.body.content;
        article = await article.save();
        res.redirect(`/${article.slug}`);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.render('edit', { 
                article: req.body,
                error: { message: 'Validation Error', details: err.errors }
            });
        } else {
            next(err);
        }
    }
});

app.delete('/:slug', async (req, res, next) => {
    try {
        const article = await Article.findOneAndDelete({ slug: req.params.slug });
        if (!article) {
            return res.status(404).render('error', {
                message: 'Article not found',
                error: { status: 404 }
            });
        }
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

app.get('/:slug/edit', async (req, res, next) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article) {
            return res.status(404).render('error', {
                message: 'Article not found',
                error: { status: 404 }
            });
        }
        res.render('edit', { article });
    } catch (err) {
        next(err);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        message: 'Page not found',
        error: { status: 404 }
    });
});

app.listen(PORT, () => {
    console.log(`Wiki app listening at http://localhost:${PORT}`);
});
