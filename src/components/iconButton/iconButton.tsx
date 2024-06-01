import { cn } from "@bem-react/classname";
import clsx from "clsx";
import React, { MouseEventHandler, ReactNode, forwardRef, memo } from "react";
import "./iconButton.css";
type Props = {
  className?: string;
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  onClick?: MouseEventHandler;
};
const cnIconButton = cn("iconButton");
const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, icon, onClick, size = "sm" }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={clsx(className, "center", cnIconButton({ size }))}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "Icon Button";
export default memo(IconButton);
