const express = require('express');

const {PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

const bodyParser = require('body-parser');

// const {User} = require('./models/index')

const app = express();
// const bcrypt = require('bcrypt');
const prepareAndStartServer = () => {

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended: true}));


  app.use('/api',apiRoutes);
  app.listen(PORT,async () => {
    console.log("Server Started on Port:  "  , PORT);

    // const incommingpassword = '12345';
    // const user =   await User.findByPk(5);
    // const response = bcrypt.compareSync(incommingpassword,user.password);

    // console.log(response);
  });


};

prepareAndStartServer();
