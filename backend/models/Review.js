const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  workshop: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workshop',
    required: [true, 'Review must belong to a workshop']
  },
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
    required: [true, 'Review must belong to a booking']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide a rating between 1 and 5']
  },
  comment: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Prevent duplicate reviews for the same booking
reviewSchema.index({ booking: 1 }, { unique: true });

// Static method to calculate average ratings
reviewSchema.statics.calcAverageRatings = async function(workshopId) {
  const stats = await this.aggregate([
    {
      $match: { workshop: workshopId }
    },
    {
      $group: {
        _id: '$workshop',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Workshop').findByIdAndUpdate(workshopId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await mongoose.model('Workshop').findByIdAndUpdate(workshopId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.workshop);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;