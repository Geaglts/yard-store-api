const { Router } = require('express');
const response = require('../../../utils/response');

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    response(res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    response(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
