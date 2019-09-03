import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from './Components/error404';
import Index from './components/layout';
import DetailsPage from './components/movies';
export const routes = props => (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route exact path='/details/:type/:id' component={DetailsPage} />
    <Route component={Error404} />
  </Switch>
);
