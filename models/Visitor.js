const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  referrer: {
    type: String,
    required: false
  },
  page: {
    type: String,
    required: true,
    default: '/'
  },
  sessionId: {
    type: String,
    required: false
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown'
  },
  browser: {
    type: String,
    required: false
  },
  os: {
    type: String,
    required: false
  },
  visitDuration: {
    type: Number, // in seconds
    default: 0
  },
  pagesVisited: [{
    page: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  isReturning: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now
  }
});

// Indexes for analytics queries
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ ipAddress: 1 });
visitorSchema.index({ country: 1 });
visitorSchema.index({ deviceType: 1 });
visitorSchema.index({ isReturning: 1 });

module.exports = mongoose.model('Visitor', visitorSchema);
