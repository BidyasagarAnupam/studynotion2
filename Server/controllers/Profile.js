const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require('../utils/secToDuration');


// update Profile
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { firstName, lastName, dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        // get userId
        const id = req.user.id;
        // verify data
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // find profile
        let userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails;
        const profilDetails = await Profile.findById(profileId);
        // update profile
        profilDetails.dateOfBirth = dateOfBirth;
        profilDetails.about = about;
        profilDetails.gender = gender;
        profilDetails.contactNumber = contactNumber;

        //! Update User extra
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        await profilDetails.save();
        userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return responce
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully Updated",
            // profilDetails,
            userDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// delete Account
// TODO Explore -> how can we schedule this operation
// TODO Expolre Cron Job(✅)
exports.deleteAccount = async (req, res) => {
    try {
        // get user id
        console.log("Printing Id ",req.user);
        const id = req.user.id;
        // validation
        const userDetails = await User.findById({ _id: id });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // TODO: HW Unenroll from all enrolled courses(✅)
        await Course.findByIdAndUpdate({ _id: id },
            {
                $pull: {
                    studentsEnrolled: id
                }
            }, { new: true });


        // delete user
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: "User deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully"
        });
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        // validation
        // validation & get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User data fetched Successfully",
            data : userDetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be found",
            error: error.message
        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("Backend calling updateDisplayPicture");
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        console.log("User Id for profile", userId);
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log("From backend IMg is ",image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        ).populate("additionalDetails").exec(); //! ADDED BY ME
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                }
            })
            .exec()
        
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            //create an new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })

        res.status(200).json({ courses: courseData });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}