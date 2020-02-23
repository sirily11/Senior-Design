import React, { useContext } from "react";
import { HomePageContext } from "../../../../models/HomeContext";
import { Grid, Label } from "semantic-ui-react";

export default function TemplateInfo() {
  const { template, update } = useContext(HomePageContext);

  return (
    <Grid.Column computer={10}>
      {template.templates.map(t => (
        <Label
          as="a"
          onClick={() => {
            template.selectTemplate(t);
            update();
          }}
        >
          {t.name}
        </Label>
      ))}
    </Grid.Column>
  );
}
