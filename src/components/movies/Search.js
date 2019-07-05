import React, { Component } from "react";
import { Consumer } from "../../context";

// import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./searchStyles.module.css";

// const s = styled;
const baseUrl = `https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/`;

export default class Search extends Component {
  state = {
    movieTitle: "",
    header: ""
  };
  search = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `${baseUrl}search/multi?api_key=${
          process.env.REACT_APP_MS_KEY
        }&language=en-US&query=${
          this.state.movieTitle
        }&page=1&include_adult=false`
      )
      .then(res => {
        dispatch({ type: "SEARCH_MOVIE", payload: res.data.results });
        this.setState({ movieTitle: "" });
        // this.setState();
      })
      .catch(err => console.error(err.response));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="centered">
              {" "}
              <form
                className={styles.search_box}
                onSubmit={this.search.bind(this, dispatch)}
              >
                <input
                  className={styles.search_text}
                  type="text"
                  placeholder="search for movie... actor..."
                  name="movieTitle"
                  value={this.state.movieTitle}
                  onChange={this.onChange}
                />
                <a
                  alt="search"
                  type="submit"
                  href="/"
                  className={styles.search_btn}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </a>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
