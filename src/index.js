const express = require('express');

const {PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

const bodyParser = require('body-parser');
const UserRepository = require('./repository/user-repository');
const UserService = require('./services/user-service');

const {User,Role} = require('./models/index')
const db = require('./models/index');
const app = express();
// const bcrypt = require('bcrypt');
const prepareAndStartServer = () => {

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended: true}));


  app.use('/api',apiRoutes);
  app.listen(PORT,async () => {
    console.log("Server Started on Port:  "  , PORT);


   if(process.env.DB_SYNC){
           db.sequelize.sync({alter:true});
   }

       const u1 = await User.findByPk(3);
       const r1 = await Role.findByPk(3);

      //  u1.addRole(r1);


       const response = await u1.hasRole(r1);
       console.log(response);










  //  const service = new UserService();
  //  const newTOken = service.createToken({email:'aasthatyagi@gmai.com', id:1});
  //  console.log(newTOken);

  // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhc3RoYXR5YWdpQGdtYWkuY29tIiwiaWQiOjEsImlhdCI6MTc0NTQ0MTU3NywiZXhwjoxNzQ1NDQ1MTc3fQ.hiu9xNCz57asbWAhn-HC9zWnPMhgxKJyNtsu3FmF0lw';
  // const response = service.verifyToken(token);
  // console.log(response);
    // const repo = new UserRepository();

    // const response = await repo.getById(1);
    // console.log(response);
    // const incommingpassword = '12345';
    // const user =   await User.findByPk(5);
    // const response = bcrypt.compareSync(incommingpassword,user.password);

    // console.log(response);
  });


};

prepareAndStartServer();


// in get request we expect the data in url params whereas in post request we expect the data in body of the request