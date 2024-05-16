const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { Mongoose, default: mongoose } = require('mongoose');

// create rating
exports.createRating = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;
        // fetch data from req body
        const { rating, review, courseId } = req.body;
        // check if user is entolled or not
        const courseDetails = Course.findById({
            _id: courseId,
            studentsEnrolled: { $eleMatch: { $eq: userId } },
        });
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled in this course"
            });
        }
        // check if  user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });
        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "Student is alredy reviewed the course"
            });
        }
        // create reating and rivew
        const reatingReview = await RatingAndReview.create({
            rating, review, course: courseId, user: userId
        });
        // update course with this rating/riveew
        // TODO find an error from line 40 to 51
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId }, {
            $push: {
                ratingAndReviews: reatingReview._id,
            }
        }, { new: true });
        console.log(updatedCourseDetails);
        // return res
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            reatingReview,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get avg rating
exports.getAverageRating = async (req, res) => {
    try {
        // get course id
        const courseId = req.body.courseId;
        // calculate avg rating

        // ! CANN'T UNDERSTAND GOOGLE IT
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null, // id is null means all entries aer grouped
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        // return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            });
        }

        // if no rating no exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0 no ratings given till now",
            averageRating: 0
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all rating and reviews
exports.getAllRating = async (req, res) => {
    try {

        const allReviews = await RatingAndReview.find({}).sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName"
            }).exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// TODO HW find the rating and reviews according to the specific course