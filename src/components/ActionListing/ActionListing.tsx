import React from "react";
import classnames from "classnames";
import { st, classes } from "./actionListing.st.css";

import { Button, H4, P } from "@actionishope/shelley";
import { Link } from "gatsby";

import AddToBoard from "../icons/AddToBoard";

interface ActionListingProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  description?: string;
  image?: string;
  url: string;
  onAddToTeam?: () => void;
  onAddToBoard?: () => void;
}

const ActionListing = ({
  className: classNameProp,
  title,
  description,
  image,
  url,
  onClick,
  onAddToTeam,
  onAddToBoard,
  ...rest
}: ActionListingProps) => {
  return (
    <li className={st(classnames(classes.root, classNameProp))} {...rest}>
      <div className={classes.media}>{image && <img src={image} alt="" />}</div>
      <div className={classes.text}>
        <H4 uppercase vol={2}>
          {/* <Link to={url}>{title}</Link> */}
          <a href={url}>{title}</a>
        </H4>
        {description && <P vol={2}>{description}</P>}
      </div>
      <div className={classes.actions}>
        <Button
          tone={5}
          variant={3}
          vol={2}
          icon={<AddToBoard alt="Add to board" />}
        />
      </div>
    </li>
  );
};

export default ActionListing;
