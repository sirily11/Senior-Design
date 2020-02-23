import React, { useContext } from "react";
import { Shape, NodeShapeTypes, NodeObj } from "../../../../models/graph";
import { Stage, Layer, Star, Text, Circle, Rect, Line, Ellipse, Arrow } from "react-konva";
import { HomePageContext } from "../../../../models/HomeContext";

export default function TemplateDisplay(props: { shape: Shape | undefined }) {
  const circleRadius = 40;
  const ellipseRadiusX = 50;
  const ellipseRadiusY = 25;
  const rectWidth = 100;
  const rectHeight = 50;
  const rectY = 150;
  const ellipseY = 300;
  const circleY = 450;
  
  const EllipseA = {
    radiusX: ellipseRadiusX,
    radiusY: ellipseRadiusY,
    x: 275,
    y: 50,
    fill: 'purple',
    draggable: true
  };
  
  const RectA = {
    width: rectWidth,
    height: rectHeight,
    x: 75,
    y: rectY,
    fill: 'red',
    draggable: true
  };
  
  const RectB = {
    width: rectWidth,
    height: rectHeight,
    x: 220,
    y: rectY,
    fill: 'red',
    draggable: true
  };
  
  const RectC = {
    width: rectWidth,
    height: rectHeight,
    x: 350,
    y: rectY,
    fill: 'orange',
    draggable: true
  };
  
  const EllipseB = {
    radiusX: ellipseRadiusX,
    radiusY: ellipseRadiusY,
    x: 100,
    y: ellipseY,
    fill: 'green',
    draggable: true
  };
  
  const EllipseC = {
    radiusX: ellipseRadiusX,
    radiusY: ellipseRadiusY,
    x: 225,
    y: ellipseY,
    fill: 'blue',
    draggable: true
  };
  
  const EllipseD = {
    radiusX: ellipseRadiusX,
    radiusY: ellipseRadiusY,
    x: 350,
    y: ellipseY,
    fill: 'purple',
    draggable: true
  };
  
  const EllipseE = {
    radiusX: ellipseRadiusX,
    radiusY: ellipseRadiusY,
    x: 500,
    y: ellipseY,
    fill: 'purple',
    draggable: true
  };
  
  const EllipseF = {
    radiusX: ellipseRadiusX,
    radiusY: ellipseRadiusY,
    x: 650,
    y: ellipseY,
    fill: 'purple',
    draggable: true
  };
  
  const CircleA = {
    radius: circleRadius,
    x: 350,
    y: circleY,
    fill: 'indigo',
    draggable: true
  }
  
  const CircleB = {
    radius: circleRadius,
    x: 500,
    y: circleY,
    fill: 'indigo',
    draggable: true
  }
  
  const CircleC = {
    radius: circleRadius,
    x: 650,
    y: circleY,
    fill: 'indigo',
    draggable: true,
  }
  
  const Edge = ({node1, node2}: {node1: any, node2: any}) => {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    let angle = Math.atan2(-dy, dx);
  
    const radius = 1;
  
    const arrowStart = {
      x: node2.x + -radius * Math.cos(angle + Math.PI),
      y: node2.y + radius * Math.sin(angle + Math.PI)
    };
  
    const arrowEnd = {
      x: node1.x + -radius * Math.cos(angle),
      y: node1.y + radius * Math.sin(angle)
    };
  
    return(
      <Line
        tension={0.2}
        points={[
          arrowStart.x,
          arrowStart.y,
          arrowEnd.x,
          arrowEnd.y
        ]}
        stroke="#000"
        fill="#000"
        strokeWidth={3}
        pointerWidth={6}
        />
    );
  };

  const [ellipseANode, updateEllipseANode] = React.useState(EllipseA);
  const [ellipseBNode, updateEllipseBNode] = React.useState(EllipseB);
  const [ellipseCNode, updateEllipseCNode] = React.useState(EllipseC);
  const [ellipseDNode, updateEllipseDNode] = React.useState(EllipseD);
  const [ellipseENode, updateEllipseENode] = React.useState(EllipseE);
  const [ellipseFNode, updateEllipseFNode] = React.useState(EllipseF);


  const [rectANode, updateRectA] = React.useState(RectA);
  const [rectBNode, updateRectB] = React.useState(RectB);
  const [rectCNode, updateRectC] = React.useState(RectC);

  const [circleANode, updateCircleA] = React.useState(CircleA);
  const [circleBNode, updateCircleB] = React.useState(CircleB);
  const [circleCNode, updateCircleC] = React.useState(CircleC);

  const renderShape = (shape: NodeShapeTypes | undefined) => {

    switch (shape) {
      case "Template 1":
        return (
        <Layer>
          <Edge node1={rectANode} node2={ellipseANode}/>
            <Edge node1={rectBNode} node2={ellipseANode}/>
            <Edge node1={rectCNode} node2={ellipseANode}/>
            <Edge node1={ellipseBNode} node2={rectCNode}/>
            <Edge node1={ellipseCNode} node2={rectCNode}/>
            <Edge node1={ellipseDNode} node2={rectCNode}/>
            <Edge node1={ellipseENode} node2={rectCNode}/>
            <Edge node1={ellipseFNode} node2={rectCNode}/>
            <Edge node1={circleANode} node2={ellipseDNode}/>
            <Edge node1={circleBNode} node2={ellipseENode}/>
            <Edge node1={circleCNode} node2={ellipseFNode}/>

              <Ellipse
                {...ellipseANode}
                onDragMove={e => {
                  updateEllipseANode({ ...ellipseANode, ...e.target.position() });
                }}
              />

              <Rect
                {...rectANode}
                onDragMove={e => {
                  updateRectA({ ...rectANode, ...e.target.position()});
                }}
                />

              <Rect
                {...rectBNode}
                onDragMove={e => {
                  updateRectB({ ...rectBNode, ...e.target.position()});
                }}
                />

              <Rect
              {...rectCNode}
              onDragMove={e => {
                updateRectC({ ...rectCNode, ...e.target.position()});
              }}
              />

              <Ellipse
              {...ellipseBNode}
              onDragMove={e => {
                updateEllipseBNode({ ...ellipseBNode, ...e.target.position() });
              }}
              />

              <Ellipse
              {...ellipseCNode}
              onDragMove={e => {
                updateEllipseCNode({ ...ellipseCNode, ...e.target.position() });
              }}
              />

              <Ellipse
              {...ellipseDNode}
              onDragMove={e => {
                updateEllipseDNode({ ...ellipseDNode, ...e.target.position() });
              }}
              />

              <Ellipse
              {...ellipseENode}
              onDragMove={e => {
                updateEllipseENode({ ...ellipseENode, ...e.target.position() });
              }}
              />

              <Ellipse
              {...ellipseFNode}
              onDragMove={e => {
                updateEllipseFNode({ ...ellipseFNode, ...e.target.position() });
              }}
              />

              <Circle
              {...circleANode}
              onDragMove={e => {
                updateCircleA({ ...circleANode, ...e.target.position() });
              }}
              />

              <Circle
              {...circleBNode}
              onDragMove={e => {
                updateCircleB({ ...circleBNode, ...e.target.position() });
              }}
              />

              <Circle
              {...circleCNode}
              onDragMove={e => {
                updateCircleC({ ...circleCNode, ...e.target.position() });
              }}
              />
            </Layer>
        );
    }
  };

  return (
    <Stage width={400} height={400}>
      {/* <{template?.selectedTemplate?.nodes.map((n, index) => renderShape(n, index))}> */}
      {renderShape(props.shape?.shape)}
    </Stage>
  );
}
