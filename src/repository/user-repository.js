const { EmptyResultError } = require("sequelize");
const { User,Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");
const ClientError = require("../utils/client-error");

const { StatusCodes } = require('http-status-codes');
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
if(error.name === "SequelizeValidationError"){
      throw new ValidationError(error);
      
}
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

       if(!user){
        throw new ClientError(
          'AttributeNotFound',
          'Invalid Email sent in the requeest',
          'Please check the email as there is no record of the email',
          StatusCodes.NOT_FOUND
        );
       }
       return user;
    }catch(error){
       console.log("Something went wrong in getting user by email", error);
       throw error;
    }
  }


  async idAdmin(userId){
       const user = await User.findByPk(userId);
       const adminRole = await Role.findOne({
        where: {
          name: 'ADMIN',
        }
       });

       return user.hasRole(adminRole);
  } catch(error){
    console.log("Something went wrong on repository layer");
    throw error;
  }

}

module.exports = UserRepository;
