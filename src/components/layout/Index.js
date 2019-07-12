import React from "react";
import Movies from "../movies/Movies";
import Search from "../movies/Search";

export default function Index() {
  return (
    <React.Fragment>
      <Search />
      <Movies />
    </React.Fragment>
  );
}
