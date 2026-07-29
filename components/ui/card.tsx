import { memo } from 'react';

const CardComponent = ({ children, className = '', hoverable = false }: { children: React.ReactNode; className?: string; hoverable?: boolean }) => {
  const hoverClass = hoverable ? 'hover:shadow-lg hover:scale-105 hover:border-yellow-200' : '';
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

const CardHeaderComponent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`mb-6 ${className}`}>{children}</div>;
};

const CardContentComponent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

const CardFooterComponent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return <div className={`mt-6 pt-6 border-t border-gray-100 ${className}`}>{children}</div>;
};

export const Card = memo(CardComponent);
export const CardHeader = memo(CardHeaderComponent);
export const CardContent = memo(CardContentComponent);
export const CardFooter = memo(CardFooterComponent);
