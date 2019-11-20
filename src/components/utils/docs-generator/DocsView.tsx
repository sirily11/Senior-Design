import React, { Component } from "react";
import { Menu as MenuI } from "./docs_generator";
import { Grid, Menu, Segment } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import "semantic-ui-css/semantic.min.css";
import { docs } from "../../pages/Home/Introductions/document";

interface Props {
  docs: MenuI[];
}

interface State {
  selectedMenu?: MenuI;
}

export default class DocsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
  }

  componentWillMount(){
    this.setState({selectedMenu : docs[0]})
  }


  render() {
    const { selectedMenu } = this.state;

    return (
      <Grid>
        <Grid.Column computer={5} mobile={16}>
          <Menu vertical>
            {this.props.docs.map(menu => {
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
