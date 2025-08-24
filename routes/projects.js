const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Project = require('../models/Project');

// Validation schema
const projectSchema = Joi.object({
  title: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(10).max(500).required(),
  technologies: Joi.array().items(Joi.string().trim()).min(1).required(),
  githubUrl: Joi.string().uri().optional().allow(''),
  liveUrl: Joi.string().uri().optional().allow(''),
  imageUrl: Joi.string().uri().optional().allow(''),
  featured: Joi.boolean().optional(),
  status: Joi.string().valid('completed', 'in-progress', 'planned').optional(),
  category: Joi.string().valid('web', 'mobile', 'ai-ml', 'fullstack', 'frontend', 'backend').required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  order: Joi.number().optional()
});

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const featured = req.query.featured === 'true';
    const category = req.query.category;
    const status = req.query.status;
    const limit = parseInt(req.query.limit) || 10;

    let query = {};
    if (featured) query.featured = true;
    if (category) query.category = category;
    if (status) query.status = status;

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(limit)
      .select('-__v');

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (add auth later)
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const project = new Project(value);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (add auth later)
router.put('/:id', async (req, res) => {
  try {
    // Validate input
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (add auth later)
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/projects/:id/like
// @desc    Like/unlike project
// @access  Public
router.put('/:id/like', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.likes += 1;
    await project.save();

    res.json({
      success: true,
      message: 'Project liked',
      likes: project.likes
    });

  } catch (error) {
    console.error('Like project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
