import { memo } from 'react';

const BadgeComponent = ({ children, variant = 'default', size = 'md' }: { children: React.ReactNode; variant?: string; size?: string }) => {
  const colors: Record<string, string> = {
    default: 'bg-gray-100 text-gray-800 border border-gray-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
    premium: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    verified: 'bg-blue-50 text-blue-700 border border-blue-200',
  };

  const sizes: Record<string, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`rounded-full font-semibold transition-all duration-200 inline-flex items-center gap-1 ${sizes[size]} ${colors[variant] || colors.default}`}>
      {children}
    </span>
  );
};

export const Badge = memo(BadgeComponent);
