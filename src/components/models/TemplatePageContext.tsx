import React, { Component } from "react";
import { TemplateGraph } from "./template_graph";

interface TemplatePageState {
  graph: TemplateGraph;
  update(): void;
}

interface TemplatePageProps {}

export class TemplatePageProvider extends Component<
  TemplatePageProps,
  TemplatePageState
> {
  constructor(props: TemplatePageProps) {
    super(props);
    this.state = {
      graph: new TemplateGraph(),

      update: this.update
    };
  }

  async componentWillMount() {}

  update = () => {
    const { graph } = this.state;
    console.log(graph.selectedGraph?.nodes);
    this.setState({ graph });
  };

  render() {
    return (
      <TemplatePageContext.Provider value={this.state}>
        {this.props.children}
      </TemplatePageContext.Provider>
    );
  }
}

const context: TemplatePageState = {
  graph: new TemplateGraph(),

  update: () => {}
};

export const TemplatePageContext = React.createContext(context);
