const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();

// create section
exports.createSubSection = async (req, res) => {
    try {
        // fetch the data from the req.body
        const { sectionId, title, description } = req.body
        
        // extract file/video
        const video = req.files.video;
        // validation
        if (!title || !description || !sectionId || !video) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            });
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        console.log("Video Upload Details ", uploadDetails);
        // create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            description: description,
            timeDuration: `${uploadDetails.duration}`,
            videoUrl: uploadDetails.secure_url,
        });
        // update Section with this subsection
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
            $push: {
                subSection: subSectionDetails._id
            }
            },
            { new: true }).populate("subSection"); // ! Here I use polupate function to show full details of sub section
        // TODO:log updated section here adding populate (✅)

        // return responce
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedSection
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal Server Problem",
            error: error.message
        });
    }
}

// TODO HW update Subsection (✅)
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body
        
        console.log("SubSection id from backend " + subSectionId);
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")


        return res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
            error : error.message
        })
    }
}

// TODO HW delete Subsection (✅)
exports.deleteSubSection = async (req, res) => {
    try {
        
        const { subSectionId, sectionId } = req.body

        // remove subsection from the section 
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        // delete the subsection 
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success: true,
            message: "SubSection deleted Successfully",
            data: updatedSection
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete the subsection",
            error: error.message
        });
    }
}