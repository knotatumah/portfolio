'use strict'

import React from 'react';

export default class DeveloperView extends React.Component
{
    render()
    {
        return (
            <div className="content">
                <h1>As a Developer</h1>
                <div className="waterfall">
                    <span className="water">HTML5</span>
                    <span className="water">CSS3</span>
                    <span className="water">Bootstrap</span>
                    <span className="water">JavaScript</span>
                    <span className="water">CentOS / RedHat</span>
                    <span className="water">Git</span>
                    <span className="water">React</span>
                    <span className="water">Angular 1</span>
                    <span className="water">NodeJS</span>
                    <span className="water">Express</span>
                    <span className="water">MongoDB</span>
                    <span className="water">Mongoose</span>
                    <span className="water">Promises</span>
                    <span className="water">NPM</span>
                    <span className="water">Webpack</span>
                    <span className="water">ES6</span>
                    <span className="water">jQuery</span>
                    <span className="water">PHP</span>
                    <span className="water">MySQL</span>
                    <span className="water">Linux</span>
                    <span className="water">RESTful API</span>
                    <span className="water">Sublime Text</span>
                    <span className="water">Photoshop</span>
                </div>
                <h2 className="sectionHeader">Getting Started</h2>
                <p>I started in 2012 after graduating from Viterbo University with a BBA in Computer Information Systems, doing small projects and a little contractual work. Later I formed a small business with a partner to take on local area projects. Intellicraft Innovations Inc launched in 2015 and provided a few projects and a lot of experience in both web development and starting & running a business. The business has run its course and is a proud accomplishment, so today I am actively seeking to start a career in frontend development or a similar field.</p>
                <h2 className="sectionHeader">Frontend</h2>
                <p>I fluently work with HTML, CSS, and JavaScript. I readily work with responsive and adaptive designs, utilizing resources like Bootstrap when beneficial. I am particularly interested in user interactions and feedback, often trying different visual combinations and animations to help the user or make their experience more enjoyable.</p>
                <p>I work with JavaScript regularly and am familiar with libraries like jQuery and frameworks like React and Angular 1. AJAX and promises are typically used, having built a RESTful APIs as well. With React I have used React-Router for views and have used the ES6 syntax.</p>
                <h2 className="sectionHeader">Backend</h2>
                <p>I work daily in the Linux environment (CentOS/Redhat) and experience includes Apache, PHP, virtual hosts, git (with hooks), and some experience in bash scripting. I have also worked extensively with MySQL & Server as well. For RESTful API calls with PHP I used the Slim framework to handle routing.</p>
                <p>For modern JavaScript implementations I have experience with NodeJS and npm for package control as well as MongoDB for a NoSQL database. I use webpack with babel to package and transpile, usually JSX (React) and ES6. For a RESTful API I have used Express for routing, Mongoose for object mapping, and promises to handle callbacks.</p>
                <h2 className="sectionHeader">Development Environment</h2>
                <p>I usually work with Sublime Text as my editor of choice. I use a remote VPS as my test server and manage it through SSH with PuTTY. I use git for version control and FTP files for fast prototyping, using either a command-line agent like PSFTP or a GUI like WinSCP.</p>
            </div>
        );
    }
}