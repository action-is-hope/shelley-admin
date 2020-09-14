import React from "react";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { Text, H1, H2, H3, P, Grid } from "@actionishope/shelley";

import { classes as text } from "@actionishope/shelley/styles/default/text.st.css";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";
import { classes as spacing } from "@actionishope/shelley/styles/shelley/mixins/spacing.st.css";

import Banner from "../components/Banner/Banner";
import EditPreview from "../components/EditPreview/EditPreview";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema.
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  return (
    <DefaultLayout>
      <EditPreview />
    </DefaultLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery2 {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
