import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Leadership",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Leadership",
        Description: "Code your way to a solution",
    }
]

const TimeLineSection = () => {
    return (
        <div>
            <div className='flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-1.5 items-center'>

                <div className='flex flex-col lg:w-[45%] gap-5'>
                    {
                        timeLine.map((e, index) => {
                            return (
                                <div className='flex flex-row gap-6' key={index}>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-[0px_0px_62px_0px_rgba(0,0,0,_0.12)]'>
                                        <img src={e.Logo} alt="" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h2 className='font-semibold text-[18px]'>{e.Heading}</h2>
                                        <p className='text-base'>{e.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='relative h-fit w-fit shadow-blue-200  shadow-[10px_6px_49px_0px_#118ab2]'>
                    <img src={timelineImage} alt="timeLineImage" className="shadow-[20px_20px_rgba(255,255,255)] object-cover h-fit" />

                    <div className='absolute w-[60%] flex flex-col px-5 py-4 lg:left-[50%] lg:-bottom-24  lg:translate-x-[-50%] lg:translate-y-[-50%] bg-caribbeangreen-700 lg:flex-row text-white uppercase lg:py-10 lg:px-5 gap-4 lg:w-[80%]'>
                        <div className='flex justify-between items-center gap-10  lg:border-r lg:border-caribbeangreen-300 lg:w-[40%] lg:pl-4 lg:pr-8'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-sm text-caribbeangreen-300'>Years Experience</p>
                        </div>
                        
                        <div className='flex justify-between items-center gap-10  lg:w-[40%] lg:pl-5'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-sm text-caribbeangreen-300'>Types of Courses</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimeLineSection