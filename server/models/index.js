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

db.Users = require('./user')(sequelize, Sequelize);
db.Boards = require('./board')(sequelize, Sequelize);
db.Docs = require('./doc')(sequelize, Sequelize);
db.Docs_Boards = require('./docs_board')(sequelize, Sequelize);
db.Docs_Images = require('./docs_image')(sequelize, Sequelize);
db.Entries = require('./entrie')(sequelize, Sequelize);
db.Images = require('./image')(sequelize, Sequelize);
db.Matches = require('./matche')(sequelize, Sequelize);
db.Records = require('./record')(sequelize, Sequelize);
db.Users_Docs = require('./users_doc')(sequelize, Sequelize);

module.exports = db;
