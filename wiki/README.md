# NexWiki

A modern, lightweight wiki application built with Node.js, Express, and MongoDB. Features a clean, responsive design and Markdown support.

![NexWiki Screenshot](screenshots/nexwiki.png)

## Features

- 📝 Create, read, update, and delete wiki articles
- ✨ Modern and responsive UI design
- 📱 Mobile-friendly interface
- ✍️ Markdown support for rich text formatting
- 🔍 Clean URLs with automatic slug generation
- 🎨 Beautiful typography with Inter font
- ⚡ Fast and lightweight

## Prerequisites

Before running NexWiki, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nexwiki.git
cd nexwiki
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system.

4. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

### Creating Articles
1. Click the "+" floating button on the home page
2. Enter a title and content
3. Use Markdown in the content field for formatting
4. Click "Create Article"

### Editing Articles
1. Click on an article to view it
2. Click the "Edit" button
3. Modify the title or content
4. Click "Save Changes"

### Deleting Articles
1. View the article you want to delete
2. Click the "Delete" button
3. Confirm the deletion

## Markdown Support

NexWiki supports standard Markdown syntax:

- Headers (# H1, ## H2, etc.)
- Lists (bulleted and numbered)
- Links [text](url)
- Images ![alt](url)
- Bold **text**
- Italic *text*
- Code blocks ```code```
- And more!

## Project Structure

```
nexwiki/
├── models/
│   └── article.js     # MongoDB article model
├── views/
│   ├── layout.ejs     # Main layout template
│   ├── index.ejs      # Home page
│   ├── show.ejs       # Article view
│   ├── new.ejs        # New article form
│   ├── edit.ejs       # Edit article form
│   └── _form_fields.ejs # Shared form fields
├── app.js            # Main application file
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## Dependencies

- express - Web framework
- mongoose - MongoDB object modeling
- ejs - Template engine
- marked - Markdown parsing
- method-override - HTTP method override
- express-ejs-layouts - Layout support
- body-parser - Request body parsing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Inter Font](https://rsms.me/inter/) - Typography
