const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const projects = [
  {
    title: 'SonicMirror',
    description: 'AI-Powered Spotify Music Psychology app that provides brutally honest, psychologically deep insights into users\' music listening habits using Gemini AI.',
    technologies: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Spotify API', 'Gemini AI', 'Framer Motion'],
    githubUrl: 'https://github.com/Kesh3805/SonicMirror.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    featured: true,
    status: 'completed',
    category: 'ai-ml',
    order: 1
  },
  {
    title: 'WoundLog',
    description: '"Write it. Feel it. Bleed it. Heal it." A poetic journaling platform with a social "Bleed Wall" where users can anonymously share their emotional wounds.',
    technologies: ['Next.js 14', 'TypeScript', 'MongoDB', 'JWT Auth', 'Framer Motion', 'TailwindCSS'],
    githubUrl: 'https://github.com/Kesh3805/WoundLog.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop',
    featured: true,
    status: 'completed',
    category: 'fullstack',
    order: 2
  },
  {
    title: 'QuoteQuest',
    description: 'A beautifully crafted, modern quote application that transforms the simple act of reading quotes into an elegant, interactive experience.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Express', 'Animations'],
    githubUrl: 'https://github.com/Kesh3805/QuoteQuest.git',
    liveUrl: '',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop',
    featured: true,
    status: 'completed',
    category: 'frontend',
    order: 3
  }
];

async function seedProjects() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert new projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`✅ Seeded ${insertedProjects.length} projects`);

    // Display seeded projects
    insertedProjects.forEach(project => {
      console.log(`   - ${project.title} (${project.category})`);
    });

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📦 Database connection closed');
    process.exit(0);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedProjects();
}

module.exports = { seedProjects, projects };
