module.exports = function (sequelize, DataTypes) {
    var Competition = sequelize.define("Competition", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }, public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }, id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        }, startDate: {
            type: DataTypes.DATE,
            allowNull: false
        }, endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Competition.associate = function (models) {
        Competition.belongsTo(models.User, { as: 'owner', foreignKey: { allowNull: false } });
        Competition.hasMany(models.CompetitionEntry, {  as: "entries", foreignKey: 'competitionId', onDelete: 'cascade' });

        // TODO: as: should probably be participants
        Competition.hasMany(models.UserCompetition, { as: "competitions", foreignKey: 'competitionId', onDelete: 'cascade' });
    };

    return Competition;
};
