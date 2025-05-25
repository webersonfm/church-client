

const InputStyle = ({ id, name, type = "text", value, onChange, required = false, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-black focus:text-lime-500 focus:font-bold"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default InputStyle