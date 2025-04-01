const Booking = require('../models/Booking');
const Workshop = require('../models/Workshop');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const emailService = require('../utils/emailService');

exports.getAllBookings = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.workshopId) filter.workshop = req.params.workshopId;
  if (req.user.role === 'user') filter.user = req.user.id;
  if (req.user.role === 'workshop') {
    const workshops = await Workshop.find({ owner: req.user.id });
    filter.workshop = { $in: workshops.map(w => w._id) };
  }

  const bookings = await Booking.find(filter);

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings
    }
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  // Check if user has permission to access this booking
  if (req.user.role === 'user' && booking.user.toString() !== req.user.id.toString()) {
    return next(new AppError('You do not have permission to view this booking', 403));
  }

  if (req.user.role === 'workshop') {
    const workshop = await Workshop.findById(booking.workshop);
    if (workshop.owner.toString() !== req.user.id.toString()) {
      return next(new AppError('You do not have permission to view this booking', 403));
    }
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  
  const workshop = await Workshop.findById(req.body.workshop);
  if (!workshop) {
    return next(new AppError('No workshop found with that ID', 404));
  }

  const service = await Service.findById(req.body.service);
  if (!service) {
    return next(new AppError('No service found with that ID', 404));
  }

  const newBooking = await Booking.create(req.body);

  // Send confirmation email
  const user = await User.findById(req.user.id);
  await emailService.sendBookingConfirmation(user, workshop, newBooking);

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking
    }
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});