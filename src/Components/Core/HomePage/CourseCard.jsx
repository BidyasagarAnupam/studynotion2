import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { ImTree } from 'react-icons/im'

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    console.log("current card ", currentCard);
    return (
        <div onClick={() => { setCurrentCard(cardData.heading); console.log("Card data", cardData, "Current card", currentCard) }} className={` w-[360px] lg:w-[30%] h-[300px] box-border cursor-pointer ${currentCard === cardData.heading ? "bg-richblack-5 shadow-[12px_12px_0_0] shadow-yellow-50" :" bg-richblack-800  text-richblack-25 "}`}>
            <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
                <h1 className='font-semibold text-[20px]'>{cardData.heading}</h1>
                <p className='text-richblack-400'>{cardData.description }</p>
            </div>
            <div className={`flex justify-between  px-6 py-3 font-medium ${currentCard === cardData.heading ? "text-blue-300" : "text-richblack-300"}`}>
                <div className='flex items-center gap-2 text-[16px]'>
                    <FaUserFriends />
                    <p>{cardData.level }</p>
                </div>
                <div className='flex items-center gap-2 text-[16px]'>
                    <ImTree />
                    <p>{cardData.lessionNumber } Lession</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard