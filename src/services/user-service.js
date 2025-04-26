const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
class UserService {

    constructor() {
        this.UserRepository = new UserRepository();


    }

    async create(data) {
        try {
            const user = await this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw error;

        }
    }

    async signIn(email,PlainPassword) {
        try {
            const user = await this.UserRepository.getByEmail(email);

            const passwordsMatch = this.checkPassword(PlainPassword,user.password);
            if(!passwordsMatch){
                console.log("Passwords does not match");
                throw {error: 'Incorrect password'};
            }

            const newJWT = this.createToken({email:user.email, id:user.id});
            return newJWT;
        } catch(error){
            console.log("Something went wrong in the Signin Process",error);

            throw error;
        }
    }


    async isAuthenticated(token) {

         try{
            const response = this.verifyToken(token);
            if(!response){
              
                throw {error: 'Invalid token'};
            }

            const user = await this.UserRepository.getById(response.id);

            if(!user){
                throw{error:'No user with corresponding token exists'};
            }

            return user.id;

         }catch(error){
            console.log("Something went wrong in auth process");
            throw error;
         }



    }




    createToken(user) {
        try {
           const result = jwt.sign(user,JWT_KEY,{
            expiresIn: '1d'
           });

           return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
         
    }



    verifyToken(token) {
        try{
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch(error){
            console.log("Something went wrong in token verification", error);
            throw error;
        }
    }


    checkPassword(userInputPLainPassword,encryptedPassword) {
        try{
            return bcrypt.compareSync(userInputPLainPassword,encryptedPassword);

        }catch(error){
            console.log("Something went wrong in password verification", error);
            throw error;
        }
    }


   
    isAdmin(userId){
        try{
              return this.UserRepository.idAdmin(userId);
        }catch(error){
            console.log("Something went wrong in admin verification", error);
            throw error;
        }
    }

}


module.exports = UserService;