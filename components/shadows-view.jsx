'use strict';

import React from 'react';

export default class ShadowsView extends React.Component
{
    render()
    {
        return(
            <div className="content">
                <h1>Shadows | Canvas Experiment</h1>
                <p>This was a fun experiment I took on after being inspired by those tinkering with gaming in Canvas. With no previous experience in gaming myself it was a real trip to learn how to produce a seamless interactive experience and to create something as dynamic as a shadow.</p>
                <p>This was going to be a test of my skills, just to see what I knew at the time. Since gaming and game design is a popular subject I constrained myself to a simple rule: no tutorials. It wouldn't be much fun or of any challenge if the concepts and code needed were placed before me.</p>
                <p>My ultimate goal was a finite shadow which its length could be adjusted (light intensity.) This was more complex than a simple to-the-edge calculation, which you could just cast rays (lines) of light and sort / order things by radians and draw the shadow. Since each of my shapes needed their own set of calculations I had to find a different and far more complex solution.</p>
                <p>In the end my shadows all reach the edge as a time constraint ended my progress; however, what I learned through this project was immeasurable and something I wish to improve upon in the future. As I look back at my work I see all kinds of improvements I can make and its almost just as exciting to make this better and improve as it was when I first made it.</p>
                <form id="debugForm" name="debugForm">
                    <label className="option">Shape: 
                        <select id="shapeSelect">
                            <option value="2">Flats</option>
                            <option value="5">Star</option>
                        </select>
                    </label>
                    <label className="option">Draw As Outline: <input id="shadowOutlineForm" type="checkbox" name="shadowType" onClick={this.setOutlineMode}/></label>
                </form>
                <canvas id="shadowCanvas" className="inlineBlock"></canvas>
            </div>
        );
    }

    componentDidMount()
    {
        shadowDraw.enable();
    }

    componentWillUnmount()
    {
        shadowDraw.disable();
    }

    setOutlineMode(event)
    {
        shadowDraw.updateDebug(event.target.checked);
    }
}