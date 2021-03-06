import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Events from './Events';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import RemoveEvent from './RemoveEvent';
import Feedback from './Feedback';
import FAQ from './FAQ';
import LogIn from './Login';
import FirstLogin from './FirstLogin';
import PrivacyPolicy from './Policy/PrivacyPolicy';
import TermsOfService from './Policy/TermsOfService';
import Profile from './Profile';
import LogOut from './Logout';
import NotFound from './NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Events} path="/events/" exact />
    <Route component={CreateEvent} path="/events/create" exact />
    <Route component={EditEvent} path="/events/edit/:id" exact />
    <Route component={RemoveEvent} path="/events/delete/:id" exact />
    <Route component={Feedback} path="/feedback/" exact />
    <Route component={FAQ} path="/faq/" exact />
    <Route component={LogIn} path="/login/" exact />
    <Route component={FirstLogin} path="/first-login/" exact />
    <Route component={LogOut} path="/logout/" exact />
    <Route component={Profile} path="/profile/" exact />
    <Route component={PrivacyPolicy} path="/privacy-policy" exact />
    <Route component={TermsOfService} path="/terms-of-service" exact />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
