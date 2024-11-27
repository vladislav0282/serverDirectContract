import ApiError from "../errors/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/mapping.js";

const generateJvt = (id, firstName, lastName) => {
  return jwt.sign({ id, firstName, lastName }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { firstName, lastName, gender, address, city, phone, email, status} = req.body;

    // if (!firstName || !lastName) {
    //   return next(ApiError.badRequest("Некорректный firstName или lastName"));
    // }

    const candidateFirstName = await User.findOne({ where: { firstName } });
    const candidateLastName = await User.findOne({ where: { firstName } });

    if (candidateLastName && candidateFirstName) {
      return next(
        ApiError.badRequest("Пользователь уже существует")
      );
    }

    const user = await User.create({ firstName, lastName, gender, address, city, phone, email, status });
    const token = generateJvt(user.id, user.firstName, user.lastName);
    return res.status(201).json({ message: "Пользователь создан. Используйте токен для авторизации.", token });
  }

  async login(req, res, next) {
    const { firstName } = req.body; //делаем диструктуризацию
    const user = await User.findOne({ where: { firstName } }); //получаем пользователя

    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
      const token = generateJvt(user.id, user.firstName, user.lastName);
      return res.status(201).json({ message: "Пользователь авторизован. Используйте токен для авторизации", token });
    
  }

  async getAll(req, res) {
    let {id, limit, page} = req.query;
    page = page || 1;
    limit = limit || 1000;
    let offset = page * limit - limit;
    let users
    if(!id){
      users = await User.findAndCountAll({limit, offset})
    }
    return res.json(users);
  }

  async getUserById(req, res) {
    let { id } = req.params;
    let user = await User.findOne({
      where: { id },
    });
    res.json(user);
  }

  async getStatusByIds(req, res, next) {
    const { ids } = req.body;
  
    if (!ids || ids.length === 0) {
      return next(ApiError.badRequest("Необходимо передать список ID пользователей"));
    }
  
    const users = await User.findAll({
      where: {
        id: ids
      },
      attributes: ['id', 'status']
    });
  
    const userStatuses = users.map(user => ({
      id: user.id,
      status: user.status
    }));
  
    return res.json(userStatuses);
  }

  }



export default new UserController();
