import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";

import { P } from "@actionishope/shelley";

const SecondPage = () => (
  <DefaultLayout>
    <div>
      <h1>Hi from the second page</h1>
      <P>Welcome to page 2</P>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </DefaultLayout>
);

export default SecondPage;
