import React, { useContext } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import { NodeObj } from "../../../../models/graphs/interfaces";
import { TemplatePageContext } from "../../../../models/TemplatePageContext";
import { Card, CardContent } from "@material-ui/core";
import { CardHeader } from "semantic-ui-react";

export default function GraphDisplay() {


  const templateContext = useContext(TemplatePageContext);
  return (
    <div>
      <Stage width={window.innerWidth / 2} height={600}>
        {/* <Layer>
          <Rect
            x={0}
            y={0}
            width={50}
            height={50}
            fill={"red"}
            shadowBlur={5}

          />
        </Layer> */}
        {templateContext.graph.selectedGraph?.render()}
      </Stage>
      <Card>
        <CardContent>
          <CardHeader>
            <h3>{templateContext.graph.selectedGraph?.name}</h3>
          </CardHeader>
          <div>{templateContext.graph.selectedGraph?.description}</div>
        </CardContent>
      </Card>
    </div>
  );
}
