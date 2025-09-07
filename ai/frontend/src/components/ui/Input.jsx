import React from 'react';

const Input = ({
  className = "",
  error = "",
  type = "text",
  ...props
}) => {
  const baseClasses = "border rounded-lg px-3 py-2 text-sm w-full bg-gray-800 text-white transition-colors duration-200";
  const normalClasses = "border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500";
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500";
  
  const classes = `${baseClasses} ${error ? errorClasses : normalClasses} ${className}`;

  return (
    <div className="w-full">
      <input
        type={type}
        className={classes}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export { Input };

