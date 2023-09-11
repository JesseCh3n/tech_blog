const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await seedUsers();
  console.log('\n----- Users SEEDED -----\n');

  await seedPosts();
  console.log('\n----- Posts SEEDED -----\n');

  await seedComments();
  console.log('\n----- Comments SEEDED -----\n');

  process.exit(0);
};

seedDatabase();
