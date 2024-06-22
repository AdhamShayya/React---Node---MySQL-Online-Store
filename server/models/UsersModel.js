module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Users.associate = (models) => { // models means all the models
      Users.hasMany(models.Likes, {
        onDelete: "cascade",  // all the likes will be dropped when u delete the user
      })
      Users.hasMany(models.Products, {
        onDelete: "cascade",  
    })
    Users.hasMany(models.Cart, {
      onDelete: "cascade",  
  })
  }
    return Users;
  };