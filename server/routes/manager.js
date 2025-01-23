const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const managerRuls = require('../middlewares/managerRules');

//login
router.post('/login',
    managerRuls,
    managerController.login
);


//registration
router.post('/register',
    managerRuls,
    managerController.register
);
module.exports = router;