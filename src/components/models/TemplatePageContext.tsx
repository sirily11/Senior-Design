import React, { Component } from "react";
import { BaseGraph} from "./graphs/template_graph";

interface TemplatePageState {
  graph: BaseGraph;
  update(): void;
}

interface TemplatePageProps { }

export class TemplatePageProvider extends Component<
  TemplatePageProps,
  TemplatePageState
  > {
  constructor(props: TemplatePageProps) {
    super(props);
    this.state = {
      graph: new BaseGraph(),
      update: this.update
    };
  }

  async componentWillMount() { }

  update = () => {
    const { graph } = this.state;
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
  graph: new BaseGraph(),

  update: () => { }
};

export const TemplatePageContext = React.createContext(context);
