import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighilightText from './HighilightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa';


const InstructorSection = () => {
    return (
        <div className='mt-16 text-white'>
            <div className='flex flex-col lg:flex-row gap-20 items-center'>

                <div className='lg:w-[50%] shadow-[-20px_-20px_rgba(255,255,255)]'>
                    <img src={Instructor} alt="Instructor" className='' />
                </div>

                <div className='lg:w-[50%] flex flex-col gap-10 '>
                    <div className='text-4xl font-semibold w-[50%]'>
                        Become an
                        {/* <br /> */}
                        <HighilightText text={"instructor"} />
                    </div>

                    <p className='font-medium text-[16px] w-[90%] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"} >
                            <div className='flex flex-row items-center gap-3'>
                                <p>Start Teaching Today</p>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default InstructorSection