import React from 'react';


interface ButtonProps {
  startIcon?: React.ReactNode;
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  text: string;
  className?: string;
}

export const Button = ({ startIcon,size, onClick, text, className }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
    </button>
  );
};