import React from 'react';

// ==========================================
// BUTTON
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';
  
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-soft hover:shadow-premium focus:ring-brand-blue',
    secondary: 'bg-brand-teal text-white hover:bg-brand-teal-dark shadow-soft hover:shadow-premium focus:ring-brand-teal',
    outline: 'border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue/5 focus:ring-brand-blue',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-soft',
    ghost: 'text-brand-blue bg-transparent hover:bg-brand-blue/10 focus:ring-brand-blue',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

// ==========================================
// CARD
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hoverEffect = false, className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-soft border border-brand-gray/30 p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-premium hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// ==========================================
// BADGE
// ==========================================
interface BadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled' | 'active' | 'inactive';
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
    active: 'bg-blue-50 text-blue-700 border-blue-200',
    inactive: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const labels = {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    cancelled: 'ملغي',
    active: 'نشط',
    inactive: 'غير نشط',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

// ==========================================
// INPUTS
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && <label className="block text-sm font-semibold text-brand-navy mb-1.5">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border bg-brand-gray-light/50 focus:bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-brand-gray focus:border-brand-blue'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ==========================================
// SELECT
// ==========================================
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && <label className="block text-sm font-semibold text-brand-navy mb-1.5">{label}</label>}
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border bg-brand-gray-light/50 focus:bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-brand-gray focus:border-brand-blue'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ==========================================
// TEXTAREA
// ==========================================
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && <label className="block text-sm font-semibold text-brand-navy mb-1.5">{label}</label>}
        <textarea
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border bg-brand-gray-light/50 focus:bg-white text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-brand-gray focus:border-brand-blue'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ==========================================
// MODAL
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-2xl shadow-premium border border-brand-gray/30 w-full max-w-lg z-10 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in duration-200">
        {(title || onClose !== undefined) && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-brand-gray/40">
            {title && <h3 className="text-lg font-bold text-brand-blue">{title}</h3>}
            <button
              onClick={onClose}
              className="text-brand-gray-dark hover:text-brand-navy p-1 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
