import { cn } from "@/lib/utils";
import * as React from "react";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  min: number;
  step: number;
  className?: string;
}

export function Slider({
  value,
  onValueChange,
  max,
  min,
  step,
  className,
}: SliderProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= value[1]) {
      onValueChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= value[0]) {
      onValueChange([value[0], newMax]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex space-x-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleMinChange}
          className="flex-1 h-2 bg-yellow-100 rounded-lg appearance-none cursor-pointer slider-thumb-yellow"
          style={{
            background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${
              ((value[0] - min) / (max - min)) * 100
            }%, #fef3c7 ${
              ((value[0] - min) / (max - min)) * 100
            }%, #fef3c7 100%)`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleMaxChange}
          className="flex-1 h-2 bg-yellow-100 rounded-lg appearance-none cursor-pointer slider-thumb-yellow"
          style={{
            background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${
              ((value[1] - min) / (max - min)) * 100
            }%, #fef3c7 ${
              ((value[1] - min) / (max - min)) * 100
            }%, #fef3c7 100%)`,
          }}
        />
      </div>
    </div>
  );
}
