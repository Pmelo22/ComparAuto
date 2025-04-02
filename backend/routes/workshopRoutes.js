const express = require('express');
const workshopController = require('../controllers/workshopController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Nested routes for reviews
router.use('/:workshopId/reviews', reviewRouter);

router
  .route('/')
  .get(workshopController.getAllWorkshops)
  .post(
    authController.protect,
    authController.restrictTo('workshop', 'admin'),
    workshopController.createWorkshop
  );

router
  .route('/:id')
  .get(workshopController.getWorkshop)
  .patch(
    authController.protect,
    authController.restrictTo('workshop', 'admin'),
    workshopController.updateWorkshop
  )
  .delete(
    authController.protect,
    authController.restrictTo('workshop', 'admin'),
    workshopController.deleteWorkshop
  );

module.exports = router;