import React, { Component } from "react";
import { Graph } from "./graphs/graph";
import { NodeObj, NodeTypes } from "./graphs/interfaces";
import { TemplateGraph } from "./graphs/template_graph";
import { BaseGraphPage } from "./graphs/base_graph";
import { v4 as uuidv4 } from "uuid";
import BaseNode from "./graphs/base_node";

interface HomePageContext {
  currentNode: BaseNode;
  template: TemplateGraph;
  showOpenAddNode: boolean;
  graph: BaseGraphPage;
  update(): void;
  updateCurrentNode(node: BaseNode): void;
  setOpenAddNode(value: boolean): void;
}

interface HomePageProps {}

export class HomePageProvider extends Component<
  HomePageProps,
  HomePageContext
> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      currentNode: new BaseNode({
        nodeType: NodeTypes.basenode,
        description: "",
        connection: [],
        id: uuidv4()
      }),
      graph: new Graph(),
      template: new TemplateGraph(),
      showOpenAddNode: false,
      update: this.update,
      updateCurrentNode: this.updateCurrentNode,
      setOpenAddNode: this.setAddNode
    };
  }

  async componentWillMount() {
    let graph = this.state.graph;
    let gs = await graph.getAllGraph();
    graph.graphs = gs;
    this.setState({ graph });

    let template = this.state.template;
    this.setState({ template });
  }

  update = () => {
    const { graph } = this.state;
    this.setState({ graph });

    const { template } = this.state;
    this.setState({ template });
  };

  setAddNode = (value: boolean) => {
    this.setState({ showOpenAddNode: value });
  };

  updateCurrentNode = (newNode: BaseNode) => {
    this.setState({ currentNode: newNode });
  };

  render() {
    return (
      <HomePageContext.Provider value={this.state}>
        {this.props.children}
      </HomePageContext.Provider>
    );
  }
}

const context: HomePageContext = {
  graph: new Graph(),
  template: new TemplateGraph(),
  currentNode: new BaseNode({
    nodeType: NodeTypes.basenode,
    description: "",
    connection: [],
    id: "0"
  }),
  showOpenAddNode: false,
  update: () => {},
  updateCurrentNode: (node: NodeObj) => {},
  setOpenAddNode: (value: boolean) => {}
};

export const HomePageContext = React.createContext(context);
