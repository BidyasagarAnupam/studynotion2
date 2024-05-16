import React from 'react'
import HighilightText from './HighilightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_other from '../../../assets/Images/Compare_with_others.png'
import plan_your_lession from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../HomePage/Button'

const LearningLanguageSection = () => {
  return (
      <div className='mt-40 mb-16'>
          <div className='flex flex-col gap-5 items-center'>
              <div className='text-4xl font-semibold text-center'>
                  Your swiss knife for <HighilightText text={"learning any language"} />
              </div>
              <div className='text-center  text-richblack-600 mx-auto text-base font-medium w-[73%]'>
                  Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
              </div>

              <div className='flex flex-col lg:flex-row items-center justify-center mt-5'>
                  <img src={know_your_progress} alt="Know your Progress" className='object-contain lg:-mr-32' />
                  <img src={compare_with_other} alt="compare with other" className='object-contain -mt-16 lg:-mt-0' />
                  <img src={plan_your_lession} alt="plan your lession" className='object-contain -mt-16 lg:-ml-32 lg:mb-10' />
              </div>

              <div className='w-fit'>
                  <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
              </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection