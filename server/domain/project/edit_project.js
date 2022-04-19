const { promises } = require('nodemailer/lib/xoauth2');
const Imagekit = require('../../libs/imagekit/Imagekit');
const ProjectModel = require('../../models/ProjectModel');
const logger = require('../../../app/logger');
const { validate } = require('../../models/ProjectModel');


const allowedProjectHeroTypes = ["png", "jpg", "jpeg", "webp"];
const allowedProjectFileTypes = [...allowedProjectHeroTypes, "gif"];
const invalidProperty = ['_id']


async function editProject(project_id, editProjectData){

    const project = await ProjectModel.findById(project_id);

    // destructure project
    const {title, category, description, tags, video, github, externalUrl, imageHero, project_img_1, project_img_2, project_img_3} = editProjectData;
    
    let projectData = {title, category, description, tags, video, github, externalUrl};
    let projectHero = imageHero == "undefined" ? null : imageHero[0];
    let projectMedias = [project_img_1, project_img_2, project_img_3];

    
    (Object.keys(projectData)).forEach(property=>{
        if( projectData[property] && !invalidProperty.includes(property) ){
            project[property] = projectData[property];
        }
    });


    // Main Image
    if(projectHero){
        let isUploadConditionMet = false;

        if(!project.imageHero)
          isUploadConditionMet = true;

        else if(project.imageHero.original_name !== projectHero.originalname)
          isUploadConditionMet = true;

        if(isUploadConditionMet){
           //validate media
           if(!validateMediaHero(projectHero)){
              return {status:false, message: `${projectHero.originalname} media file is of unsupported file type`};
           }

           // delete previous image remotely if available
           if(project.imageHero){
            await Imagekit.deleteFile(project.imageHero.file_id);
           }

           // upload and update media
           project.imageHero = await uploadProjectMedia(projectHero);
        }
    }

    // Other Images
    let projectSavedMedias = project.imgs;

    for(let i = 0; i < projectMedias.length; i++){
        let media = (projectMedias[i]) ? (projectMedias[i])[0] : null;
        let projectMedia = projectSavedMedias[i];

        let isUploadConditionMet = false;

        if(media){
            if(!projectMedia)
                isUploadConditionMet = true;

            else if(projectMedia.original_name !== media.originalname)
                isUploadConditionMet = true;

            if(isUploadConditionMet){
                //validate media
                if(!validateMedia(media)){
                    return {status:false, message: `${media.originalname} media file is of unsupported file type`};
                }
        
                // delete previous image remotely if available
                if(projectMedia){
                    await Imagekit.deleteFile(projectMedia.file_id);
                }
        
                // upload and update media
                projectSavedMedias[i] = await uploadProjectMedia(media);
            }
        }

    }

    // Everything is right, Prepare project
    const updatedProject = await project.save();

    return {status: true, data: updatedProject};
}


function getFileExtension(fileName){
    if(!fileName) return undefined;

    let fileNameArray = fileName.split('.');
    let fileExtension = fileNameArray[fileNameArray.length - 1];

    return fileExtension;
}

function validateMediaHero(media){
    return (allowedProjectHeroTypes.includes(getFileExtension(media.originalname))); 
}

function validateMedia(media){
    return (allowedProjectFileTypes.includes(getFileExtension(media.originalname))); 
}

function uploadProjectMedia (file){
    return new Promise((resolve, reject)=>{
        const remoteFolder = "portf/proj";
    
        if(!file) return null;
    
        let data = {};
    
        Imagekit.upload(file, remoteFolder)
        .then(mediaDetails=>{
            data['original_name'] = file['originalname'];
            data['file_id'] = mediaDetails['fileId'];
            data['url'] = mediaDetails['url'];
            data['thumb'] = mediaDetails['thumbnailUrl'];

            resolve(data);
        })
        .catch(error=>{
            logger.error(error.toString(), __filename)
            reject(error)
        });
           
    }); 
}

module.exports = editProject