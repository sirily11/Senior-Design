import React, { Component } from "react";
import { Graph, NodeObj, Template } from "./graph";

interface HomePageContext {
  graph: Graph;
  template: Template;
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
      template: new Template(),
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

    let template = this.state.template;
    let ts = await template.getAllTemplate();
    template.templates = ts;
    this.setState({template});
  }

  update = () => {
    const { graph } = this.state;
    console.log(graph.selectedGraph?.nodes);
    this.setState({ graph });

    const{template} = this.state;
    console.log(template.selectedTemplate?.nodes);
    this.setState({template});
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
  template: new Template(),
  currentNode: { shape: { color: "red", shape: "rect" }, connection: [] },
  showOpenAddNode: false,
  update: () => {},
  updateCurrentNode: (node: NodeObj) => {},
  setOpenAddNode: (value: boolean) => {}
};

export const HomePageContext = React.createContext(context);
