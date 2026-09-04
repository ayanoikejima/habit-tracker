const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-lg
        bg-cyan-500
        text-white
        font-medium
        hover:bg-cyan-600
        transition-colors
        ${className ?? ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
