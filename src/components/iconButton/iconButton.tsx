import { cn } from "@bem-react/classname";
import clsx from "clsx";
import React, { MouseEventHandler, ReactNode, memo } from "react";
import "./iconButton.css";
type Props = {
  className?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  onClick: MouseEventHandler;
};
const cnIconButton = cn("iconButton");
const IconButton = ({ className, icon, onClick, size = "sm" }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, "center", cnIconButton({ size }))}
    >
      {icon}
    </button>
  );
};
export default memo(IconButton);
