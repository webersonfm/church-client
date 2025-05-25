import React from 'react'

const SelectStyle = ({ id, name, label, value, onChange, options, required }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                cursor="pointer"

                className="
          w-full
          px-3
          py-2
          border
          border-gray-300
          rounded-md
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          focus:bg-black
          focus:text-lime-500
          text-gray-700
          bg-white
        "
            >
                <option value="">Selecione um estado</option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectStyle