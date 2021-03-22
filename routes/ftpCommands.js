const express=require('express');
const router = express.Router();
const ftpCommandsController = require("../controllers/ftpCommands");
const loginController = require("../controllers/login");

router.post('/ftpservers/ftpcommande/connect',loginController.authenticateToken,ftpCommandsController.connect);
router.get('/ftpservers/ftpcommande/pwd/:ftpserverId',loginController.authenticateToken,ftpCommandsController.pwd);
router.get('/ftpservers/ftpcommande/list/:ftpserverId',loginController.authenticateToken,ftpCommandsController.list);
router.get('/ftpservers/ftpcommande/download/:ftpserverId',loginController.authenticateToken,ftpCommandsController.download);
router.get('/ftpservers/ftpcommande/upload/:ftpserverId',loginController.authenticateToken,ftpCommandsController.upload);
router.put('/ftpservers/ftpcommande/rename/:ftpserverId',loginController.authenticateToken,ftpCommandsController.rename);
router.delete('/ftpservers/ftpcommande/remove/:ftpserverId',loginController.authenticateToken,ftpCommandsController.remove);
module.exports = router;
