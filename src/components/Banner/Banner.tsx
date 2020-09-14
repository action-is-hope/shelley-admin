import React from "react";
import classnames from "classnames";
import { st, classes } from "./banner.st.css";

import { Grid, GridProps } from "@actionishope/shelley";
// import { classes as grid } from "@actionishope/shelley/style/css/grid.st.css";

const Banner = ({ className: classNameProp, children, ...rest }: GridProps) => {
  return (
    <Grid
      tag="header"
      role="banner"
      className={st(classnames(classes.root, classNameProp))}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export default Banner;
