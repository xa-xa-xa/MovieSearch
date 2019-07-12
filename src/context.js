import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIE':
      return {
        ...state,
        query_results: action.payload.data,
        heading: 'Search results for: ',
        query: action.payload.query
      };
    default:
      return state;
  }
};

const baseUrl = 'https://api.themoviedb.org/3/';
let lang = 'en-US';

export class Provider extends Component {
  state = {
    language: lang,
    query_results: [],
    heading: 'Top 20 Movies',
    query: '',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios
      .get(
        `${baseUrl}movie/popular?api_key=${
          process.env.REACT_APP_MS_KEY
        }&language=${this.state.language}&page=1`
      )
      .then(result => {
        this.setState({ query_results: result.data.results });
      })
      .catch(err => console.error(err.response));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
