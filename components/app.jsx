'use strict';

import React from 'react';
import Header from './header.jsx';

export default class App extends React.Component
{
    render()
    {
        return(
            <div>
                <Header page={this.props.routes[1].component.name}/>
                {this.props.children}
                <div id='footer' className='row'>
                    <div id='footerDetails'>
                        <span>Zach Stark 2017</span>
                    </div>
                </div>
            </div>
        );
    }
}