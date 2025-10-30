"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProjects } from "@/providers/projects-provider";

export const ProjectSearchBar = () => {
  const { searchQuery, setSearchQuery } = useProjects();

  return (
    <Input
      placeholder="Search projects..."
      leadingIcon={<Search />}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};
