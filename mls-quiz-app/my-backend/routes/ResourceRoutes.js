const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Resource = require('../models/Resource');
const authenticate = require('../middleware/auth');

// Fetch all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().populate('createdBy', 'username');
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// Inject new resource (Faculty only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, url, category, desc } = req.body;
    const newResource = new Resource({
      title,
      url,
      category,
      desc,
      createdBy: req.user.id
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error injecting resource:', error);
    res.status(500).json({ error: 'RESOURCE_INJECTION_FAILURE' });
  }
});

module.exports = router;
