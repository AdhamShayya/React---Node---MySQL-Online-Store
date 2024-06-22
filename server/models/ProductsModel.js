module.exports = (sequelize, DataTypes) => {

    const Products = sequelize.define("Products", { // sequelize mainly for editing the db
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {  
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, 
            allowNull: false,
        }
    })

    Products.associate = (models) => { // models means all the models
        Products.hasMany(models.Comments, {
            onDelete: "cascade",  // when u delete a post then all the comments will be dropped
        });
        Products.hasMany(models.Likes, {
            onDelete: "cascade",  
        });
        Products.hasMany(models.Cart, {
            onDelete: "cascade",  
        });
    }
    return Products

}