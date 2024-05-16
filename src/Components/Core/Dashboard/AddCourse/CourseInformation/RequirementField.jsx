import React, { useEffect, useState, useRef } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, placeholder, getValues, reset }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    // to automatic focued on the input field
    const inputRef = useRef(null);


    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, requirementList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementList])

    const handleAddRequirement = () => {
        
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement(""); //Implemented by me 
            inputRef.current.focus(); //Implemented by me
        }
        console.log("Requirement List", requirementList);
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div className="flex flex-col space-y-2" >

            <label className="text-sm text-richblack-5"
                htmlFor={name}>
                {label}
                <sup className="text-pink-200">*</sup>
            </label>
            <div>
                <input
                    type='text'
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full form-style'
                    ref={inputRef} //Implemented by me
                />
                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold text-yellow-50'>
                    Add
                </button>
            </div>

            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((requirement, index) => (
                                <li key={index} className='flex items-center text-richblack-5'>
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='text-xs text-pure-greys-300'>
                                        clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}

        </div>
    )
}

export default RequirementField
