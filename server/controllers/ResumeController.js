const ApiController = require('./ApiController')

class ResumeController {
   
//   domainBasePath = Path2D.join(__dirname, '/../domain/resume');


  getResumes = (req, res) => {
      let findResumes = require('../domain/resume/find_resumes');

      findResumes()

      .then(resumes => {
        return res.status(200).json({data: resumes});
      })

      .catch(error => {
        // Log error
        console.log(error);
        return res.status(500).json({message: "Could not complete request"});
      })
  }


  getOneResume = (req, res) => {

    let findOneResume = require('../domain/resume/find_one_resume');
    
    let resumeID = req.params['id'] || null;

    if(!resumeID) return res.status(500).json({message: "no resume id sent"});

    findOneResume(resumeID)

    .then(resume=>{
      if(!resume) return res.status(400).json({message: "no resume with id found"});
      return res.status(200).json({data: resume});

    })

    .catch(error => {
      // Log error
      return res.status(500).json({message: "Could not complete request"});
    })
  }


  uploadResume = (req, res) => {

    let uploadResume = require('../domain/resume/upload_resume');

    let file = req.file;

    if(!file) return res.status(400).json({message: "no file sent"});

    uploadResume(file)

    .then(resumeDetails=>{
      if(!resumeDetails.uploaded)
        return res.status(400).json({data: resumeDetails.error});

      return res.status(200).json({data: resumeDetails});
    })

    .catch(error => {
      // Log error
      return res.status(500).json({message: "Could not complete request"});
    })

  }


  setActiveResume = (req, res) => {

    let setResumeActive = require('../domain/resume/set_resume_active');
    
    let resumeID = req.params['id'] || null;

    if(!resumeID) return res.status(500).json({message: "no resume id sent"});

    setResumeActive(resumeID)

    .then(resume=>{
        if(!resume) return res.status(400).json({message: "no resume with id found"});

        return res.status(200).json({data: resume});
    })
    
    .catch(error=>{
      //log error
      return res.status(500).json({message:"could not complete request"});
    })
  }

  deleteResume = (req, res) => {

    let deleteResune = require('../domain/resume/delete_resume');

    let resumeID = req.params['id'];

    if(!resumeID) return res.status(400).json({message: "no file sent"});

    deleteResune(resumeID)
    .then(status => {
        return res.status(200).json({data:{}});
    })
    .catch(error=>
      {
    console.log(error);
        return res.status(500).json({message: "could not complete request"})
      })
  }


}



module.exports = ResumeController;