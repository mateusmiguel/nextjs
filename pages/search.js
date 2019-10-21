import React, { Component } from "react";
import Layout from "../layouts/Layout";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      query: '',
    };
  }

  componentDidMount() {
    fetch("http://www.json-generator.com/api/json/get/cgolXDSgQy?indent=2")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });

    if (this.state.query && this.state.query.length === 1) {
        console.log(this.state.query.charAt(0))
  }

    // () => {
    //   if (this.state.query && this.state.query.length === 1) {
    //     console.log(this.state.query.charAt(0))

    //   } 
    //   else if (this.state.query.length % 2 === 0) {
    //     //... e aqui chama o filtro interno
    //     console.log(this.state.query.length)
    //   }
    // })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Layout>
          <h1>Search</h1>
          <div className="search">
            <form>
              <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
              />
            </form>       
            <ul>
              {items.map(item => (
                <li key={item.company}>
                  {item.company}
                </li>
              ))}
            </ul>
          </div>
        </Layout>
      );
    }
  }
}

export default Search;
