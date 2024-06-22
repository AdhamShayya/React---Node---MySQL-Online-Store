module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", { // sequelize mainly for editing the db
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        description: {  
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Category.associate = (models) => { // models means all the models
        Category.hasMany(models.SubCategory, {
            onDelete: "cascade",  // when u delete a post then all the comments will be dropped
        });
    }
    return Category

}