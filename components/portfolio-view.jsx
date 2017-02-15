'use strict';

import React from 'react';

export default class PortfolioView extends React.Component
{
    render()
    {
        return (
            <div className="content">
                <h1>Portoflio | Selected Works</h1>
                <h2 className="portfolioHeader">Live Demos</h2>
                <div className="portfolioEntry">
                    <a href="/rocketblog" target="_blank" className="portfolioLink">Rocket Blog</a>
                    <p className="portfolioDesc">A blog concept built with React and MongoDB</p>
                </div>
                <div className="portfolioEntry">
                    <a href="/lfg/app" target="_blank" className="portfolioLink">Looking for Group</a>
                    <p className="portfolioDesc">A community concept using Angular 1</p>
                </div>
                <div className="portfolioEntry">
                    <a href="#/portfolio/shadows" className="portfolioLink">Shadows</a>
                    <p className="portfolioDesc">An interactive light & shadows concept using canvas</p>
                </div>
                <div className="portfolioEntry">
                    <a href="#/portfolio/headlines" className="portfolioLink">Headlines</a>
                    <p className="portfolioDesc">Groups of text are analyzed and grouped by relevance</p>
                </div>
                <h2 className="portfolioHeader">Client Work</h2>
                <div className="portfolioEntry">
                    <a href="http://johanajimenez.com/" target="_blank" className="portfolioLink">Johana Jimenez</a>
                    <p className="portfolioDesc">A web designer's portfolio, requested to have a template for client expansion as necessary</p>
                </div>
                <div className="portfolioEntry">
                    <a href="https://tricklingwaters.com/" target="_blank" className="portfolioLink">Trickling Waters Retreat</a>
                    <p className="portfolioDesc">This client required a strong focus on visual demonstration on lodgings and area attractions.</p>
                </div>
                <div className="portfolioEntry">
                    <a href="http://wheeloftodd.org/" target="_blank" className="portfolioLink">Wheel of Todd</a>
                    <p className="portfolioDesc">A local non-profit that desired a simple to maintain site, built using Wordpress as a result</p>
                </div>
                <div className="portfolioEntry">
                    <a href="https://www.sharplinetile.com/" target="_blank" className="portfolioLink">Sharpline Tile</a>
                    <p className="portfolioDesc">For an experienced craftsman desiring an online portfolio</p>
                </div>
            </div>
        );
    }
}