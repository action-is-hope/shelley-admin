import React, { useState } from "react";
import classnames from "classnames";
import Link from "gatsby-link";
import { H2, P, Button } from "@actionishope/shelley";
import { st, classes } from "./launch.st.css";
import Card from "../Card/Card";
import ListBasic from "../ListBasic/ListBasic";

export interface LaunchProps extends React.HTMLAttributes<HTMLDivElement> {
  boards: any;
  onBoardSelect: any;
}

const Launch = ({
  className: classNameProp,
  children,
  className,
  boards,
  onBoardSelect,
  ...rest
}: LaunchProps) => {
  const rootClassNames = classnames(classes.root, classNameProp);
  const [allBoards, setBoards] = useState(boards);
  return (
    <div className={st(rootClassNames)} {...rest}>
      <P vol={5}>A 'doing' platform.</P>
      {/* <P vol={5}>Let's get things done.</P> */}

      <div className={classes.snapScroll}>
        <div className={classes.slide}>
          <H2 uppercase vol={4} className={classes.listTitle}>
            My teams
          </H2>

          <ListBasic
            items={allBoards}
            id="teamList"
            onClick={event => {
              event.preventDefault();
              onBoardSelect();
            }}
          />
        </div>

        <div className={classes.slide}>
          <H2 uppercase vol={4} className={classes.listTitle}>
            My 'Sphere of Influence'
          </H2>

          <ListBasic
            items={allBoards}
            id="teamList"
            onClick={event => {
              event.preventDefault();
              onBoardSelect();
            }}
          />
        </div>
      </div>
      {/* <ul className={classes.boardList}>
        {allBoards.map((item: any) => (
          <Card
            key={item.id}
            title={item.name}
            description={item.description}
            onClick={event => {
              event.preventDefault();
              onBoardSelect();
            }}
          />
        ))}

        <li>
          <Button tone={5} variant={5}>
            +
          </Button>
        </li>
      </ul> */}
    </div>
  );
};

export default Launch;
