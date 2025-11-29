import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  
  const baseStyle = "inline-flex items-center justify-center font-heading font-bold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow focus:ring-offset-gray-900 tracking-wide uppercase";
  
  const variants = {
    primary: "bg-brand-yellow text-black hover:bg-white hover:text-black shadow-[0_4px_14px_0_rgba(250,204,21,0.39)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.23)] hover:-translate-y-0.5",
    secondary: "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-500",
    outline: "bg-transparent border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-black",
    glow: "bg-brand-purple text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:bg-brand-purple-dark hover:shadow-[0_0_30px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 border border-brand-purple/50"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};