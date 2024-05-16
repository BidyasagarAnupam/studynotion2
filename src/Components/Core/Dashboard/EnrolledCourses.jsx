import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {


    // fetch the token
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    console.log("FROM EnrolledCourses token is " + token);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const responce = await getUserEnrolledCourses(token);
            setEnrolledCourses(responce);
        } catch (error) {
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    console.log("The enrolledCourses are", enrolledCourses);


    return (
        <>
            <div className="text-3xl text-richblack-50">Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : !enrolledCourses.length ? (
                        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                            You have not enrolled in any course yet.
                            {/* TODO: Modify this Empty State */}
                        </p>
                    )
                    : (
                            <div className="my-8 text-richblack-5">
                                {/* all headings */}
                                <div className="flex rounded-t-lg bg-richblack-500 ">
                                    <p className="w-[45%] px-5 py-3">Course Name</p>
                                    <p className="w-1/4 px-2 py-3">Duration</p>
                                    <p className="flex-1 px-2 py-3">Progress</p>
                                </div>
                                {/* Main cards */}
                                {
                                    enrolledCourses.map((course, index, arr) => (
                                        <div
                                            className={`flex items-center border border-richblack-700 ${index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                                }`}
                                            key={index}>
                                            {/* course name and thubnail */}
                                            <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                                // TODO: add link for onClick
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                    )
                                                }}
                                            >
                                                <img
                                                    className="h-14 w-14 rounded-lg object-cover"
                                                    src={course.thumbnail}
                                                    alt="Course thumbnail" />
                                                <div className="flex max-w-xs flex-col gap-2">
                                                    <p className="font-semibold">{course.courseName }</p>
                                                    <p className="text-xs text-richblack-300">
                                                        {/* Logic to reduce the length of desc. */}
                                                        {course.courseDescription.length > 50
                                                            ? `${course.courseDescription.slice(0, 50)}...`
                                                            : course.courseDescription}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* total duration */}
                                            <div className="w-1/4 px-2 py-3">
                                                {/* ye aabhi nehin hai */}
                                                {course?.totalDuration}
                                            </div>
                                            {/* Progressbar */}
                                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                                <p>Progress: {course?.progressPercentage || 0 }%</p>
                                                <ProgressBar 
                                                    completed={course?.progressPercentage || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                        </div>
                    )
            }
        </>
    )
}

export default EnrolledCourses