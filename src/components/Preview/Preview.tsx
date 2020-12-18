import React from "react";
import classnames from "classnames";
import { st, classes } from "./Preview.st.css";

import { Grid, GridProps, Text } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  previewMode: number;
}
const Preview = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      previewMode = 1,
      ...rest
    }: PreviewProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        className={st(classnames(classes.root, classNameProp), { previewMode })}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Preview.displayName = "Preview";

export default Preview;
