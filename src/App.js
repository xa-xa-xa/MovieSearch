import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import DetailsPage from './components/movies/DetailsPage';
import Search from './components/movies/Search';

import { Provider } from './context';

import './App.scss';

function App() {
  return (
    <Provider>
      <Router>
        <>
          <Navbar />
          <Search />
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route
                exact
                path='/overview/:mediaType/:id'
                component={DetailsPage}
              />
            </Switch>
          </div>
        </>
      </Router>
    </Provider>
  );
}

export default App;
