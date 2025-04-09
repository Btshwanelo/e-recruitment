import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex overflow-hidden gap-1.5 justify-center items-center px-4 py-2.5 w-full text-base font-semibold text-white bg-sky-600 rounded-lg border-2 border-solid shadow-sm border-[rgba(255,255,255,0.12)] hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
