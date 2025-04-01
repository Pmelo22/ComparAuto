const Workshop = require('../models/Workshop');
const Service = require('../models/Service');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const geolocation = require('../utils/geolocation');

exports.getAllWorkshops = catchAsync(async (req, res, next) => {
  const { service, lat, lng, maxDistance = 5000 } = req.query;
  
  let query = {};
  
  if (service) {
    const serviceObj = await Service.findOne({ name: service });
    if (!serviceObj) {
      return next(new AppError('No service found with that name', 404));
    }
    query.services = serviceObj._id;
  }
  
  if (lat && lng) {
    query.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(maxDistance)
      }
    };
  }
  
  const workshops = await Workshop.find(query).populate('services');
  
  res.status(200).json({
    status: 'success',
    results: workshops.length,
    data: {
      workshops
    }
  });
});

exports.getWorkshop = catchAsync(async (req, res, next) => {
  const workshop = await Workshop.findById(req.params.id)
    .populate('services')
    .populate({
      path: 'reviews',
      select: 'rating comment user'
    });

  if (!workshop) {
    return next(new AppError('No workshop found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      workshop
    }
  });
});

exports.createWorkshop = catchAsync(async (req, res, next) => {
  if (!req.body.owner) req.body.owner = req.user.id;
  
  // Get coordinates from address if not provided
  if (!req.body.location && req.body.address) {
    const coords = await geolocation.getCoordinates(req.body.address);
    req.body.location = {
      type: 'Point',
      coordinates: [coords.lng, coords.lat],
      address: req.body.address
    };
  }
  
  const newWorkshop = await Workshop.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      workshop: newWorkshop
    }
  });
});

exports.updateWorkshop = catchAsync(async (req, res, next) => {
  const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!workshop) {
    return next(new AppError('No workshop found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      workshop
    }
  });
});

exports.deleteWorkshop = catchAsync(async (req, res, next) => {
  const workshop = await Workshop.findByIdAndDelete(req.params.id);

  if (!workshop) {
    return next(new AppError('No workshop found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});