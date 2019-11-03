import React, { Component } from "react";
import { DocsGenerator, Menu as MenuI } from "./docs_generator";
import { Grid, Menu, Segment } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import "semantic-ui-css/semantic.min.css";

interface Props {
  path: string;
}

interface State {
  docs: DocsGenerator;
  selectedMenu?: MenuI;
}

export default class DocsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let docs = new DocsGenerator("");
    this.state = {
      docs: docs
    };
  }

  async componentDidMount() {
    await this.read();
  }

  async componentDidUpdate(prev: Props) {
    if (prev.path !== this.props.path) {
      await this.read();
    }
  }

  private async read() {
    let path = this.props.path;
    let docs = new DocsGenerator(path);
    await docs.readDocs();
    this.setState({ docs });
  }

  render() {
    const { docs, selectedMenu } = this.state;

    return (
      <Grid>
        <Grid.Column computer={5} mobile={16}>
          <Menu vertical>
            {docs.menus.map(menu => {
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
