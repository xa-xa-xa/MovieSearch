import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        query_results: action.payload.data,
        heading: 'Search results for: ',
        query: action.payload.query,
        error: action.payload.error
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
    marked: {
      liked: [],
      saved: [],
      shared: []
    },
    query_results: [],
    heading: 'Top 20 Movies',
    query: '',
    error: false,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios
      .get(
        `${baseUrl}movie/popular?api_key=${process.env.REACT_APP_MS_KEY}&language=${this.state.language}&page=1`
      )
      .then(res => this.setState({ query_results: res.data.results }))
      .catch(err => console.er(err.response));
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
