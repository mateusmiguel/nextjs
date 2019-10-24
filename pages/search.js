import React, { Component } from "react";
import Layout from "../layouts/Layout";

function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      d = null, c || (e = a.apply(f, g))
    }
    var f = this,
      g = arguments;
    return clearTimeout(d), d = setTimeout(h, b), c && !d && (e = a.apply(f, g)), e
  }
}
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      partners: [],
      findedPartners: []
    };
  }

  componentDidMount() {
    fetch("http://nodeserver.local.debug.site:8080/convenios")
    .then(res => res.json())
    .then(
      (result) => {
        result.data.data.sort((a, b) => (a.nomeFantasia > b.nomeFantasia) ? 1 : -1)
        this.setState({
          isLoaded: true,
          partners: result.data.data,
          findedPartners: result.data.data,
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
  


  handleSearch = debounce(searchTerm => {
    let findedPartners = this.state.partners.filter(partner => partner.nomeFantasia.includes(searchTerm.toUpperCase()) || partner.cnpj.includes(searchTerm));
    this.setState({ findedPartners })
  }, 300)


  render() {
    const { error, isLoaded, findedPartners } = this.state;

    return (
      <Layout>
        <h3>Busca</h3>

        {error ? (
          <p>Não foi possível carregar a lista de parceiros no momento. Tente novamente em alguns instantes.</p>
        ) : !isLoaded? (
          <p>Carregando...</p>
        ) : (
            <div className="search">

              <form onSubmit={e => { e.preventDefault(); }}>
                <input
                  placeholder="Busque uma empresa..."
                  onChange={e => { this.handleSearch(e.target.value) }}
                />
                <button type="submit">S</button>
              </form>
              <ul>
                <li class="search-title">
                  <p>EMPRESA</p>
                  <p>CNPJ</p>  
                </li>
                {findedPartners &&
                  findedPartners.map((item, key) => (
                    <li key={key}>
                      <p>{item.nomeFantasia.toLowerCase()}</p>
                      <p>{item.cnpj}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}
      </Layout>
    );
  }
}

export default Search;
