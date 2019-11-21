import React, { Component } from "react";
import { Graph } from "./graph";

interface HomePageContext {
  graph: Graph;
  update(): void;
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
      update: this.update
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
  update: () => {}
};

export const HomePageContext = React.createContext(context);
