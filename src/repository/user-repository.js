const { EmptyResultError } = require("sequelize");
const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong on repo layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repo layer");
      throw error;
    }
  }



  async getById(userId){
    try {
      const user = await User.findByPk(userId , {
        attributes: ['email','id']
      });      return user;

    } catch (error) {
      console.log("Something went wrong on repo layer");
      throw error;
    }
  }


  async getByEmail(UserEmail){
    try{
       const user = await User.findOne({where: {
        email : UserEmail,
       }});
       return user;
    }catch(error){
       console.log("Something went wrong in getting user by email", error);
       throw error;
    }
  }

}

module.exports = UserRepository;
