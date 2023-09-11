const { Post } = require('../models');

const postData = [
  {
    "name": "Front End Web Design",
    "description": "Front-end web development is the development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website.",
    "user_id": 1
  },
  {
    "name": "Javascript",
    "description": "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions.",
    "user_id": 2
  },
  {
    "name": "Callback",
    "description": "In computer programming, a callback or callback function is any reference to executable code that is passed as an argument to another piece of code; that code is expected to call back (execute) the callback function as part of its job.",
    "user_id": 3
  }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
