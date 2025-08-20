import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";

export default function SearchBox({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  return (
    <div className="relative w-full group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <Search className="h-6 w-6 text-purple-500 group-focus-within:text-purple-600 transition-colors duration-300" />
        <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
      </div>
      <Input
        type="search"
        placeholder="✨ Search for amazing destinations..."
        className="pl-16 h-16 text-lg bg-white/90 backdrop-blur border-2 border-purple-200 focus:border-purple-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-purple-200 placeholder:text-gray-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
