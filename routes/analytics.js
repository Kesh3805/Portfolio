const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const Contact = require('../models/Contact');
const Project = require('../models/Project');

// @route   POST /api/analytics/visit
// @desc    Track visitor
// @access  Public
router.post('/visit', async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    const { page, referrer, sessionId } = req.body;

    // Check if visitor exists (returning visitor)
    const existingVisitor = await Visitor.findOne({ ipAddress });
    const isReturning = !!existingVisitor;

    // Parse user agent for device info (basic parsing)
    const deviceType = userAgent && userAgent.includes('Mobile') ? 'mobile' : 
                      userAgent && userAgent.includes('Tablet') ? 'tablet' : 'desktop';

    const visitor = new Visitor({
      ipAddress,
      userAgent,
      page: page || '/',
      referrer,
      sessionId,
      deviceType,
      isReturning,
      pagesVisited: [{ page: page || '/', timestamp: new Date() }]
    });

    await visitor.save();

    res.json({
      success: true,
      message: 'Visit tracked',
      isReturning
    });

  } catch (error) {
    console.error('Track visit error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/analytics/stats
// @desc    Get portfolio analytics
// @access  Private (add auth later)
router.get('/stats', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30'; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeframe));

    // Visitor stats
    const totalVisitors = await Visitor.countDocuments();
    const recentVisitors = await Visitor.countDocuments({ 
      createdAt: { $gte: startDate } 
    });
    const returningVisitors = await Visitor.countDocuments({ 
      isReturning: true,
      createdAt: { $gte: startDate }
    });

    // Device breakdown
    const deviceStats = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$deviceType', count: { $sum: 1 } } }
    ]);

    // Contact stats
    const totalContacts = await Contact.countDocuments();
    const recentContacts = await Contact.countDocuments({ 
      createdAt: { $gte: startDate } 
    });

    // Project stats
    const totalProjects = await Project.countDocuments();
    const projectViews = await Project.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // Popular projects
    const popularProjects = await Project.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views likes');

    // Daily visitors (last 7 days)
    const dailyVisitors = await Visitor.aggregate([
      { 
        $match: { 
          createdAt: { 
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
          } 
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        visitors: {
          total: totalVisitors,
          recent: recentVisitors,
          returning: returningVisitors,
          daily: dailyVisitors
        },
        devices: deviceStats,
        contacts: {
          total: totalContacts,
          recent: recentContacts
        },
        projects: {
          total: totalProjects,
          totalViews: projectViews[0]?.totalViews || 0,
          popular: popularProjects
        }
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/analytics/visitors
// @desc    Get visitor details
// @access  Private (add auth later)
router.get('/visitors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-userAgent'); // Hide sensitive info

    const total = await Visitor.countDocuments();

    res.json({
      success: true,
      data: visitors,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get visitors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
