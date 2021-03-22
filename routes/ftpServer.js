const express=require('express');
const router = express.Router();
const ftpServerController = require("../controllers/ftpServer");
const loginController = require("../controllers/login");

router.get('/ftpservers',loginController.authenticateToken,ftpServerController.getAllFtpServers);
router.get('/ftpservers/:ftpserverId',loginController.authenticateToken,ftpServerController.getFtpServerById);
router.post('/ftpservers/create/',loginController.authenticateToken,ftpServerController.createFtpServer);
router.put('/ftpservers/update/:ftpserverId',loginController.authenticateToken,ftpServerController.updateFtpServer);
router.delete('/ftpservers/delete/:ftpserverId',loginController.authenticateToken,ftpServerController.deleteFtpServer);
module.exports = router;
