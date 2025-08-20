import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Search, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBoxProps {
  onSearch: (term: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const popularDestinations = [
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "London, UK",
    "Rome, Italy",
    "Barcelona, Spain",
    "Dubai, UAE",
    "Bali, Indonesia",
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search term to recent searches
  const saveRecentSearch = (term: string) => {
    if (term.trim() && term.length > 2) {
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
        0,
        5
      );
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const filteredSuggestions = popularDestinations.filter((dest) =>
    dest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
    setShowSuggestions(value.length > 0 || isFocused);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm);
      onSearch(searchTerm);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    saveRecentSearch(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if the click is outside the entire search container
      if (
        inputRef.current &&
        !inputRef.current.closest(".search-container")?.contains(target)
      ) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto z-50 search-container">
      {/* Main Search Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative transition-all duration-300 ${
          isFocused ? "transform scale-105" : ""
        }`}
      >
        <div
          className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
            isFocused
              ? "border-yellow-400 shadow-xl"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {/* Search Icon */}
          <Search
            className={`absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? "text-yellow-500" : "text-gray-400"
            }`}
          />

          {/* Search Input */}
          <Input
            ref={inputRef}
            type="search"
            placeholder="Where would you like to go?"
            value={searchTerm}
            className={`pl-16 pr-20 h-16 text-lg bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-gray-500 text-gray-900 font-medium ${
              searchTerm ? "pr-32" : ""
            }`}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
          />

          {/* Clear Button */}
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearchSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </Button>
        </div>

        {/* Quick Filter Pills - Hide when suggestions are showing */}
        {!showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isFocused ? 1 : 0.7, y: 0 }}
            className="flex flex-wrap gap-3 mt-4 px-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm hover:bg-yellow-100 cursor-pointer transition-colors">
              <MapPin className="h-4 w-4" />
              <span>Destinations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm hover:bg-amber-100 cursor-pointer transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Dates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm hover:bg-orange-100 cursor-pointer transition-colors">
              <Users className="h-4 w-4" />
              <span>Travelers</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 z-[60] max-h-96 overflow-hidden"
          style={{ minWidth: "100%", maxWidth: "100%" }}
        >
          <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-gray-100">
            {/* Recent Searches */}
            {recentSearches.length > 0 && searchTerm === "" && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Recent Searches
                  </h4>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-yellow-600 hover:text-yellow-700 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="flex items-center gap-3 w-full p-2 text-left hover:bg-yellow-50 rounded-lg transition-colors group"
                    >
                      <Clock className="h-4 w-4 text-gray-400 group-hover:text-yellow-500 transition-colors flex-shrink-0" />
                      <span className="text-gray-700 group-hover:text-yellow-700 transition-colors truncate">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Destinations */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                {searchTerm ? "Matching Destinations" : "Popular Destinations"}
              </h4>
              <div className="space-y-2">
                {(searchTerm ? filteredSuggestions : popularDestinations).map(
                  (destination, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(destination)}
                      className="flex items-center gap-3 w-full p-2 text-left hover:bg-yellow-50 rounded-lg transition-colors group"
                    >
                      <MapPin className="h-4 w-4 text-gray-400 group-hover:text-yellow-500 transition-colors flex-shrink-0" />
                      <span className="text-gray-700 group-hover:text-yellow-700 transition-colors truncate">
                        {destination}
                      </span>
                    </motion.button>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
