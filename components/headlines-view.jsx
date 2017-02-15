'use strict';

import "babel-polyfill"; // For Axios & IE

import React from 'react';
import Axios from 'axios';

export default class HeadlinesView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.defaultText = 'Assassin\'s Creed Unity Uses "Every Ounce Of Power" From Xbox One And PS4\nBatman: Arkham Knight Aiming for Graphics Parity Across Xbox One and PS4\nBorderlands: The Pre-Sequel Review Discussion\nDay-One Destiny Reviews Might Not Tell Whole Story, Bungie Says\nDefense Grid 2 Review\nDestiny Review In Progress Discussion - Day 0\nDriveclub - Video Review\nEarth 2 - World\'s End #3 Preview\nEndless Legend Review\nFenix Rage Review\nForza Horizon 2 DLC Is Xbox One-Only; No Plans for Xbox 360 DLC\nGTA 5 Digital PS4 Preorders Come With $300,000 Currency Bonus\nGTA 5 Patch Fixes PS4 and Xbox One Transfer Problems\nInjustice: Gods Among Us - Year Three #1 Review\nMicrosoft set to replace noisy Xbox One consoles\nMultiplayer Arena PS4 Gameplay Footage\nNBA 2K15 Review Roundup\nNon-Fantasy Xbox One/PS4/PC RPG Kingdom Come Gets New Trailer\nPS4 Fighting Games to Get PS3 Arcade Stick Support Soon\nPS4 Getting No-Combat MMO, Wander\nPS4 Is the Best-Selling Console 8 Months in a Row - IGN News\nPS4 Vs. Xbox One\'s Resolution & Price Cut - IGN Daily Fix\nPS4, Xbox One Turned Into Portable Laptops\nRocksmith 2014 May Be Coming to Xbox One, PS4\nSleeping Dogs: Definitive Edition Review\nStyx: Master of Shadows Review\nSuper Smash Bros. For Wii U Review In Progress\nWasteland 2 Review\nWatch the GTA 5 Xbox One/PS4 Launch Trailer\nXbox One, PS4 Getting New Tony Hawk Pro Skater Game In 2015';
    }
    render()
    {
        return(
        <div className="content">
            <h1>Headlines | Semantic Analysis</h1>
            <p>This was an interesting project started to see if I could group together headlines from some of my favorite RSS feeds of the time. The premise was simple: group headlines together with a similar context such as reviews, videos, or a particular game title. This "simple" premise turned out to be a large and complex project that presented serious challenges.</p>
            <p>The project mostly consists of semantic analysis, a way of breaking down the headlines into their word components and then using statistics to attempt to group them. Words and word groups were compared with greater weights given to multi-word associations. The challenges associated with this process included finding a meaningful statistic, how to appropraitely weight & apply this statistic, and how to get this statistic in an efficient way. Largely this meant finding ways to iterate over my data that was fast and not memory heavy considering each headline may compose of 10 or more words and each word will be separated, compared to other words, grouped with words, and comapred again. Although my program is very simple in terms of semantic analysis it does do its job and does it well.</p>
            <p>This demo has 30 headlines ready to go but feel free to add, remove, or completely change them to see the system work.</p>
            <div id="headlineContent">
                <textarea id="sampleHeadlines" rows="15" wrap="soft" defaultValue={ this.defaultText }></textarea>
                <div>
                    <input type="button" value="analyize" onClick={ this.getTitles.bind(this) }/>
                </div>
            </div>
            <div id="resultsArea"></div>
        </div>
            );
    }

    componentDidMount()
    {
        this.getTitles();
    }

    getTitles()
    {
        let titles  = [];
        const _this = this;

        document.getElementById("sampleHeadlines").value.split("\n").map((title, index) =>
        {
            if (title !== '' && title.length <= 175)
            {
                titles.push(title);
            }
        });

        const container = JSON.stringify(titles);

        Axios.post('./headlines/patterns.class.php', container)
        .then(function(results)
        {
            _this.printProducts(results);
        })
        .catch(function(err)
        {
            document.getElementById("resultsArea").innerHTML = (
                "<h3>Something Broke! Try again or contact Zach.</h3>"
            );
        });
    }

    printProducts(results)
    {

        const stack = document.getElementById("resultsArea");
        const listings = results.data[0][2];
        const dataListings = results.data[0][0];
        const dataOrder = results.data[0][1];
        const container = document.createElement("div");

        let category;
        let categoryListings;
        let listing;

        stack.innerHTML = '';

        dataOrder.map((title, index) =>
        {

            category = document.createElement("h3");
            category.innerHTML = title;
            categoryListings = document.createElement("div");

            dataListings[title].map((listingId, index) =>
            {
                listing = document.createElement("p");
                listing.innerHTML = listings[listingId]["link_title"];
                categoryListings.appendChild(listing);
            });

            container.appendChild(category);
            container.appendChild(categoryListings);
        });

        stack.appendChild(container);
    }
}