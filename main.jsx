'use strict';

// Core components
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect } from 'react-router';

// Main application
import App from './components/app.jsx';

// Views
import IndexView from './components/index-view.jsx';
import BioView from './components/bio-view.jsx';
import DeveloperView from './components/developer-view.jsx';
import PortfolioView from './components/portfolio-view.jsx';
import ArtworkView from './components/artwork-view.jsx';
import ShadowsView from './components/shadows-view.jsx';
import HeadlinesView from './components/headlines-view.jsx';

ReactDOM.render(
(
    <Router history={ hashHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ IndexView }/>
            <Route path="/bio" component={ BioView }/>
            <Route path="/developer" component={ DeveloperView }/>
            <Route path="/portfolio" component={ PortfolioView }/>
            <Route path="/artwork" component={ ArtworkView }/>

            {/*NEEDS TO BE CHILD OF PORTFOLIO*/}
            <Route path="/portfolio/shadows" component={ ShadowsView }/>
            <Route path="/portfolio/headlines" component={ HeadlinesView }/>
        </Route>
    </Router>
), document.getElementById("main"));