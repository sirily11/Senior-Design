import React, { Component } from "react";
import { Graph } from "./graphs/graph";
import { NodeObj } from "./graphs/interfaces";
import { TemplateGraph } from "./graphs/template_graph";
import { BaseGraphPage, BaseNode } from "./graphs/base_graph";

interface HomePageContext {
  currentNode?: BaseNode
  graph: Graph;
  template: TemplateGraph;
  showOpenAddNode: boolean;
  currentSelectedGraph?: BaseGraphPage;
  update(): void;
  updateCurrentNode(node: NodeObj): void;
  setOpenAddNode(value: boolean): void;
}

interface HomePageProps { }

export class HomePageProvider extends Component<
  HomePageProps,
  HomePageContext
  > {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      currentNode: undefined,
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
    console.log(graph.selectedGraph?.nodes);
    this.setState({ graph });

    const { template } = this.state;
    console.log(template.selectedGraph?.nodes);
    this.setState({ template });
  };

  setAddNode = (value: boolean) => {
    this.setState({ showOpenAddNode: value });
  };

  updateCurrentNode = (newNode: NodeObj) => {

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

  showOpenAddNode: false,
  update: () => { },
  updateCurrentNode: (node: NodeObj) => { },
  setOpenAddNode: (value: boolean) => { }
};

export const HomePageContext = React.createContext(context);
