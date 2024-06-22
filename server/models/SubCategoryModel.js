module.exports = (sequelize, DataTypes) => {

    const SubCategory = sequelize.define("SubCategory", { // sequelize mainly for editing the db
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

    SubCategory.associate = (models) => { // models means all the models
        SubCategory.hasMany(models.Products, {
            onDelete: "cascade",  
        });
    }
    return SubCategory

}