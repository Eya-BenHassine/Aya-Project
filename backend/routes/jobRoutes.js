const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for CV storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cvs/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Job application submission endpoint
router.post('/apply', upload.single('cv'), async (req, res) => {
  try {
    const { firstName, lastName, email, degree, jobId } = req.body;
    
    // Here you would typically save this data to a database
    // For now, we'll just acknowledge receipt
    console.log('Job application received:', {
      firstName, 
      lastName, 
      email, 
      degree, 
      jobId,
      cvPath: req.file ? req.file.path : null
    });
    
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing job application:', error);
    res.status(500).json({ message: 'Server error processing application' });
  }
});

module.exports = router; 