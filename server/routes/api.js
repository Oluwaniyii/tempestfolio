const express = require('express');
const router = express.Router();
//multer
const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerUpload = multer({storage: multerStorage, errorHandling: 'manual'});

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


// Project
const ProjectController = require('../controllers/ProjectController');
const projectController = new ProjectController;

// Reading binaries
const projectImages = [
	{ name: 'imageHero', maxCount: 1 }, 
	{ name: 'project_img_1', maxCount: 1 },
	{ name: 'project_img_2', maxCount: 1 },
	{ name: 'project_img_3', maxCount: 1 },
];

router.get('/project/', projectController.getProjects);
router.get('/project/:id', projectController.getSingleProject);
router.post('/project/', multerUpload.fields(projectImages), projectController.newProject);
router.put('/project/:id/setvisibility', projectController.updateVisibility);
router.delete('/project/:id/', projectController.dropProject);

// Expertise
const ExpertiseController = require('../controllers/ExpertiseController.js');
const expertiseController = new ExpertiseController;

// router.get('/expertise/', expertiseController.getExpertises);
// router.post('/expertise/', multerUpload.single('icon'), expertiseController.addExpertise);


// Blog
const BlogController = require('../controllers/BlogController.js');
const blogController = new BlogController;

router.get('/blog/', blogController.getAllBlogs);
router.get('/blog/:id', blogController.getSingleBlog);
router.post('/blog/', blogController.addBlog);
router.put('/blog/:id', blogController.editBlog);
router.delete('/blog/:id', blogController.removeBlog);



// Tags
const TagController = require('../controllers/TagController.js');
const tagController = new TagController;

router.get('/tag/', tagController.getTags);
router.post('/tag/', tagController.createTag);





module.exports = router;