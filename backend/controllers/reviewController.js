const Review = require('../models/Review');
const Booking = require('../models/Booking');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.workshopId) filter.workshop = req.params.workshopId;

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Check if the user has a completed booking with this workshop
  const booking = await Booking.findOne({
    user: req.user.id,
    workshop: req.body.workshop,
    status: 'completed'
  });

  if (!booking) {
    return next(new AppError('You can only review workshops you have booked and completed services with', 400));
  }

  // Check if user already reviewed this workshop for this booking
  const existingReview = await Review.findOne({
    user: req.user.id,
    booking: booking._id
  });

  if (existingReview) {
    return next(new AppError('You have already reviewed this booking', 400));
  }

  req.body.user = req.user.id;
  req.body.booking = booking._id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if the user is the author of the review
  if (review.user.toString() !== req.user.id.toString()) {
    return next(new AppError('You can only update your own reviews', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  // Check if the user is the author of the review or an admin
  if (review.user.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
    return next(new AppError('You can only delete your own reviews', 403));
  }

  await review.remove();

  res.status(204).json({
    status: 'success',
    data: null
  });
});