'use strict';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from './Components/error404';
import Index from './components/layout';
import Details from './components/movies';
export const routes = props => (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route exact path='/details/:type/:id' component={Details} />

    <Route component={Error404} />
  </Switch>
);
