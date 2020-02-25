import React, { useContext } from "react";

import { Grid, Label } from "semantic-ui-react";
import { HomePageContext } from "../../../../models/HomepageContext";

export default function TemplateInfo() {
  const { template, update } = useContext(HomePageContext);

  return (
    <Grid.Column computer={10}>
      {template.graphs.map(t => (
        <Label
          as="a"
          onClick={() => {
            // template.graphs(t);
            update();
          }}
        >
          {t.name}
        </Label>
      ))}
    </Grid.Column>
  );
}
