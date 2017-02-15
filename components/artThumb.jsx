'use strict';

import React from 'react';

export default class ArtThumb extends React.Component
{
    render()
    {
        return(
            <div className="col-sm-3 galleryThumb">
                <img src={"./images/artwork/thumbs/" + this.props.piece.thumb} onClick={this.props.setImage.bind(this.props.parent, this.props.piece.full)}/>
                <span className="galleryTitle">{this.props.piece.title}</span>
                <span className="galleryMedium">{this.props.piece.medium}</span>
            </div>
        );
    }
}