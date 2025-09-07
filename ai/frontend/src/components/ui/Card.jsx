import React from 'react';

const Card = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const baseClasses = "rounded-3xl shadow-2xl backdrop-blur-sm";
  
  const variantClasses = {
    default: "bg-black/80 border border-gray-800",
    glass: "bg-white/10 border border-white/20",
    solid: "bg-gray-900 border border-gray-700"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card };

