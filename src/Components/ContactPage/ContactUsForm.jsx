import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import countryCode from '../../data/countrycode.json'


const ContactUsForm = () => {
    const [loadong, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },

    } = useForm();

    const submitContactForm = async (data) => {
        console.log("logging Data : ", data);
        try {
            setLoading(true);
            // const responce = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const responce = { status: "ok" };
            console.log("Loggig responce : ", responce);
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",

            });
        }
    }, [reset, isSubmitSuccessful]);



    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col gap-5'>
                {/* name */}
                <div className='flex gap-x-5'>
                    {/* first name */}
                    <div className='flex flex-col'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            className='form-style'
                            {...register("firstName", { required: true })}
                        />
                        {
                            errors.firstName && (
                                <span className='text-xs text-yellow-50'> Please Enter your first name </span>
                            )
                        }
                    </div>

                    {/* last name */}
                    <div className='flex flex-col'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            {...register("lastName")}
                            className='form-style'
                        />

                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter email address'
                        {...register("email", { required: true })}
                        className='form-style'
                    />
                    {
                        errors.email && (
                            <span className='text-xs text-yellow-50'>Please Enter your email address </span>
                        )
                    }
                </div>

                {/* phone number */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="phoneNo">Phone Number</label>

                    <div className='flex flex-row gap-5'>
                        {/* dropdown */}

                        <select
                            name="dropdown"
                            id="dropdown"
                            className='form-style  w-[80px]'
                            {...register("contrycode", { required: true })}
                        >
                            {
                                countryCode.map((element, index) => (
                                    <option value={element.code} key={index} className='text-black'>
                                        {element.code} - {element.country}
                                    </option>
                                ))
                            }
                        </select>


                        {/* phone number */}

                        <input
                            type="number"
                            name="phoneNo"
                            id="phoneNo"
                            placeholder='12345 67890'
                            className='form-style w-[calc(100%-90px)] '
                            {...register("phoneNo",
                                {
                                    required: { value: true, message: "Please enter your phone number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Phone Number" }
                                }
                            )}
                        />

                    </div>
                    {
                        errors.phoneNo && (
                            <span className='text-xs text-yellow-50'>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }


                </div>

                {/* message */}
                <div className='flex flex-col'>
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="8"
                        placeholder='Enter your message here'
                        {...register("message", { required: true })}
                        className='form-style'
                    />
                    {
                        errors.message && (
                            <span className='text-xs text-yellow-50'>Please Enter your message</span>
                        )
                    }
                </div>

                <button type='submit' className='text-center text-[16px] lg:px-6  
                px-4 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200
          hover:shadow-none
          shadow-[2px_2px_0px_0px_RGBA(255,_255,_255,_0.18)]'>
                    Send Message
                </button>

            </div>
        </form>
        
    )
}

export default ContactUsForm