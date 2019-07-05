import React from "react";
import Movies from "../movies/Movies";
import Search from "../movies/Search";

export default function Index() {
  return (
    <React.Fragment style="top: 50px">
      <Search />
      <Movies />
    </React.Fragment>
  );
}
