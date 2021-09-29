module.exports = (sequelize,DataTypes)=>{
    sequelize.define('user',{
        gameName:{
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        userId:{
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },{
        timestamps: true,
        paranoid: true,
    })
};