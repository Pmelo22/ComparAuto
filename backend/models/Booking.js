const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  workshop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workshop',
    required: [true, 'Booking must belong to a workshop']
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: 'Service',
    required: [true, 'Booking must be for a service']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price']
  },
  vehicle: {
    model: String,
    year: Number,
    licensePlate: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Please provide a scheduled date']
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate('workshop').populate('service');
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;