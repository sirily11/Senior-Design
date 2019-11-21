import React, { Component } from "react";
import { Graph } from "./graph";



interface HomePageContext {
  graph : Graph
}

interface HomePageProps {}

export class HomePageProvider extends Component<HomePageProps, HomePageContext> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      graph : new Graph()
    };
  }

  update = () =>{
    const { graph } = this.state
    this.setState({graph})
  }

  render() {
    return (
      <HomePageContext.Provider value={this.state}>
        {this.props.children}
      </HomePageContext.Provider>
    );
  }
}

const context: HomePageContext = {
    graph : new Graph()
};

export const HomePageContext = React.createContext(context);