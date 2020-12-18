import React from "react";

import { Icon, IconProps } from "@actionishope/shelley";

const ExpandScreenIcon = ({ className, alt }: IconProps) => {
  return (
    <Icon alt={alt} className={className}>
      {/* fullscreen icon */}
      <path d="M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z"></path>
      <path d="M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z"></path>
      <path d="M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z"></path>
      <path d="M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z"></path>
    </Icon>
  );
};

export default ExpandScreenIcon;
