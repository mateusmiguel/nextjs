import React, { Component } from "react";
import "isomorphic-fetch";
import Layout from "../layouts/Layout";

class Index extends Component {
  static getInitialProps = async () => {
    const res = await fetch('https://api.github.com/users/mateusmiguel/repos')
    return { repositories: await res.json() };
  };

  render() {
    return (
      <Layout>
        <h1>Home</h1>
        <ul>
          {this.props.repositories.map(repo => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default Index;
