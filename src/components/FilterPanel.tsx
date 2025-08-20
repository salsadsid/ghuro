import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterState {
  priceRange: [number, number];
  rating: number;
  location: string;
  duration: string;
  activities: string[];
}

interface FilterPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterPanel({
  isOpen,
  onToggle,
  onFiltersChange,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    rating: 0,
    location: "",
    duration: "",
    activities: [],
  });

  const activities = [
    "Adventure",
    "Beach",
    "Cultural",
    "Wildlife",
    "Mountain",
    "City",
    "Historical",
    "Food & Wine",
    "Spa & Wellness",
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 5000],
      rating: 0,
      location: "",
      duration: "",
      activities: [],
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        className="fixed top-24 right-6 z-40 h-12 px-4 border-yellow-300 text-yellow-600 hover:bg-yellow-50"
      >
        <Filter className="h-5 w-5 mr-2" />
        Filters
      </Button>

      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <Card className="h-full border-0 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-yellow-100">
              <CardTitle className="text-xl text-yellow-700">Filters</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0 hover:bg-yellow-50 hover:text-yellow-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Price Range
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value: number[]) =>
                    handleFilterChange("priceRange", value)
                  }
                  max={5000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-yellow-600 font-medium">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Minimum Rating
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleFilterChange("rating", Number(value))
                  }
                >
                  <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-200">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Region
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleFilterChange("location", value)
                  }
                >
                  <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-200">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any location</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="americas">Americas</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Trip Duration
                </Label>
                <Select
                  onValueChange={(value: string) =>
                    handleFilterChange("duration", value)
                  }
                >
                  <SelectTrigger className="border-yellow-200 focus:border-yellow-400 focus:ring-yellow-200">
                    <SelectValue placeholder="Any duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any duration</SelectItem>
                    <SelectItem value="short">1-3 days</SelectItem>
                    <SelectItem value="medium">4-7 days</SelectItem>
                    <SelectItem value="long">8+ days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">
                  Activities
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {activities.map((activity) => (
                    <Button
                      key={activity}
                      variant={
                        filters.activities.includes(activity)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => {
                        const newActivities = filters.activities.includes(
                          activity
                        )
                          ? filters.activities.filter((a) => a !== activity)
                          : [...filters.activities, activity];
                        handleFilterChange("activities", newActivities);
                      }}
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={resetFilters}
              >
                Reset All Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
