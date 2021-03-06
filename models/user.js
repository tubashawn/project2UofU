module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        facebookId: DataTypes.STRING,
        googleId: DataTypes.STRING,
        password: DataTypes.STRING,
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        }
    }, {
            hooks: {
                beforeFind: function (options) {
                    options.attributes = {};
                    options.attributes.exclude = ["createdAt", "updatedAt", "password", "facebookId", "googleId"];
                    return options;
                }
            }
        }
    );

    User.associate = function (models) {
        User.hasMany(models.Competition, { foreignKey: "ownerId", onDelete: "cascade" });
        User.hasMany(models.CompetitionEntry, { as: "entries", foreignKey: "userId", onDelete: "cascade" });
        
        // TODO: as: should probably be competitions
        User.hasMany(models.UserCompetition, { as: "participants", foreignKey: "participantId", onDelete: "cascade" });
    };

    return User;
};
