const { Comment } = require('../models');

const CommentData = [
  {
    "description": "This is very useful.",
    "post_id": 3,
    "user_id": 1
  },
  {
    "description": "Yeah, I need more practice in this area.",
    "post_id": 2,
    "user_id": 2  
  },
  {
    "description": "Wow, this is amazing!",
    "post_id": 1,
    "user_id": 3
  }
]
  
const seedComments = () => Comment.bulkCreate(CommentData);

module.exports = seedComments;