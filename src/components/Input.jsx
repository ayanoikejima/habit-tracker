const Input = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full
        p-4 
        rounded-lg
        border-gray-300
        outline-none
        focus:ring-2
        focus:ring-cyan-400
        ${className ?? ""}
      `}
    />
  );
};

export default Input;
