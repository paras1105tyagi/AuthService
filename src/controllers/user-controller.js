const UserService = require('../services/user-service');

const userService = new UserService();
const error = require('../utils/error-handler');
const StatusCodes = require('http-status-codes')
const create = async(req,res) => {

    try {
         const response = await userService.create({
            email: req.body.email,
            password:req.body.password
         });

         return res.status(201).json({
            success:true,
            message : 'Successfully created a new user',
            data : response,
            err: {}
         })
    } catch (error) {
        console.log(error);

        return res.status(error.StatusCode).json({
         message: error.message,
         data: {},
         success: false,
         err: error.explanation
        });
    }

}
    const SignIn = async(req,res) => {
        try {
            const response = await userService.signIn(req.body.email,req.body.password);
            return res.status(200).json({
                success:true,
                message : 'Successfully signed in',
                data : response,
                err: {}
            })  ;
            
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json( {
                message: error.message,
                data: {},
                success: false,
                err: error.explanation
            })
        }
    }

const IsAuthenticated = async(req,res) => {
    try {
      
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            message : 'Successfully authenticated',
            data : response,
            err: {}
        })  ;

    } catch (error) {
        console.log(error);
        return res.status(500).json( {
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}
const isAdmin = async(req,res) => {

    try {
     const response = await userService.isAdmin(req.body.id);
     return res.status(200).json({
        data:response,
        err:{},
        success:true,
        message: "Successfully fetched whether user is admin or not"
     })} catch (error){
        console.log(error);
        return res.status(500).json({
            message: 'Sonmething went wrong',
            data: {},
            success: false,
            err: error
        });
     }

}
module.exports ={
    create,SignIn,IsAuthenticated,isAdmin
}