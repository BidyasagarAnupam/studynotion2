import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  return (
      <Link to={linkto} >
          <div className={`text-center text-[16px] lg:px-6  px-4 py-3 rounded-md font-bold
          ${active ? "bg-yellow-50 text-black" : "bg-richblue-800"}
          hover:scale-95 transition-all duration-200
          hover:shadow-none
          shadow-[2px_2px_0px_0px_RGBA(255,_255,_255,_0.18)]
          `}>
              {children}
          </div>
    </Link>
  )
}

export default Button