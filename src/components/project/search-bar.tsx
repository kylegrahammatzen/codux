"use client";

import { Input } from "@/components/ui/input";
import { Search, Loader2, X } from "lucide-react";
import { useProjects } from "@/providers/projects-provider";
import { cn } from "@/lib/utils";

export const ProjectSearchBar = () => {
  const { searchQuery, setSearchQuery, isSearching, projects } = useProjects();

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <Input
      placeholder="Search projects..."
      leadingIcon={isSearching ? <Loader2 className="animate-spin" /> : <Search />}
      trailingIcon={
        <div
          className={cn(
            "transition-all duration-300 ease-[cubic-bezier(.165,.84,.44,1)]",
            searchQuery ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <X
            onClick={handleClear}
            className="pointer-events-auto hover:scale-110 transition-transform cursor-pointer"
          />
        </div>
      }
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      disabled={projects.length === 0}
    />
  );
};
