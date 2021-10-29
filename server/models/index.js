'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.cjs')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./users')(sequelize, Sequelize);
db.Boards = require('./boards')(sequelize, Sequelize);
db.Docs = require('./docs')(sequelize, Sequelize);
db.Docs_Boards = require('./docs_boards')(sequelize, Sequelize);
db.Docs_Images = require('./docs_images')(sequelize, Sequelize);
db.Entries = require('./entries')(sequelize, Sequelize);
db.Images = require('./images')(sequelize, Sequelize);
db.Matches = require('./matches')(sequelize, Sequelize);
db.Records = require('./records')(sequelize, Sequelize);
db.Users_Docs = require('./users_docs')(sequelize, Sequelize);
db.Rooms = require('./rooms')(sequelize, Sequelize);
db.Chattings = require('./chattings')(sequelize, Sequelize);

module.exports = db;
