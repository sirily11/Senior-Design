import React, { Component } from "react";
import { Graph, NodeObj } from "./graph";

interface HomePageContext {
  graph: Graph;
  currentNode: NodeObj;
  update(): void;
  updateCurrentNode(node: NodeObj): void;
}

interface HomePageProps {}

export class HomePageProvider extends Component<
  HomePageProps,
  HomePageContext
> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      graph: new Graph(),
      currentNode: { shape: { color: "red", shape: "rect" }, connection: [] },
      update: this.update,
      updateCurrentNode: this.updateCurrentNode
    };
  }

  async componentWillMount() {
    let graph = this.state.graph;
    let gs = await graph.getAllGraph();
    graph.graphs = gs;
    this.setState({ graph });
  }

  update = () => {
    const { graph } = this.state;
    this.setState({ graph });
  };

  updateCurrentNode = (newNode: NodeObj) => {
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
  currentNode: { shape: { color: "red", shape: "rect" }, connection: [] },
  update: () => {},
  updateCurrentNode: (node: NodeObj) => {}
};

export const HomePageContext = React.createContext(context);
