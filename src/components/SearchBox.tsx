import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBox({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500" />
      <Input
        type="search"
        placeholder="Search destinations..."
        className="pl-12 h-14 text-lg"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
