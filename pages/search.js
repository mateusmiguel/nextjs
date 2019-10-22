import React, { Component } from "react";
import Layout from "../layouts/Layout";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      partners: [],
      findedPartners: [],
      query: 'ax',
    };
  }

  componentDidMount() {
    fetch("http://www.json-generator.com/api/json/get/cgolXDSgQy?indent=2")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          partners: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );

  }

  componentDidUpdate(prevState) {
    console.log('finder: ', this.state.query);
    console.log('partners: ', this.state.findedPartners)
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    });
  }

  // função que faz a busca
  handlePartners = () => {
    const { partners } = this.state;
    
    let finder = this.search.value;

    var findedPartners =  partners.filter(function(partner) {
      return eval('/'+finder+'/').test(partner.company);
    });

    this.setState({
      findedPartners: findedPartners
    });
    
  }

  render() {
    const { error, isLoaded, partners,findedPartners  } = this.state;
  
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
                onChange={this.handlePartners}
              />
            </form>       
            <ul>
              {findedPartners &&
              
                findedPartners.map(item => (
                  <li key={item.company}>
                    {item.company}
                  </li>
                ))
              }

            </ul>
          </div>
        </Layout>
      );
    }
  }
}

export default Search;
