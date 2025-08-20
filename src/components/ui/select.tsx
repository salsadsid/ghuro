import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

const Select = ({ children, onValueChange }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onValueChange?.(value);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            setIsOpen,
            selectedValue,
            onSelect: handleSelect,
          } as any);
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({
  children,
  className,
  ...props
}: SelectTriggerProps & any) => {
  const { isOpen, setIsOpen } = props;

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

const SelectValue = ({ placeholder, ...props }: SelectValueProps & any) => {
  const { selectedValue } = props;

  return <span className="block truncate">{selectedValue || placeholder}</span>;
};

const SelectContent = ({ children, ...props }: SelectContentProps & any) => {
  const { isOpen } = props;

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, props as any);
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = ({ value, children, ...props }: SelectItemProps & any) => {
  const { onSelect } = props;

  return (
    <div
      onClick={() => onSelect(value)}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
    >
      {children}
    </div>
  );
};

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
