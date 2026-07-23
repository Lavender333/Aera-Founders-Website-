import React from 'react';

interface AeraLogoProps {
  className?: string;
  size?: number;
  bgWhite?: boolean;
}

export const AeraLogo: React.FC<AeraLogoProps> = ({ className = '', size = 40, bgWhite = false }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden ${
        bgWhite ? 'bg-white p-1 shadow-sm border border-[rgba(48,88,84,0.16)]' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Shield / Node Circle */}
        <circle cx="50" cy="50" r="46" fill="#305854" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#467857" strokeWidth="4" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#8CBB5D" strokeWidth="3" strokeDasharray="6 4" />
        
        {/* Stylized AERA Arrow Symbol */}
        <path
          d="M50 20 L75 75 L50 62 L25 75 Z"
          fill="#8CBB5D"
        />
        <path
          d="M50 20 L50 62 L75 75 Z"
          fill="#5F9461"
        />
        {/* Core Beacon Dot */}
        <circle cx="50" cy="45" r="7" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
