const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  githubUrl: {
    type: String,
    required: false,
    match: [/^https:\/\/github\.com\/.*/, 'Please enter a valid GitHub URL']
  },
  liveUrl: {
    type: String,
    required: false,
    match: [/^https?:\/\/.*/, 'Please enter a valid URL']
  },
  imageUrl: {
    type: String,
    required: false,
    match: [/^https?:\/\/.*/, 'Please enter a valid image URL']
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'ai-ml', 'fullstack', 'frontend', 'backend'],
    required: true
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for better query performance
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
