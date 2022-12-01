import bcrypt from "bcrypt";
import { db } from "../db";
import { v4 } from "uuid";

class User {
  static async createUserByEmailAndPassword(data) {
    data.password = bcrypt.hashSync(data.password, 12);
    data.id = v4();
    const newUser = db.user.create({
      data,
    });
    return newUser;
  }

  static async findUserByEmail(email) {
    const user = db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  static async findUserById(id) {
    const user = db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  static async updateUser({ id, name, nickName, phoneNumber }) {
    const user = db.user.update({
      where: {
        id,
      },
      data: {
        name,
        nickName,
        phoneNumber,
      },
    });
    return user;
  }

  static async updatePassword({ id, password }) {
    password = bcrypt.hashSync(password, 12);
    const user = db.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return user;
  }

  static async withdrawalUser({ id, role }) {
    const user = db.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return user;
  }
}
export { User };
