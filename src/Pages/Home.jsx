import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';

import HighilightText from '../Components/Core/HomePage/HighilightText'
import CTAButton from '../Components/Core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks'
import TimeLineSection from '../Components/Core/HomePage/TimeLineSection';
import LearningLanguageSection from '../Components/Core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/Core/HomePage/InstructorSection';
import ExploreMore from '../Components/Core/HomePage/ExploreMore';
import Footer from '../Components/common/Footer'
import ReviewSlider from '../Components/common/ReviewSlider.jsx'




const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className='
                relative mx-auto flex
                flex-col w-11/12 items-center
                text-white justify-between
                max-w-maxContent
                '
            >
                {/*TODO: Add shadow to the button ✅*/}
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full
                     bg-richblue-800 font-bold
                      text-richblack-200
                      transition-all duration-200 hover:scale-95 w-fit
                      hover:shadow-[0px_0px_0px_0px_rgba(255,_255,_255,_0.18)]
                      shadow-[0px_2px_0px_0px_rgba(255,_255,_255,_0.18)]
                      '>
                        <div className='flex items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblue-900
                        '>
                            <p>Become an instuctor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl  font-semibold mt-7'>
                    Empower Your Future with
                    <HighilightText text={"Coding Skills"} />
                </div>

                <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row mt-8 gap-7'>
                    {/* Hw add shadow ✅*/}
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                {/* add box shadow  ✅*/}
                <div className='mx-3 my-12 shadow-[10px_6px_49px_0px_#118ab2]'>
                    <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]" >
                        <source src={Banner} type='video/mp4' />
                    </video>
                </div>

                {/* Code section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighilightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        backgraoundGradiant={"codeblock1"}
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btntext: "Try it Yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btntext: "Learn More",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><ahref="three/">Three</a>\n</nav>\n<body>`
                        }
                        codeColor={"text-yellow-25"}

                    />
                </div>

                {/* Code section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighilightText text={`coding in`} /> <br />
                                <HighilightText text={`seconds`} />
                            </div>
                        }
                        backgraoundGradiant={"codeblock2"}
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btntext: "Course Lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btntext: "Learn More",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={
                            `import React from 'react';\nimport CTAButton from './Button';\nimport {TypeAnimation} from 'react-type...';\nimport {FaArrowRight} from 'react-icons/fa';\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`
                        }
                        codeColor={"text-white"}

                    />
                </div>

                <ExploreMore />

            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>

                <div className='homepage_bg h-[310px]'>

                    <div className='w-11/12 max-w-maxContent mt-7 flex flex-col justify-between items-center gap-5 mx-auto'>
                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                </div>

                <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center  gap-7'>

                    <div className='flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between mb-10 mt-[100px]'>
                        <div className='text-4xl font-semibold lg:w-[45%]'>
                            Get the skills you need for a
                            <HighilightText text={"job that is in demand."} />

                        </div>
                        <div className='flex flex-col gap-10 lg:w-[40%] items-start '>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"} >
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>


                    <TimeLineSection />

                    <LearningLanguageSection />
                </div>



            </div>

            {/* Section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent  text-white">

                <InstructorSection />

                <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>

                {/* Review Slider Here */}
                <ReviewSlider />
            </div>

            {/* Footer */}
            {/*Footer */}
            <Footer />

        </div>
    )
}

export default Home