import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

import styled from "styled-components";

const s = styled;
const language = "en-US";

export default class Details extends Component {
  state = {
    details: {},
    cast: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=${process.env.REACT_APP_MS_KEY}&language=${language}`
      )
      .then(res => {
        this.setState({ details: res.data });
        return axios.get(
          `https://api.themoviedb.org/3/movie/${
            this.props.match.params.id
          }/credits?api_key=${process.env.REACT_APP_MS_KEY}`
        );
      })
      .then(res => {
        this.setState({ cast: res.data.cast });
      })
      .catch(err => console.err(err));
  }

  render() {
    const { details, cast } = this.state;
    const backgroundStyle = {
      backgroundImage:
        "url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
        details.backdrop_path +
        ")"
    };

    if (
      details === undefined ||
      Object.keys(details).length === 0 ||
      cast === undefined ||
      Object.keys(cast).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Backdrop style={backgroundStyle} />
          <DetailsCard>
            <Content>
              <DetailsSection>
                <Title>{details.original_title}</Title>
                <h6 className="release-date">
                  release date : {details.release_date}
                </h6>
                <p className="card-text">{details.overview}</p>
                <Ul>
                  <Li>
                    Cast:
                    <Cast>
                      {cast
                        .filter(i => i.order < 8)
                        .map(i => (
                          <Profile key={i.id}>
                            <Portrait
                              src={`https://image.tmdb.org/t/p/w300/${
                                i.profile_path
                              }`}
                            />
                            <Name>{i.name}</Name>
                          </Profile>
                        ))}
                    </Cast>
                  </Li>
                  <Li>IMDB-ID: {details.imdb_id}</Li>
                  <Li>
                    <div>Original language: {details.original_language}</div>
                  </Li>
                  <Li />
                  <Li>
                    <div>
                      Company:{" "}
                      {details.production_companies.map(i =>
                        i.logo_path === null ? (
                          <span key={i.id}>{i.name}</span>
                        ) : (
                          <CompanyLogo
                            key={i.id}
                            src={`https://image.tmdb.org/t/p/w300/${
                              i.logo_path
                            }`}
                            alt={i.name}
                          />
                        )
                      )}
                    </div>
                  </Li>
                </Ul>
                <Link to={`/`} className="back">
                  Go back
                </Link>
              </DetailsSection>
              <ImageSection>
                <Poster
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                    details.poster_path
                  }`}
                  alt="poster"
                />
              </ImageSection>
            </Content>
          </DetailsCard>
        </React.Fragment>
      );
    }
  }
}
const Cast = s.div`
  // border: 1px solid lime;
  display: flex;
  flex-direction: row;
  width: 98%;
`;
const Profile = s.div`
  display: flex;
  flex-direction: column
  align-items: center;
`;

const Portrait = s.img`
// border-radius: 2%;
  display: inline;
  width: 90%;
`;
const Name = s.a`
  position: relative;
  font-size: .75em
  text-align: center
  color: white;
  top: -25%;
  :hover {
    top: 0;
  }
`;

const Ul = s.ul`
  list-style-type: none;
  padding-inline-start: 0;

`;
const Li = s.li`
  padding-bottom: .5em;
`;
const Poster = s.img`

`;

const DetailsSection = s.ul`
  // border: 2px soLid blue;
  width: 60%;
    
`;
const ImageSection = s.section`
  // border: 2px soLid green;
  padding-top: .5em;
  width: 35%;
  max-height: 90%;
`;
const Title = s.h2`
  // border: 2px soLid orange;
  font-size: 2em
  width: 100%;
  height: 100px;
`;

const Content = s.div`
  // border: 2px soLid red;
  display: flex;
  flex-direction: row;
`;

const CompanyLogo = s.img`
  height: 1.5em;
  width: auto;
  display: inLine-block;
  margin: -0.5em .5em;
`;

const DetailsCard = s.section`
  // border: 2px dotted green;
  display: flex;
  z-index: 1;
;
  margin: auto;
`;

const Backdrop = s.div`
    opacity: 0.15;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    // top: 0;
    // left: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    &:after {
        content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: black;
            opacity: 0.5;
      }
`;
