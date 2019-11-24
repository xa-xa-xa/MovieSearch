import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar/Navbar';
import Index from './components/layout/Index/Index';
import Details from './components/movies/Details';
import Search from './components/movies/Search';

import { Provider } from './context';

import './App.scss';

function App() {
  return (
    <Provider>
      <Router>
        <Fragment>
          <Navbar />
          <Search />
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route
                exact
                path='/overview/:mediaType/:id'
                component={Details}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
