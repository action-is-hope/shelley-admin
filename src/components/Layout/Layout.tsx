import React from "react";
import classnames from "classnames";
import { st, classes } from "./layout.st.css";

import { Grid, GridProps, Text } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gridMode: "fullScreenMode" | "focusMode" | false;
}
const Layout = ({
  className: classNameProp,
  children,
  gridMode = false,
  ...rest
}: LayoutProps) => {
  return (
    <div
      className={st(classnames(classes.root, classNameProp), { gridMode })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Layout;
