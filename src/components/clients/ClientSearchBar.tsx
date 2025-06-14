
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ClientSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

export const ClientSearchBar: React.FC<ClientSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search clients...",
}) => {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10 pr-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200 bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 hover:text-gray-600"
          onClick={() => setSearchTerm("")}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
