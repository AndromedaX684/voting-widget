import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

interface FilterPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterStatus: string | null;
  setFilterStatus: (status: string | null) => void;
  statusOptions: string[];
  children: React.ReactNode;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  open,
  onOpenChange,
  filterStatus,
  setFilterStatus,
  statusOptions,
  children,
}) => (
  <Popover open={open} onOpenChange={onOpenChange}>
    <PopoverTrigger asChild>{children}</PopoverTrigger>
    <PopoverContent className="w-40 p-2">
      <div className="font-semibold text-sm mb-2 ml-1">Filter by status</div>
      {statusOptions.map((status) => (
        <Button
          key={status}
          variant={filterStatus === status ? "default" : "outline"}
          size="sm"
          className="w-full mb-1"
          onClick={() =>
            setFilterStatus(filterStatus === status ? null : status)
          }
        >
          {status}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-2 text-xs"
        onClick={() => setFilterStatus(null)}
      >
        Clear Filter
      </Button>
    </PopoverContent>
  </Popover>
);

export default FilterPopover;
