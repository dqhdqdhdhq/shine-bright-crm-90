
import React from "react";
import { ViewMode, ViewModeSwitchProps } from "@/components/jobs/ViewModeSwitch";
import ViewModeSwitch from "@/components/jobs/ViewModeSwitch";

// This component is just a wrapper around ViewModeSwitch to maintain backward compatibility
const JobsViewModeSwitch: React.FC<ViewModeSwitchProps> = (props) => {
  return <ViewModeSwitch {...props} />;
};

export type { ViewMode } from "@/components/jobs/ViewModeSwitch";
export default JobsViewModeSwitch;
