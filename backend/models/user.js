const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

const createDefaultUser = async () => {
  const userExists = await User.findOne({ where: { username: 'james' } });

  if (!userExists) {
    await User.create({
      username: 'james',
      password: 'james'
    });
    console.log('Utilisateur par défaut "james" créé avec succès.');
  } else {
    console.log('Utilisateur "james" existe déjà.');
  }
};


module.exports = { User, createDefaultUser };