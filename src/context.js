import React, {Component} from "react";
import axios from "axios";
const Context = React.createContext();
// const url = 'https://api.themoviedb.org/3/search/multi?api_key=';
const lang = "en-US"
// const searchText = '';
// const searchText = "bond";
// const searchUrl = `https://api.themoviedb.org/3/search/?api_key=${
//   process.env.REACT_APP_MS_KEY
// }&language=${lang}&query=${searchText}`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${
  process.env.REACT_APP_MS_KEY
}&language=${lang}&page=1`;

export class Provider extends Component {
  state = {
    language: lang,
    movie_list: [],
    heading: "Top 10 Movies"
  };

  componentDidMount() {
    axios
      .get(popularUrl)
      .then(result => {
        // console.log(result.data.results);
         this.setState({ movie_list: result.data.results });
      })
      .catch(err => console.error(err));
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
