import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  darkTheme?: boolean;
}

const getBaseClass = (darkTheme: boolean, error?: string) => {
  const base = "w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-300";
  const colors = darkTheme 
    ? "bg-white/5 border border-white/10 text-white focus:ring-white/30 focus:border-white/30 placeholder-gray-500" 
    : "bg-gray-50 border border-gray-200 text-gray-900 focus:ring-black/10 focus:border-gray-400 placeholder-gray-400";
  const errorColor = error ? "border-red-500 focus:ring-red-500/30" : "";
  return `${base} ${colors} ${errorColor}`;
};

const Label = ({ children, darkTheme, htmlFor }: { children: React.ReactNode, darkTheme: boolean, htmlFor?: string }) => (
  <label htmlFor={htmlFor} className={`block text-xs font-semibold tracking-widest uppercase mb-3 ${darkTheme ? "text-gray-400" : "text-gray-500"}`}>
    {children}
  </label>
);

export const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FormFieldProps>(
  ({ label, error, darkTheme = false, className = "", ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        <Label darkTheme={darkTheme} htmlFor={props.id}>{label}</Label>
        <input ref={ref} className={getBaseClass(darkTheme, error)} {...props} />
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FormFieldProps>(
  ({ label, error, darkTheme = false, className = "", ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        <Label darkTheme={darkTheme} htmlFor={props.id}>{label}</Label>
        <textarea ref={ref} className={`${getBaseClass(darkTheme, error)} resize-none`} {...props} />
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export const Select = React.forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & FormFieldProps & { options: { label: string, value: string }[] }>(
  ({ label, error, darkTheme = false, options, className = "", ...props }, ref) => {
    const iconColor = darkTheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    const selectBgImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${iconColor}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

    return (
      <div className={`w-full ${className}`}>
        <Label darkTheme={darkTheme} htmlFor={props.id}>{label}</Label>
        <div className="relative">
          <select 
            ref={ref} 
            className={`${getBaseClass(darkTheme, error)} appearance-none cursor-pointer pr-10`} 
            style={{ 
              backgroundImage: selectBgImage,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px top 50%",
              backgroundSize: "12px"
            }}
            {...props}
          >
            <option value="" disabled className={darkTheme ? "text-gray-500 bg-gray-900" : "text-gray-400"}>
              Select an option
            </option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value} style={{ padding: "8px 12px" }} className={darkTheme ? "bg-[#1a1a1a] text-white" : "bg-white text-black"}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
