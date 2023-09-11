const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'name', 'description', 'date_created'],
      include: [
        {
          model: Comment,  
          include: {
            model: User,
            attributes: ['name'],
          }
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/posts/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       attributes: ['id', 'name', 'description', 'date_created'],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'description', 'date_created'],          
//           include: {
//             model: User,
//             attributes: ['name'],
//           }
//         },
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });
//     res.render('single-post', {
//       post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'name', 'description', 'date_created'],
      include: [
        {
          model: Comment,  
          include: {
            model: User,
            attributes: ['name'],
          }
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      user: req.session.user_name,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
