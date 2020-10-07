import React from "react";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { Text, H1, H2, H3, P, Grid } from "@actionishope/shelley";
import { st, classes } from "./solution.st.css";

import { classes as text } from "@actionishope/shelley/styles/default/text.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as spacing } from "@actionishope/shelley/styles/shelley/mixins/spacing.st.css";

import Inches from "../components/Inches/Inches";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema.
interface SolutionPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const SolutionPage = ({ data }: SolutionPageProps) => {
  return (
    <DefaultLayout>
      <Grid variant={6} formatted className={classes.root}>
        <header>
          <img src="https://pbs.twimg.com/media/D0-txZEXgAIRnIF.jpg" alt="" />
          <H1 vol={6} uppercase>
            Go Fully charged with an electric car
          </H1>
        </header>
        <div className={classes.added}>
          <P vol={2}>Added 2 weeks ago</P>
        </div>
        <div className={classes.summary}>
          <H2 vol={1} uppercase>
            abgeschlossen
          </H2>
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default SolutionPage;

export const solutionQuery = graphql`
  query SolutionInches {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
