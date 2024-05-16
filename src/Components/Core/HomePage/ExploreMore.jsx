import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighilightText from './HighilightText';
import CourseCard from './CourseCard';



const tabsName = [
    "Free",
    "New to coding",
    "Most polular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className=''>
            <div className='text-4xl font-semibold text-center'>
                Unlock the
                <HighilightText text={"Power of Code"} />
            </div>

            <p className='text-center text-richblack-300 text-lg font-semibold mt-2'>
                Learn to Build anything you can imagine
            </p>

            <div className='hidden px-1 py-1 lg:flex flex-row rounded-full bg-richblue-800 mb-14 mt-5 shadow-[0px_2px_0px_0px_rgba(255,_255,_255,_0.18)]'>
                {
                    tabsName.map((e, index) => {
                        return (
                            <div
                                className={`text-[16px] flex flex-row items-center gap-2
                                ${currentTab === e ? "bg-richblack-900 text-richblack-5 font-medium" :
                                        "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                                    hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
                                    origin-right ease-in
                            `}
                                key={index}
                                onClick={() => setMyCards(e)}
                            >
                                {e}
                            </div>
                        )
                    })
                }
            </div>

            <div className='lg:h-[150px]'></div>

            {/* course card */}
            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore