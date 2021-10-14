const { Router } = require('express');

const reponse = require('../../../utils/response');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    reponse({ res, body: [] });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    reponse({ res, message: 'creado correctamente', status: 201 });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    reponse({ res, body: [] });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    reponse({ res, message: 'eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
