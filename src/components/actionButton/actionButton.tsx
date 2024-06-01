import React, { ReactNode, memo } from "react";
import { cn } from "@bem-react/classname";
import clsx from "clsx";

import "./actionButton.css";
const cnActionButton = cn("actionButton");

type Props = {
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler;
};

const ActionButton = ({ className, children, onClick }: Props) => {
  return (
    <button
      className={clsx(className, "center", cnActionButton())}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(ActionButton);
