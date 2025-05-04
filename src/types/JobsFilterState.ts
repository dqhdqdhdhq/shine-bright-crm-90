
import { JobStatus } from "@/data/mockData";

export type FilterState = {
  status: JobStatus | 'all';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  staffIds: string[];
  serviceIds: string[];
  clientName: string;
  zipCode: string;
  hasNotes: boolean;
  needsFollowUp: boolean;
  unassigned: boolean;
};

export type SavedView = {
  id: string;
  name: string;
  filters: FilterState;
};
