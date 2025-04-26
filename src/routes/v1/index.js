const express = require('express') ;

const userController = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');
const router = express.Router();


router.post('/signup',
    
    AuthRequestValidators.validateUserAuth,
    userController.create);
router.post('/signin',
    AuthRequestValidators.validateUserAuth,
    userController.SignIn);



router.get(
    '/isAuthenticated',
    userController.IsAuthenticated
)    

router.get('/isAdmin',
    AuthRequestValidators.validateIsAdminRequest,
    userController.isAdmin);

module.exports = router;
