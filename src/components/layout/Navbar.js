import React from "react";

export default function Navbar() {
  const navStyles = {
    display: "flex",
    position: "fixed",
    width: "100%"
  };

  return (
    <nav style={navStyles}>
      <div className="masthead clear">
        <div className="">
          <div className="site-branding">
            <h2 className="site-title">Awesome Movie Search</h2>
            <p>Fast search for any movie, tv show, or etc</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
