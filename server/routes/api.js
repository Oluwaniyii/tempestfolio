const express = require('express');
const router = express.Router();
//multer
const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerUpload = multer({storage: multerStorage});

// Resume
const ResumeController = require('../controllers/ResumeController');
const resumeController = new ResumeController;

router.get('/resume', resumeController.getResumes);
router.get('/resume/:id', resumeController.getOneResume);
router.post('/resume/', multerUpload.single('resume'), resumeController.uploadResume);
router.put('/resume/:id/setactive', resumeController.setActiveResume);
router.delete('/resume/:id', resumeController.deleteResume);

//Service
const ServiceController = require('../controllers/ServiceController');
const serviceController = new ServiceController;

router.get('/service', serviceController.getServices);
router.get('/service/:id', serviceController.getSingleService);
router.post('/service', serviceController.addService);
router.put('/service/:id', serviceController.updateService);
router.delete('/service/:id', serviceController.deleteService);


//Experience
const ExperienceController = require('../controllers/ExperienceController');
const experienceController = new ExperienceController;

router.get('/experience', experienceController.getExperiences);
router.get('/experience/:id', experienceController.getSingleExperience);
router.post('/experience', experienceController.addExperience);
router.put('/experience/:id', experienceController.updateExperience);
router.delete('/experience/:id', experienceController.deleteExperience);


module.exports = router;