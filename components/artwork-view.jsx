'use strict';

import "babel-polyfill"; // For Axios & IE

import React from 'react';
import Axios from 'axios';
import ArtThumb from './artThumb.jsx';

export default class ArtworkView extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            fullImage: "",
            windowHeight: window.innerHeight,
            shadowbox:"off",
        };

        this.shadowboxClasses =
        {
            on: "shadowboxOn",
            off: "shadowboxOff",
        }
    }
    render()
    {
        let paintings;
        let prints;
        let sketches;
        let fullImage;

        if (this.state.catalog)
        {
            paintings = (
                this.state.catalog.paintings.map((painting, index) =>
                {
                    return <ArtThumb piece={painting} key={index} setImage={this.setImage} parent={this}/>;
                })
            );

            prints = (
                this.state.catalog.prints.map((print, index) =>
                {
                    return <ArtThumb piece={print} key={index} setImage={this.setImage} parent={this}/>;
                })
            );

            sketches = (
                this.state.catalog.sketches.map((sketch, index) =>
                {
                    return <ArtThumb piece={sketch} key={index} setImage={this.setImage} parent={this}/>;
                })
            );
        }

        if (this.state.fullImage)
        {   const height = {height: this.state.windowHeight + "px"};
            fullImage = (
                <div className={"shadowbox " + this.shadowboxClasses[this.state.shadowbox]} style={height} onClick={this.setShadowbox.bind(this)}>
                    <div id="shadowContainer" style={height}>
                        <img id="galleryImage" className="fullImage" src={"./images/artwork/gallery/" + this.state.fullImage}/>
                    </div>
                    <div id="ajaxLoader"></div>
                </div>
            );
        }

        return (
            <div>
               {fullImage}
                <div className="container-fluid">
                    <h1>Artwork</h1>
                    <h2 className="portfolioHeader">Paintings</h2>
                    <div className="row galleryRow">
                        {paintings}
                    </div>
                    <h2 className="portfolioHeader">Prints</h2>
                    <div className="row galleryRow">
                        {prints}
                    </div>
                    <h2 className="portfolioHeader">Sketches</h2>
                    <div className="row galleryRow">
                        {sketches}
                    </div>
                </div>
            </div>
        );
    }

    componentWillMount()
    {
        const _this = this;

        Axios.get("./images/artwork/catalog.json")
        .then(function(catalog)
        {
            _this.setState({"catalog":catalog.data});
        });
    }

    componentDidMount()
    {
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions()
    {
        this.setState({windowHeight:window.innerHeight});
    }

    setImage(file)
    {
        if (file)
        {
            this.setState({fullImage:file});
        }
        else
        {
            this.setState({fullImage:""});
        }

        this.setShadowbox();
    }

    setShadowbox()
    {
        let newState = {};

        if (this.state.shadowbox === "off")
        {
            newState["shadowbox"] = "on";
        }
        else
        {
            newState["shadowbox"] = "off";
            newState["fullImage"] = "";
        }

        this.setState(newState);
    }
}