import React from "react";
import classnames from "classnames";
import Link from "gatsby-link";
import { H2, H3, P } from "@actionishope/shelley";
import { st, classes } from "./listBasic.st.css";

export interface ListBasicProps extends React.HTMLAttributes<HTMLBaseElement> {
  items: [
    {
      title: string;
      media?: string;
      id: string;
      description?: string;
      url?: string;
      emoji?: string;
    }
  ];
  /** Variant index. */
  variant?: number;
}

const ListBasic = ({
  className: classNameProp,
  id,
  items,
  onClick
}: ListBasicProps) => {
  const rootClassNames = classnames(classes.root, classNameProp);

  return (
    <ul className={st(rootClassNames)}>
      {items.map((item: any, index: number) => {
        return (
          <li className={classes.item} key={`${id}-${index}`}>
            <div className={classes.text}>
              <H3 className={classes.title} uppercase vol={3}>
                <span className={classes.emoji}>{item.emoji} </span>
                {item.url && (
                  <Link className={classes.link} to={item.url}>
                    {item.title}
                  </Link>
                )}
                {onClick && (
                  <a
                    className={classes.link}
                    onClick={e => onClick(e)}
                    href="#"
                  >
                    {item.title}
                  </a>
                )}
              </H3>
              {/* {item.description && <P>{item.description}</P>} */}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListBasic;
