import "isomorphic-fetch";
import React from "react";
import { IServer } from "@maam/app-common";

interface IAppState {
  server?: IServer;
  serverJson: string;
}

export class App extends React.Component<{}, IAppState> {
  public render() {
    return (
      <>
        <table>
          <tr>
            <td>
              <button onClick={this.handleLogin}>Login</button>
            </td>
            <td>
              <textarea
                readOnly
                value={
                  JSON.stringify(
                    this.state && this.state.server || {}, 
                    null, 
                    2,
                  )
                }
              >
              </textarea>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={this.handleCreate}>Update</button>
            </td>
            <td>
              <textarea
                value={this.state && this.state.serverJson || ""}
                onChange={(event) => this.setState({ serverJson: event.target.value }) }
              >
              </textarea>
            </td>
          </tr>
        </table>
      </>
    );
  }
  
  private handleLogin = async () => {
    const result = await fetch(
      "/auth/server", 
      {
        body: `{"apiKey": "testApiKey"}`,
        method: "POST", 
        headers: {"Content-Type": "application/json"},
      }
    );
    
    if (!result.ok) {
      return alert("Login failed!");
    }
    
    this.setState({
      server: await result.json(),
    });
  };
  
  private handleCreate = async () => {
    const result = await fetch(
      "/server",
      {
        body: this.state && this.state.serverJson || "{}",
        method: "PUT",
        headers: {"Content-Type": "application/json"},
      },
    );
    
    if (!result.ok) {
      let err = "";
      try {
        err = JSON.stringify(
          await result.json() || {},
          null,
          2,
        )
      } catch  {}
      
      return alert("Create failed!\n" + err);
    }

    this.setState({
      server: await result.json(),
    });
  };
}
