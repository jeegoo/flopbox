
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const loginController = require("../controllers/login");

router.get('/users',loginController.authenticateToken,userController.getAllUsers);
router.get('/users/:userId',loginController.authenticateToken,userController.getUserById);
router.post('/users/create',loginController.authenticateToken,userController.createUser);
router.put('/users/update/:userId',loginController.authenticateToken,userController.updateUser);
router.delete('/users/delete/:userId',loginController.authenticateToken,userController.deleteUser);

module.exports = router;
