import sequelize from "@/config/db";
import Sequelize from "sequelize";

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uniqueFaceId: {
    type: Sequelize.STRING,
    get: function () {
      return JSON.parse(this.getDataValue("uniqueFaceId"));
    },
    set: function (val) {
      return this.setDataValue("uniqueFaceId", JSON.stringify(val));
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

User.sync({ force: false });

export default User;
