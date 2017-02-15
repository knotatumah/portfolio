'use strict';

import React from 'react';

export default class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            // Enables or disables collapsable menu
            isMobile: false,

            // menuIsActive or menuIsInactive
            menuStatus: "menuIsInactive",

            //These will be '' or 'selected', relative to needed class
            IndexView: '',
            BioView: '',
            DeveloperView: '',
            PortfolioView: '',
            ArtworkView: '',
        }

        // The active (selected) button id
        this.activeId = '';
    }
    render()
    {

        let nav;
        let mobileNav;
        let homeLink;

        //Is non-mobile?
        if (!this.state.isMobile)
        {
            nav = (
                <div id="nav">
                    <ul className="navUl">
                        <li className={"nonMobile " + this.state.BioView}><a href="#/bio">Bio</a></li>
                        <li className={"nonMobile " + this.state.DeveloperView}><a href="#/developer">Developer</a></li>
                        <li className={"nonMobile " + this.state.PortfolioView}><a href="#/portfolio">Portfolio</a></li>
                        <li className={"nonMobile " + this.state.ArtworkView}><a href="#/artwork">Artwork</a></li>
                    </ul>
                </div>
            );

            homeLink = <a href="#/" className='zwodrei'>Zach Stark</a>;
        }
        //Is mobile?
        else
        {
            const toggleMenu = this.toggleMenu.bind(this);

            //The presented page title as normal, without links, plus addional index message
            nav = (
                <div id="nav">
                    <ul className="navUl">
                        <li className={"mobile " + this.state.IndexView} onClick={toggleMenu}>Click Here to Explore!</li>
                        <li className={"mobile " + this.state.BioView} onClick={toggleMenu}>Bio</li>
                        <li className={"mobile " + this.state.DeveloperView} onClick={toggleMenu}>Developer</li>
                        <li className={"mobile " + this.state.PortfolioView} onClick={toggleMenu}>Portfolio</li>
                        <li className={"mobile " + this.state.ArtworkView} onClick={toggleMenu}>Artwork</li>
                    </ul>
                    <button id="mobileMenuButton" onClick={toggleMenu}/>
                </div>
            );

            //The functional list of links
            mobileNav = (
                <div id="mobileMenu" className={this.state.menuStatus}>
                    <ul className="navUl">
                        <li className={this.state.IndexView}><a href="#/"  onClick={toggleMenu}>Home</a></li>
                        <li className={this.state.BioView}><a href="#/bio"  onClick={toggleMenu}>Bio</a></li>
                        <li className={this.state.DeveloperView}><a href="#/developer"  onClick={toggleMenu}>Developer</a></li>
                        <li className={this.state.PortfolioView}><a href="#/portfolio"  onClick={toggleMenu}>Portfolio</a></li>
                        <li className={this.state.ArtworkView}><a href="#/artwork"  onClick={toggleMenu}>Artwork</a></li>
                    </ul>
                </div>
            );

            homeLink = <a href="#/" className='zwodrei' onClick={this.closeMenu.bind(this)}>Zach Stark</a>;
        }

        return(
            <div>
                <div id="header">
                    <div id="logo">
                        {homeLink}
                    </div>
                    <div id="email">
                        <img src="./images/email.png"/>
                    </div>
                    {nav}
                </div>
                {mobileNav}
            </div>
        );
    }

    componentDidMount()
    {
        this.toggleMobile();
        window.addEventListener("resize", this.toggleMobile.bind(this));
        this.animate(this.props.page);
    }
    componentWillUnmount()
    {
        window.removeEventListener("resize", this.toggleMobile.bind(this));
    }

    componentWillReceiveProps(newProps)
    {
        this.animate(newProps.page);
    }

    animate(newPage)
    {
        let newState = {};

        newState[this.activeId] = '';
        newState[newPage] = 'selected';

        this.activeId = newPage;

        this.setState(newState);
    }

    closeMenu()
    {
        if (this.state.menuStatus === "menuIsActive")
        {
            this.setState({menuStatus: "menuIsInactive"});
        }
    }

    toggleMenu()
    {
        if (this.state.menuStatus === "menuIsActive")
        {
            this.setState({menuStatus: "menuIsInactive"});
        }
        else
        {
            this.setState({menuStatus: "menuIsActive"});
        }
    }

    toggleMobile()
    {

        if (window.innerWidth > 768)
        {
            if (this.state.isMobile)
            {
                this.setState({isMobile:false});
            }
        }
        else if (window.innerWidth <= 768)
        {
            if (!this.state.isMobile)
            {
                this.setState({isMobile:true});
            }
        }
    }
}