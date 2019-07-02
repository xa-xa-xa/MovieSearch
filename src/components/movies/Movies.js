import React, { Component } from "react";
import { Consumer } from "../../context";
import Movie from "../movies/Movie";
import Spinner from "../layout/Spinner";

export default class Movies extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { movie_list } = value;
          if (movie_list === undefined || movie_list.length === 0) {
            console.log("no data yet!");
            return <Spinner />;
          } else {
            return (
              <React.Fragment> 
                <div className="main-area">
                  <h3 className="centered">Popular now</h3>
                  <div id="movie" className="cards">
                  {movie_list.map(item => (
                    <Movie key={item.id} movie={item} />
                  ))}
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}