import React, { Component } from "react";
import { Graph } from "./graph";
import { NodeObj } from "./interfaces";

interface HomePageContext {
  graph: Graph;
  currentNode: NodeObj;
  showOpenAddNode: boolean;
  update(): void;
  updateCurrentNode(node: NodeObj): void;
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
      graph: new Graph(),
      currentNode: { shape: { color: "red", shape: "rect" }, connection: [] },
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
  }

  update = () => {
    const { graph } = this.state;
    console.log(graph.selectedGraph?.nodes);
    this.setState({ graph });
  };

  setAddNode = (value: boolean) => {
    this.setState({ showOpenAddNode: value });
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
  showOpenAddNode: false,
  update: () => {},
  updateCurrentNode: (node: NodeObj) => {},
  setOpenAddNode: (value: boolean) => {}
};

export const HomePageContext = React.createContext(context);
