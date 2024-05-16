import React from 'react'
import HighilightText from '../HomePage/HighilightText'

const Quote = () => {
    return (
        <div>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighilightText text={"combines technology"} />,
            <span className='text-brown-200'>
                {" "}
                expertise
            </span>
            , and community to create an
            <span className='text-brown-200'>
                {" "}
                unparalleled educational experience.
            </span>
        </div>
    )
}

export default Quote