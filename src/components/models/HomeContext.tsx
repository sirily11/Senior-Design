import React, { Component } from "react";



interface HomePageContext {
  
}

interface HomePageProps {}

export class HomePageProvider extends Component<HomePageProps, HomePageContext> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
    
    };
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
  
};

export const HomePageContext = React.createContext(context);