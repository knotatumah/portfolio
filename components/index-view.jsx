'use strict';

import React from 'react';

export default class IndexView extends React.Component
{
    render()
    {
        return(

            <div id="hero">
                <h1 className="heroHeader">Developer and Artist</h1>
                <img className="heroImg" src="./images/artwork/road.png"/>
            </div>
        );
    }
}