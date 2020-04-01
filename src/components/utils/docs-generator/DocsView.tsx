import React, { Component } from "react";
import { Menu as MenuI } from "./docs_generator";
import { Grid, Menu, Segment } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import "semantic-ui-css/semantic.min.css";
import { intro, safety } from "../../pages/Home/Introductions/document";

interface Props {
  intro: MenuI[];
  safety: MenuI[];
  acknowledgement: MenuI[];
}

interface State {
  selectedMenu?: MenuI;
}

export default class DocsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
  }

  componentWillMount(){
    this.setState({selectedMenu : intro[0]})
  }


  render() {
    const { selectedMenu } = this.state;

    return (
      <Grid>
        <Grid.Column computer={5} mobile={16}>
          <Menu vertical>
            {this.props.intro.map(menu => {
              return (
                <Menu.Item
                  name={menu.name}
                  active={selectedMenu === menu}
                  onClick={(e, { name }) => {
                    this.setState({ selectedMenu: menu });
                  }}
                />
              );
            })}
          </Menu>
          <Menu vertical>
            {this.props.safety.map(menu => {
              return (
                <Menu.Item
                  name={menu.name}
                  active={selectedMenu === menu}
                  onClick={(e, { name }) => {
                    this.setState({ selectedMenu: menu });
                  }}
                />
              );
            })}
          </Menu>
          <Menu vertical>
            {this.props.acknowledgement.map(menu => {
              return (
                <Menu.Item
                  name={menu.name}
                  active={selectedMenu === menu}
                  onClick={(e, { name }) => {
                    this.setState({ selectedMenu: menu });
                  }}
                />
              );
            })}
          </Menu>
        </Grid.Column>
        <Grid.Column computer={11} mobile={16}>
          {selectedMenu && (
            <ReactMarkdown source={selectedMenu.doc.content}></ReactMarkdown>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
