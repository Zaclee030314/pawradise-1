import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "rounded-full font-bold transition-all transform active:scale-95 flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-orange-600 shadow-md border-b-4 border-orange-700 hover:border-orange-800 active:border-b-0 active:mt-1",
    secondary: "bg-brand-yellow text-brand-brown hover:bg-yellow-500 shadow-md border-b-4 border-yellow-600 hover:border-yellow-700 active:border-b-0 active:mt-1",
    outline: "border-2 border-brand-orange text-brand-orange hover:bg-orange-50",
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;