import React, { Component } from "react";
import Layout from "../layouts/Layout";

class Index extends Component {

  render() {
    console.log(this.props.companies)
    return (
      <Layout>
        <h1>Home</h1>
      </Layout>
    );
  }
}

export default Index;
