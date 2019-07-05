import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIE":
      return {
        ...state,
        movie_list: action.payload,
        heading: "Search Results"
      };
    default:
      return state;
  }
};

const baseUrl = "https://api.themoviedb.org/3/";
let lang = "en-US";

export class Provider extends Component {
  state = {
    language: lang,
    movie_list: [],
    heading: "Top 10 Movies",
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
        this.setState({ movie_list: result.data.results });
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
