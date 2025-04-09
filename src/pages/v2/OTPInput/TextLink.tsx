import React from 'react';

interface TextLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const TextLink: React.FC<TextLinkProps> = ({ children, onClick, className = '', icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex overflow-hidden gap-1.5 items-center font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 rounded-sm ${className}`}
    >
      {icon && icon}
      <span className="self-stretch my-auto">{children}</span>
    </button>
  );
};

export default TextLink;
