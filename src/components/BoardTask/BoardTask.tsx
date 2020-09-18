import React from "react";
import classnames from "classnames";
import { st, classes } from "./boardTask.st.css";

import {
  Button,
  InputSelection,
  Icon,
  InputText,
  Grid,
  ButtonGroup,
  P,
  H3,
  H4
} from "@actionishope/shelley";

interface BoardTaskProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  desc: string;
}

const BoardTask = ({
  className: classNameProp,
  title,
  desc,
  // selectable = true,
  ...rest
}: BoardTaskProps) => {
  return (
    <div
      className={st(classnames(classes.root, classNameProp, "task"))}
      {...rest}
    >
      <div className={classes.icon}></div>
      <H4 vol={2} className={classes.title}>
        {title}
      </H4>
      {/* <P className={classes.desc}>{desc}</P> */}
      {/* <span className={styles.emoji}>🚂</span> */}
    </div>
  );
};

export default BoardTask;
