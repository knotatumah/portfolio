<?php

/*
    ABANDON ALL HOPE YE WHO ENTER HERE

    This code is unmaintained, full of bad practices,
    and a direct product of a time before version control.
    Its a god-class with about every bad practice you can
    find and still exists as its still a cool product and
    the fact that I do not have the courage to re-code
    something as complicated as this ("complicated" as in
    "figuring out what I was thinking that day.")

    If you're brave enough to take a look I commend you but
    please keep in mind that its very old code and in no way
    represents any of my current coding practices.

*/

if ($_SERVER['REQUEST_METHOD'] !== "POST")
{
   echo("failure");
   phpErrorHandler("Wrong request method.");
   exit;
}

if (!($post = file_get_contents("php://input"))) {
    echo "failure";
    phpErrorHandler("No input received");
    exit();
}

if(!($post = json_decode($post))){
    echo "failure";
    phpErrorHandler("Could not decode JSON");
    exit();
}

$post = (array)$post;

$listings = array();

foreach ($post as $title)
{
    array_push($listings, array("link_title" => $title));
}

$findPatterns = new findPatterns();

$findPatterns->initialize($listings);

class findPatterns 
{

    function initialize($listings)
    {
        //Add partial support for some non-native HTML characters
        // header('Content-Type: text/html; charset=ISO-8859-1');
// echo "<html><head><style>tr:hover { background-color:#bbb;}</style></head><body>";
        //Globals and constants created & defined here.
        date_default_timezone_set ("GMT");

        //240 = 4 minutes. Test data at 5000 links is usually about 60 to 120 seconds.
        set_time_limit (240);

        // if (!(empty($_POST)))
        // {
        //     $this->range = array($_POST['start'],$_POST['end']);
        // }

        //testSettings is an array that holds groups of settings.
        $this->results = array();
        $this->testSettings = 
            array(
                // array(
                //     "range" => array(1416801622,1416888022),
                //     "type" => "individual",
                //     "blockSize" => 1,
                //     "gap" => 1,
                //     "multiPass" => false,
                // ),
                // array(
                //     "range" => array(1416888022,1416974422),
                //     "type" => "individual",
                //     "blockSize" => 1,
                //     "gap" => 1,
                //     "multiPass" => false,
                // ),
                // array(
                //     "range" => array(1416801622,1417406422),
                //     "type" => "individual",
                //     "blockSize" => 7,
                //     "gap" => 1,
                //     "multiPass" => false,
                // ),
                array(
                    "range" => array(1416801622,1419393622),
                    "type" => "individual",
                    "blockSize" => 30,
                    "gap" => 1,
                    "multiPass" => false,
                )
            );


        // $this->range = array(1421985622,1424577622);
        // // $this->threshold_A = 0;
        // // $this->threshold_B = 13977;

        // $this->dateSettings->type = "rolling";
        // $this->dateSettings->blockSize = 2;
        // $this->dateSettings->gap = 1;
        // $this->dateSettings->thresholds = array(0);

        //Sample time is used in testing to maintain consistent test results.
        // $this->sampleTime = 1412993929;

        // $this->wordList = array();

        $this->main($listings);


        // foreach ($this->splits[1] as $split)
        // {
        //     echo $split[0] - $this->splits[0].", ".$split[1]."</br>";
        // }
    }

    function main($listings)
    {
        $this->listings = $listings;

        $timer = microtime(true);

        $today = strtotime("today GMT") + 86400; //GMT midnight of today, plus 24 hours.

        $this->dbLogin();

        if (!(isset($_POST["requests"])))
        {
            $requests = $this->testSettings;
        }
        else
        {
            $requests = $_POST["requests"];
        }

        // foreach ($requests as $request)
        // {
            $this->wordList = $this->finalProduct = array();
            $this->dateSettings->thresholds = array(0);
            // $this->range = array($request["range"][0],$request["range"][1]);
            // $this->dateSettings->type = $request["type"];
            // $this->dateSettings->blockSize = $request["blockSize"];
            // $this->dateSettings->gap = $request["gap"];
            $this->isMultiPass = false;
            // $this->name = $request["name"];


            //Obtain listings for the given time range.
            // $this->getListings();


            // if(!($post = json_decode($post))){
            //     echo "failure";
            //     phpErrorHandler("Could not decode JSON");
            //     exit();
            // }

            // $this->listings = (array)$post;

            // $this->listings = array(
            // array("link_title" => "Dragon Age: Inquisition Review Discussion"),
            // array("link_title" => "Gotham Academy: Who is the Mysterious New Heroine?"),
            // array("link_title" => "IGN UK Podcast #250: It's a Monster!"),
            // array("link_title" => "Be Even More Terrified in Alien: Isolation As Modders Unlock Virtual Reality Support"),
            // array("link_title" => "Batman, Mortal Kombat, and Dark Souls Discounted in Xbox One/360 Weekly Deals"),
            // array("link_title" => "Forza Horizon 2 DLC Is Xbox One-Only; No Plans for Xbox 360 DLC"),
            // array("link_title" => "$60 Battlefield 4 Premium Edition Coming to All Platforms Except Xbox 360"),
            // array("link_title" => "WWE 2K15's $25 Season Pass Confirms Three DLC Packs and Paige"),
            // array("link_title" => "Check Out New Resident Evil Remake Gameplay Footage and Screenshot Comparisons"),
            // array("link_title" => "New iPad Reveal Expected October 16, as Apple Confirms Event"),
            // array("link_title" => "Here's What Samus Looks Like in Monster Hunter 4 Ultimate"),
            // array("link_title" => "Tomb Raider Sequel News Teased for Later Today [UPDATE]"),
            // array("link_title" => "Video Game Plotline for Tonight's Episode of NBC's The Mysteries of Laura"),
            // array("link_title" => "EA Giving Away Dragon Age: Origins for Free on PC"),
            // array("link_title" => "NBA 2K15 Review Roundup"),
            // array("link_title" => "Non-Fantasy Xbox One/PS4/PC RPG Kingdom Come Gets New Trailer"),
            // array("link_title" => "Alien: Isolation Players Reporting DLC Issues"),
            // array("link_title" => "Minecraft Movie Is Large-Budget, Might Not Arrive Until 2018"),
            // array("link_title" => "Become Batman With This Oculus Rift App"),
            // array("link_title" => "GTA 5 Digital PS4 Preorders Come With $300,000 Currency Bonus"),
            // array("link_title" => "Massive Video Game Collection Hits eBay With Asking Price of $164,000"),
            // array("link_title" => "Former BioShock and Halo Designers Working on PC Survival Game With Permadeath"),
            // array("link_title" => "Destiny's Next Loot Cave Is a Heavenly Stairway"),
            // array("link_title" => "Star Citizen Hits $56 Million In Funding"),
            // array("link_title" => "Wii U GameCube Adapter Only Compatible With Super Smash Bros"),
            // array("link_title" => "Gallery: A Closer Look at Nintendo's Next Amiibo Range"),
            // array("link_title" => "Borderlands: The Pre-Sequel - Crazy High-Level ClapTrap Build"),
            // array("link_title" => "Borderlands: The Pre-Sequel - SHiFT Codes"),
            // array("link_title" => "Borderlands in 5 Minutes"),
            // array("link_title" => "Destiny: The Mythoclast Got Nerfed! - IGN Plays"),
            // array("link_title" => "Borderlands: The Pre-Sequel Review Discussion"),
            // array("link_title" => "Rainbox Six Siege is Changing the Focus of the FPS - IGN News"),
            // array("link_title" => "Styx: Master of Shadows Review"),
            // array("link_title" => "Fry Cry 4 Length & Pokemon Details - IGN Daily Fix"),
            // array("link_title" => "Rewind Theater - Killer Instinct Season 2 Launch Trailer"),
            // array("link_title" => "Podcast Beyond: Driveclub Can't Catch a Break"),
            // array("link_title" => "Defense Grid 2 Review"),
            // array("link_title" => "Destiny's Former Loot Cave Now Haunted - IGN News"),
            // array("link_title" => "World of WarCraft: The Iron Tide Arrives"),
            // array("link_title" => "Is Project Spark the Minecraft For the Next Generation?"),
            // array("link_title" => "Introducing Zodiac, a New JRPG for PS Vita"),
            // array("link_title" => "Google's Android Takes a Security Cue from Apple"),
            // array("link_title" => "NVIDIA's GTX 980 Video Card: What You Need to Know"),
            // array("link_title" => "Adam McKay & Seth Rogen Team Up"),
            // array("link_title" => "How I Became an Action Figure"),
            // array("link_title" => "Bravely Second Is One of 3DS’s Best-Looking Games"),
            // array("link_title" => "Super Mario Spikers - The Cancelled Volleyball/Wrestling Mashup"),
            // array("link_title" => "Scalebound May Let You Battle Monsters With Your Friends"),
            // array("link_title" => "FF Takes Assassin's Creed Release Date"),
            // array("link_title" => "Fast & Furious Director Talks Scorpion"),
            // array("link_title" => "The Deadpool Movie Officially Happening!"),
            // array("link_title" => "Monster Hunter 4 Ultimate on the New Nintendo 3DS Is a Revelation"),
            // array("link_title" => "Report: Sony to Introduce TV Streaming to PlayStation Later This Year"),
            // array("link_title" => "Pirates 4 Mermaid Cast in Guy Ritchie's King Arthur"),
            // array("link_title" => "Super Smash Bros. 3DS XL Unboxing"),
            // array("link_title" => "Keepin' It Reel, Episode 264"),
            // array("link_title" => "Gerard Way Combines Spider-Man with Pacific Rim"),
            // array("link_title" => "Tyrant Picked Up for Season 2"),
            // array("link_title" => "Final Fantasy XIII Trilogy to Release on PC"),
            // array("link_title" => "Stealth Inc. 2 is coming to Wii U on Oct. 23"),
            // array("link_title" => "Alien: Isolation PC specs released"),
            // array("link_title" => "Inside a heist mission in Assassin's Creed Unity"),
            // array("link_title" => "Microsoft set to replace noisy Xbox One consoles"),
            // array("link_title" => "Will Ferrell to stream games because he hates cancer"),
            // array("link_title" => "Let's do nothing in video games is not flattering to Luigi"),
            // array("link_title" => "Expect to see more re-imagined classics from Atari"),
            // array("link_title" => "Pokémon HeartGold's Johto region recreated in Minecraft"),
            // array("link_title" => "Spend 30 minutes with Evolve's Trapper, Assault and towering Goliath"),
            // array("link_title" => "New Nintendo 3DS XL designs celebrate NES, Super Smash Bros., Persona Q"),
            // array("link_title" => "Super Smash Bros. Not Getting Paid DLC"),
            // array("link_title" => "New Destiny Hoverbike Lets You Do Sweet Freestyle Tricks"),
            // array("link_title" => "Xbox One, PS4 Getting New Tony Hawk Pro Skater Game In 2015"),
            // array("link_title" => "Far Cry 4 Players Accidentally Reveal They Pirated the Game"),
            // array("link_title" => "Super Smash Bros. For Wii U Review In Progress"),
            // array("link_title" => "Titanfall Deluxe Edition Announced, Includes All DLC"),
            // array("link_title" => "WWE's Big Show Would Love To Be In Next Gears of War"),
            // array("link_title" => "Assassin's Creed Unity's Frame Rate Issues Not Related To Crowd Sizes"),
            // array("link_title" => "Listen To Epic, Acoustic Version Of Halo's Theme Music"),
            // array("link_title" => "PS4 Getting No-Combat MMO, Wander"),
            // array("link_title" => "People Scammed Walmart For Cheap PS4s"),
            // array("link_title" => "Xbox One Gets New Media Apps; HBO Go Not Among Them"),
            // array("link_title" => "Assassin's Creed Unity's No Face Bug Now Fixed, Ubisoft Says"),
            // array("link_title" => "Game of Thrones, Star Trek Dev Raises $3.2 Million"),
            // array("link_title" => "Here Are Far Cry 4's Known Issues"),
            // array("link_title" => "Free Destiny Trial Available Now"),
            // array("link_title" => "League of Legends Down For Maintenance"),
            // array("link_title" => "GTA 5 Patch Fixes PS4 and Xbox One Transfer Problems"),
            // array("link_title" => "Nintendo Showcases More New 3DS Faceplates"),
            // array("link_title" => "Lost's Mr. Eko Signs on to Role in Game of Thrones"),
            // array("link_title" => "Guardians, Apes' Big Box Office $$$"),
            // array("link_title" => "Scarlett Johansson is Up for Ghost in the Shell"),
            // array("link_title" => "Irish Postal Service Celebrates Video Game Characters"),
            // array("link_title" => "Keepin' It Reel, Episode 266"),
            // array("link_title" => "David Goyer Adapting Straub's Shadowland for NBC"),
            // array("link_title" => "Channing Tatum Talks Gambit"),
            // array("link_title" => "Game of Thrones' Oberyn in Talks to Star in Ben-Hur Remake"),
            // array("link_title" => "Warwick Davis Will Appear In Star Wars: Episode 7"),
            // array("link_title" => "Take a Closer Look At the Art of Dark Souls II"),
            // array("link_title" => "PS4, Xbox One Turned Into Portable Laptops"),
            // array("link_title" => "Earth 2 - World's End #3 Preview")
            // );

            $this->cleanTitles();
            $thresholdCount = count($this->dateSettings->thresholds);
            $this->passNumber = 0;

            if ($this->isMultiPass)
            {
                $this->finalProduct = array();
            }
            else
            {
                $this->finalProduct = array(array(),array());
            }

            // for ($i = 1; $i < $thresholdCount; $i++)
            // {

            //     if ($this->dateSettings->type === "individual")
            //     {
            //         $threshold_A = $this->dateSettings->thresholds[$i - 1];
            //         $threshold_B = $this->dateSettings->thresholds[$i];
            //         // echo "#".$threshold_A."|".$threshold_B."</br>";
            //     }
            //     else if ($this->dateSettings->type === "incremental")
            //     {
            //         $threshold_A = $this->dateSettings->thresholds[0];
            //         $threshold_B = $this->dateSettings->thresholds[$i];
            //     }
            //     else if ($this->dateSettings->type === "rolling")
            //     {
            //         $aKey = $this->dateSettings->gap * ($i - 1);
            //         $threshold_A = $this->dateSettings->thresholds[$aKey];
            //         if (!(isset($this->dateSettings->thresholds[$aKey + ($this->dateSettings->blockSize - 1)])))
            //         {
            //             break;
            //         }
            //         else
            //         {
            //             $threshold_B = $this->dateSettings->thresholds[$aKey + ($this->dateSettings->blockSize - 1)];
            //         }
                    
            //         // echo "# ".$threshold_A." | ".$threshold_B."</br>";
            //     }
            //     else
            //     {
            //         //Invalid type
            //     }

                //Prepare links & words for pattern finding.
                $threshold_A = 0;
                $threshold_B = count($this->listings);

                $this->compareTitles($threshold_A, $threshold_B);


                //Find the patterns.
                $this->findPattern($threshold_A, $threshold_B);
                $this->passNumber++;
            // }

            // $this->printProduct();
            // var_dump($this->finalProduct);
            $this->results[] = $this->finalProduct;
        // }

        $this->printJSON();

        // $this->printAndTallyPatterns();
// echo "</body></html>";
    }

    function dbLogin()
    {
        // require("/var/www/html/drames.com/etc/general_creds.php");

        // //Ensure the connection is reading/writing as utf8.
        // $this->db->set_charset('utf8'); 
    }

    function getListings()
    {


        if (isset($this->range))
        {
            $timeFrame = " WHERE link_date >= ".$this->range[0]." AND link_date <= ".$this->range[1];
        }
        else if (isset($this->sampleTime))
        {
            $timeFrame = " WHERE link_date <= ".$this->sampleTime;
        }
        else
        {
            $timeFrame = "";
        }

        $query = "SELECT link_title, link_shorttitle, link_date, link_clicks, link_url, link_origurl, link_author, link_source, link_sourceurl
                  FROM links".$timeFrame.
                  " ORDER BY link_date DESC";

        if (!($stmnt = $this->db->query($query)))
        {
            $this->mysqlErrorHandler('Prepare failed: (',(__LINE__ - 1));
        }


        while ($row = $stmnt->fetch_assoc())
        {
            $listings[] = $row;
        }

        $this->listings = $listings;

        $blacklist = json_decode(file_get_contents("../config/blacklist"));
        $tags = json_decode(file_get_contents("../config/tags"));

        $results = $this->processedTitles = $nameKeys = array();

        $last = count($listings) - 1;
        $currentThreshold = $this->listings[0]['link_date'];

        if ($this->dateSettings->type !== "rolling")
        {
            $measure = $this->dateSettings->blockSize * 86400;
        }
        else
        {
            $measure = $this->dateSettings->gap * 86400;
        }
}

    function cleanTitles() {
        $last = count($this->listings) - 1;
        $blacklist = json_decode(file_get_contents("./blacklist"));
        $tags = json_decode(file_get_contents("./tags"));
        //Replacing accented characters for title consistency.
        foreach ($this->listings as $primaryKey => $primaryFeed)
        {
            $title = $primaryFeed['link_title'];

            //Remove known tags - repetitive identification marks that skew results.
            foreach ($tags as $tagPattern)
            {
                $title = preg_replace($tagPattern,"", $title);
            }

            //Collapse commonly separated numbers (###,### or ###-####-####).
            //This keeps numbers intact during processing.
            $title = preg_replace("/(?<=[0-9])[-,](?=[0-9])/","", $title);

            //Remove common word glues (this/word, that-word, other_word.)
            //These abandon potential words & patterns otherwise.
            $title = preg_replace("/[-_\/,:|]/"," ",$title);

            //Explode the title into an array to process blacklisted words.
            $this->listings[$primaryKey]['control_title'] = preg_split('/\s+/', $title, -1, PREG_SPLIT_NO_EMPTY);

            $title = strtolower($this->accentsToNormal($title));

            $this->listings[$primaryKey]['normal_title'] = $primaryWords = preg_split('/\s+/', $title, -1, PREG_SPLIT_NO_EMPTY);
            foreach ($this->listings[$primaryKey]['normal_title'] as $key => $word)
            {
                $this->listings[$primaryKey]['normal_title'][$key] = $this->stripLeadingTrialingPunctuation($word);
            }

            foreach ($primaryWords as $key => $word)
            {

                // $word = strtolower($word);

                // $word = $this->accentsToNormal($word);

                if (in_array($word, $blacklist))
                {
                    unset($primaryWords[$key]);
                    continue;
                }

                //Remove all other characters & symbols.
                $word = preg_replace("/[^a-z0-9-_\s\/,:]/","",$word);

                //Remove orphaned & single letters
                $word = preg_replace("/\b[a-z]\b/","",$word);

                //Remove excess whitespace as a result of any of the above
                $word = preg_replace("/\s{2,}/", "", $word);

                if (ctype_space($word) || $word == "")
                {
                    unset($primaryWords[$key]);
                    continue;
                }

                $primaryWords[$key] = $word;
            }

            foreach ($primaryWords as $word)
            {
                $this->wordList[$word][$primaryKey] = 0;
            }
            $this->processedTitles[] = array_flip($primaryWords);
            $this->listings[$primaryKey]['processed_title'] = array_flip($primaryWords);

            // if ($this->listings[$primaryKey]['link_date'] < ($currentThreshold - $measure) || $primaryKey === $last)
            // {
            //     //Found the next threshold, add it & advance the $currentThreshold
            //     $currentThreshold = $this->listings[$primaryKey]['link_date'];
            //     $this->dateSettings->thresholds[] = $primaryKey; 
            // }
        }
    }

    function compareTitles($threshold_A, $threshold_B)
    {
        //////////////////////////////////////////////////////////////////////////////////
        // This cleans titles and then counts each individual word (obtaining vectors.) //
        //////////////////////////////////////////////////////////////////////////////////

        $results = $matchedIDs = array();

        $blockTimes = array(array(),array(),array());

        $processedTitles = $this->processedTitles;

        //Tally the counts for each word (its vector.)
        // echo "#".count($this->processedTitles)." COHORTS</br>";
        // foreach ($processedTitles as $primaryKey => $primaryWords)
        for ($primaryKey = $threshold_A; $primaryKey < $threshold_B; $primaryKey++)
        {
            $this->listings[$primaryKey]['groups'] = array();

            $primaryWords = $processedTitles[$primaryKey];

            //Flip the array so the words are now associative keys.
            $wordTally = $primaryWords;

            //The keys are now values.
            foreach ($wordTally as $key => $value)
            {
                $wordTally[$key] = 1;
            }


            $cohorts = array();
            foreach ($primaryWords as $word => $unused)
            {
                foreach ($this->wordList[$word] as $listingID => $none)
                {
                    if (isset($cohorts[$listingID]))
                    {
                        $cohorts[$listingID] += 1;
                    }
                    else
                    {
                        $cohorts[$listingID] = 1;
                    }
                }
            }
            foreach ($primaryWords as $word => $unused)
            {
                foreach ($this->wordList[$word] as $listingID => $none)
                {
                    $wordTally[$word] += $cohorts[$listingID];
                }
            }

            //Add and update words in the results list, placing keys in the listing's groups.
            foreach ($wordTally as $word => $value)
            {
                if (!(isset($matchedIDs[$word])))
                {
                    $results[] = array($word, $value, count($this->wordList[$word]));
                    $matchedIDs[$word] = $key = count($results) - 1;
                }
                else
                {
                    $key = $matchedIDs[$word];
                    $results[$key][1] += $value;
                    // $results[$key][2] += 1;
                }

                $this->listings[$primaryKey]['groups'][] = $key;
            }
            unset($processedTitles[$primaryKey]);
            $this->listings[$primaryKey]['processed_title'] = array_flip($this->listings[$primaryKey]['processed_title']);
        }

        $this->groups = $results;

    }

    function findPattern($threshold_A, $threshold_B)
    {

        $this->finalProduct = $this->groupWordList = $newGroupsRegistry = $newGroups = array();

        // foreach ($listings as $listingID => $listing)
        for ($listingID = $threshold_A; $listingID < $threshold_B; $listingID++)
        {

            $listing = $this->listings[$listingID];
            //Collect the individual groups of each link and their counts (vectors.)
            $cohorts = array();
            foreach ($listing["groups"] as $groupID)
            {
                $cohorts[$groupID] = $this->groups[$groupID][1];
            }

            //Sort the cohorts, getting the largest count and calculating the standard deviation of the whole.
            $cohortValues = $this->inverseBase100($cohorts);
            $stdev = ($this->findStandardDeviation($cohortValues,false));

            //Determin which groups belong in a "pattern".
            $pattern = array();
            $counts = array();
            foreach ($cohortValues as $groupID => $value)
            {
                if ($value <= $stdev)
                {
                    $pattern[] = $groupID;
                    $counts[$groupID] = $cohorts[$groupID];
                }
            }

            sort($pattern);

            //Check if the pattern has been registered with newGroups, placing the link within the appropriate group.
            $needsGroup = true;

            $patternKey = implode(".",$pattern);
            // echo $patternKey."</br>";


            if (isset($newGroupsRegistry[$patternKey]))
            {
                $newKey = $newGroupsRegistry[$patternKey];
                // echo $newKey."</br>";
                $newGroups[$newKey][1][] = $listingID;
                $needsGroup = false;
            }

            //If the pattern needs to be registered, add the pattern and the link.
            if ($needsGroup)
            {
                $newGroups[] = array($pattern,array($listingID));
                $newKey = count($newGroups)-1;
                $newGroupsRegistry[$patternKey] = $newKey;
            }

            foreach ($pattern as $groupID)
            {
                $this->groupWordList[$groupID][] = $newKey;
            }
        }
        $exiled = array();
        foreach ($newGroups as $primaryKey => $primaryGroup)
        {

            //You can't do anything with a pattern of one word, so don't process it.
            if (count($primaryGroup[0]) === 1)
            {
                continue;
            }

            $groupValues = array($primaryKey => count($primaryGroup[1]));
            $intersectCounts = array();

            foreach ($primaryGroup[0] as $groupID)
            {
                foreach ($this->groupWordList[$groupID] as $newGroupID)
                {

                    if ($primaryKey === $newGroupID)
                    {
                        continue;
                    }

                    //Do nothing with this group if it has been marked "removed" or "exiled".
                    if (!(isset($exiled[$newGroupID])))
                    {
                        if (!(isset($groupValues[$newGroupID])))
                        {
                            $groupValues[$newGroupID] = count($newGroups[$newGroupID][1]);

                            $primarySubject = array_flip($primaryGroup[0]);
                            $secondarySubject = array_flip($newGroups[$newGroupID][0]);

                            $intersect = array_intersect_key($primarySubject, $secondarySubject);
                            $intersectCounts[$newGroupID] = count($intersect);
                        }
                    }
                }
            }

            $groupValues = $this->inverseBase100($groupValues);
            $stdev = $this->findStandardDeviation($groupValues,false);

            //Failing the standard deviation requires merging into a replacement (if on exists.)
            if ($groupValues[$primaryKey] > $stdev)
            {
                arsort($intersectCounts);

                $candidates = array();
                $mainTopCount = current($intersectCounts);
                $pattern = $newGroups[$primaryKey][0];

                while (count($pattern) > 1)
                {
                    for ($topCount = $mainTopCount; $topCount > 0; $topCount--)
                    {
                        reset($intersectCounts);
                        do
                        {
                            if (current($intersectCounts) === $topCount)
                            {
                                //Check to see if the candidate has anyting NOT in the pattern.
                                $difference = array_diff($newGroups[key($intersectCounts)][0],$pattern);
                                if (!(bool)$difference)
                                {
                                    $candidates[] = key($intersectCounts);
                                }
                            }

                        } while (next($intersectCounts));

                        if ((bool)$candidates)
                        {
                            break;
                        }
                    }

                    if (!(bool)$candidates)
                    {
                        //Remove the weakest word of this pattern, then try the loop again.

                        //If the pattern is already at 1 word, with no matches - add it to newGroups and move on.
                        if (count($pattern) === 1)
                        {
                            $newGroups[] = array(current($pattern),$primaryGroup[1]);
                            unset($newGroups[$primaryKey]);
                            continue 2; //Move on to the next primary group.
                        }
                        
                        //Start the process with a placeholder. In the even of a tie, it loses.
                        $weakestPattern = array(key($pattern),current($pattern));
                        foreach ($pattern as $key => $groupID)
                        {
                            if ($this->groups[$groupID][1] < $this->groups[$weakestPattern[1]][1])
                            {
                                $weakestPattern = array($key,$groupID);
                            }
                        }

                        unset($pattern[$weakestPattern[0]]);
                        $pattern = array_values($pattern);

                    }
                    else
                    {
                        break;
                    }
                }

                $topCandidate = null;

                if (count($candidates) > 1)
                {
                    $largestSum = array(null,0);

                    foreach ($candidates as $newGroupID)
                    {
                        $localSum = 0;

                        foreach ($newGroups[$newGroupID][0] as $groupID)
                        {
                            $localSum += $this->groups[$groupID][1];
                        }

                        if ($localSum > $largestSum[1])
                        {
                            $largestSum = array($newGroupID,$localSum);
                        }

                    }

                    $topCandidate = $largestSum[0];
                    //Choose the group with the largest/strongest relationships
                }
                else if (count($candidates) === 1)
                {
                    $topCandidate = $candidates[0];
                }

                if (!(is_null($topCandidate)))
                {

                    $newGroups[$topCandidate][1] = array_merge($newGroups[$topCandidate][1], $newGroups[$primaryKey][1]);
                    $exiled[$primaryKey] = true;
                    // unset($newGroups[$primaryKey]);
                }

            }
        }

        foreach ($exiled as $primaryKey => $unused)
        {
            unset($newGroups[$primaryKey]);
        }


        //////////////////////////////////////////////////////////////////////////////
        //  Determin the pattern order.                                             //
        //  Important to do this last as to gain the largest possible sample size.  //
        //////////////////////////////////////////////////////////////////////////////
        foreach ($newGroups as $newGroupID => $newGroup)
        {
            $allPositions = $allGainedPatterns = array();

            foreach ($newGroup[1] as $listingID)
            {

                $localPositions = array();
                $newPositions = array();
                $candidates = array();
                foreach ($newGroup[0] as $groupID)
                {
                    $candidates[] = $this->groups[$groupID][0];
                    $matches = array_keys($this->listings[$listingID]['normal_title'], $this->groups[$groupID][0]);
                    $rawMatches = array();

                    foreach ($this->listings[$listingID]['normal_title'] as $key => $candidate)
                    {
                        if ($candidate === $this->groups[$groupID][0])
                        {
                            $rawMatches[] = $key;
                        }
                    }

                    foreach ($rawMatches as $key)
                    {
                        $newPositions[$key] = $groupID;
                    }

                    foreach ($matches as $key)
                    {
                        $localPositions[$key] = $groupID;
                    }
                }

                //Sort the keys & reset them. This is in preperation to compare the array to other arrays.
                $rawPositions = $localPositions;
                ksort($localPositions);

                $valuedPositions = array_values($localPositions);

                /////////////////////////////////////////////////////////////////////
                //  Find stop words that exist in between and around the pattern.  //
                /////////////////////////////////////////////////////////////////////

                reset($localPositions);
                $indexStart = key($localPositions);

                //Add the first word of the pattern while we're here.
                // echo "## ".implode(" ",$this->listings[$listingID]['control_title'])."</br>";

                // if (!(isset($this->listings[$listingID]['control_title'][$indexStart])))
                // {
                //     echo "<pre>";
                //     var_dump($matches);
                //     var_dump($localPositions);
                //     echo "======</br>";
                //     var_dump($rawMatches);
                //     var_dump($newPositions);
                //     echo "---------</br>";
                //     var_dump($candidates);
                //     var_dump($this->listings[$listingID]);
                // }


                $localGainedPattern = array($this->stripLeadingTrialingPunctuation($this->listings[$listingID]['control_title'][$indexStart]));
                $lowerGainedPattern = array($this->listings[$listingID]['normal_title'][$indexStart]);

                end($localPositions);
                $indexEnd = key($localPositions);

                for ($i = $indexStart + 1; $i < $indexEnd; $i++)
                {
                    //NOTE: we are measuring start to finish.
                    //Maintain repeated words from the main pattern in this pattern.
                    $localGainedPattern[] = $this->listings[$listingID]['control_title'][$i];
                    $lowerGainedPattern[] = $this->listings[$listingID]['normal_title'][$i];
                }

                //Conditionally add the last word.
                //Ignore puncutation beyond letters & digits
                if ($indexStart !== $indexEnd)
                {
                    $localGainedPattern[] = $this->stripLeadingTrialingPunctuation($this->listings[$listingID]['control_title'][$indexEnd]);
                    $lowerGainedPattern[] = $this->listings[$listingID]['normal_title'][$indexEnd];
                }

                $needsLowerPattern = $needsUpperPattern = true;

                foreach (array_keys($allGainedPatterns) as $gainedKey)
                {
                    if ($lowerGainedPattern == $allGainedPatterns[$gainedKey][0])
                    {
                        $allGainedPatterns[$gainedKey][1]++;
                        $allGainedPatterns[$gainedKey][2][] = $listingID;
                        $needsLowerPattern = false;

                        //Find/place the non-modified version of the pattern.
                        foreach ($allGainedPatterns[$gainedKey][3] as $key => $upperPattern)
                        {
                            if ($localGainedPattern == $upperPattern)
                            {
                                $allGainedPatterns[$gainedKey][3][$key][1]++;
                                $needsUpperPattern = false;
                                break;
                            }
                        }

                        if ($needsUpperPattern)
                        {
                            $upperPattern[] = array($localGainedPattern, 1);
                        }

                        break;
                    }
                }

                if ($needsLowerPattern)
                {
                    $allGainedPatterns[] = array($lowerGainedPattern, 1, array($listingID), array(array($localGainedPattern, 1)));
                    // if (implode(" ", $lowerGainedPattern) == "one xbox")
                    // {
                    //     echo "<pre>";
                    //     var_dump($this->listings[$listingID]);
                    //     var_dump($localPositions);
                    //     var_dump($rawPositions);
                    //     var_dump($newPositions);
                    //     exit;
                    // }
                }
            }
            
            $patternValues = array();
            foreach ($allGainedPatterns as $key => $gainedPattern)
            {
                $patternValues[$key] = $gainedPattern[1];
            }

            $patternValues = $this->inverseBase100($patternValues);
            $stdev = $this->findStandardDeviation($patternValues, false);

            //sort by passed and failed. Passed stands alone while failed is filtered out.
            $passFail = array(array(),array());
            foreach ($patternValues as $key => $value)
            {
                if ($value <= $stdev && $stdev > 0 || count($patternValues) === 1)
                {
                    $passFail[0][] = $key;
                }
                else
                {
                    $passFail[1][] = $key;
                }

            }

            if (!(empty($passFail[1])))
            {

                foreach ($passFail[1] as $failedKey => $failedID)
                {

                    $failedTitle = implode(" ",$allGainedPatterns[$failedID][0]);

                    foreach ($passFail[0] as $passedID)
                    {
                        $candidateTitle = implode(" ",$allGainedPatterns[$passedID][0]);

                        if (strlen($candidateTitle) < strlen($failedTitle))
                        {
                            if (strpos($failedTitle, $candidateTitle) !== false)
                            {
                                //This is our new home
                                $allGainedPatterns[$passedID][1] += count($allGainedPatterns[$failedID][1]);
                                $allGainedPatterns[$passedID][2] = array_merge($allGainedPatterns[$passedID][2], $allGainedPatterns[$failedID][2]);
                                unset($allGainedPatterns[$failedID]);
                                unset($passFail[1][$failedKey]);
                            }
                            // else
                            // {
                            //     echo $failedTitle." << ".$candidateTitle."</br>";
                            // }
                        }
                        // else
                        // {
                        //     echo $failedTitle." XX ".$candidateTitle."</br>";
                        // }

                    }
                }
            }

            //Place any surviving failed groups into the control group.
            // $controlGroup = array(0 => "", 1 => array());
            if (!(empty($passFail[1])))
            {

                $parts = array();
                foreach ($newGroup[0] as $groupID)
                {
                    $parts[] = '"'.$this->groups[$groupID][0].'"';
                }

                $controlGroup = implode(" and ", $parts);
                $controlGroupLinks = array();

                foreach ($passFail[1] as $failedID)
                {
                    if (!(empty($allGainedPatterns[$failedID][2])))
                    {
                        $controlGroupLinks = array_merge($controlGroupLinks, $allGainedPatterns[$failedID][2]);
                    }
                }
                unset($allGainedPatterns[$failedID]);
            }

            if (!(empty($passFail[0])))
            {
                foreach ($passFail[0] as $passedID)
                {
                    $counts = array();
                    foreach($allGainedPatterns[$passedID][3] as $key => $candidate)
                    {
                        $counts[$key] = $candidate[1];
                    }
                    arsort($counts);
                    reset($counts);

                    $finalTitle = implode(" ",$allGainedPatterns[$passedID][3][key($counts)][0]);
                    if ($this->isMultiPass)
                    {
                        $this->finalProduct[$finalTitle][$this->passNumber] = $allGainedPatterns[$passedID][2];
                    }
                    else
                    {
                        $this->finalProduct[0][$finalTitle] = $allGainedPatterns[$passedID][2];
                    }

                    // $finalProduct[] = array(implode(" ",$allGainedPatterns[$passedID][3][key($counts)][0]),$allGainedPatterns[$passedID][2]);

                }
            }

            if (!(empty($controlGroup[1])))
            {
                if ($this->isMultiPass)
                {
                    $this->finalProduct[$controlGroup][$this->passNumber] = $controlGroupLinks;
                }
                else
                {
                    $this->finalProduct[0][$controlGroup] = $controlGroupLinks;
                }
            }

        }

        if (!($this->isMultiPass))
        {
            $order = array_map("count", $this->finalProduct[0]);
            arsort($order);
            $sortedOrder = array();
            $index = "";
            $i = 0;

            //Flip the array manually. Cannot use array_flip due to identicle keys being removed.
            //Note: casting each product as a string is to prevent JavaScript from re-sorting the data.
            foreach ($order as $product => $count)
            {
                // $index = '"'.$i.'"';
                $sortedOrder[] = (string)$product;
                // $i++;
            }
            $this->finalProduct[1] = $sortedOrder;
            // $this->test = $sortedOrder;
            // echo "<pre>===============================================================================</br>";
            // echo "## ".$this->name." ##</br>";
            // var_dump($sortedOrder);
            // exit();
            // var_dump($this->finalProduct);
            // var_dump($order);
            // var_dump($order);
            // exit();
        }
        else
        {
            $this->finalProduce[1] = "";
        }

        $this->finalProduct[2] = $this->listings;

        return true;
    }

    function printProduct()
    {
        $groups = $everythingElse = array();

        //This function prints the final group results for debugging purposes.
        // echo "<pre>";
        // var_dump($finalProducts);
        // exit();
        echo "<div>========================================================================================</div>";
        echo "<table>";
        foreach ($this->finalProduct as $product => $passes)
        {
            echo "<tr><td>".$product."</td>";

            for ($i = 0; $i < $this->passNumber; $i++)
            // foreach ($passes as $passNumber => $listingIDs)
            {
                if (isset($passes[$i]))
                {
                    echo "<td>".count($passes[$i])."</td>";
                }
                else
                {
                    echo "<td>0</td>"; 
                }
            
            }
            echo "</tr>";
            // if ((bool)$everythingElse)
            // {
            //     // echo "<h3>** Stand-Alone Links **</h3>";
            //     foreach ($everythingElse as $listingID)
            //     {
            //         $listing = $this->listings[$listingID];
            //         // echo $listing["link_title"]."</br>";
            //         echo $listing["link_date"]."</br>";
            //     }
            // }
        }
        echo "</table>";
    }

    function stripLeadingTrialingPunctuation($word)
    {

        $word = preg_replace("/(?=[^\p{L}\p{N}]|^)[^\p{L}\p{N}]+(?=[\p{L}\p{N}])/u","", $word);
        $word = preg_replace("/(?<=[\p{L}\p{N}])[^\p{L}\p{N}]+(?=[^\p{L}\p{N}]|$)/u","", $word);
        $word = trim($word);


        return $word;
    }

    function accentsToNormal($string)
    {
        $normalChars = array("Å" => "a","å" => "a","ă" => "a","Æ" => "a","æ" => "a","â" => "a","À" => "a","à" => "a","Ă" => "a","Á" => "a","á" => "a","Â" => "a","â" => "a","Â" => "a","Ã" => "a","ã" => "a","Ä" => "a","ä" => "a","Þ" => "b","þ" => "b","Ç" => "c","ç" => "c","Ð" => "dj","È" => "e","è" => "e","É" => "e","é" => "e","Ê" => "e","ê" => "e","Ë" => "e","ë" => "e","ƒ" => "f","Ï" => "i","ï" => "i","î" => "i","Î" => "i","Ì" => "i","ì" => "i","Í" => "i","í" => "i","Î" => "i","î" => "i","Ñ" => "n","ñ" => "n","ð" => "o","Ò" => "o","Ó" => "o","ò" => "o","Ô" => "o","ó" => "o","Õ" => "o","ô" => "o","Ö" => "o","õ" => "o","Ø" => "o","ö" => "o","ø" => "o","Š" => "s","š" => "s","ș" => "s","Ș" => "s","ß" => "ss","ț" => "t","Ț" => "t","Û" => "u","ú" => "u","Ü" => "u","û" => "u","Ù" => "u","Ú" => "u","ù" => "u","Ý" => "y","ý" => "y","ý" => "y","ÿ" => "y","Ž" => "z","ž" => "z");
        $string = strtr($string, $normalChars);
        return $string;
    }

    function inverseBase100($data)
    {
        arsort($data);
        reset($data);
        $top = current($data);
        $results = array();
        foreach ($data as $key => $value)
        {
            $data[$key] = 100-(100*($value/$top));
        }
        return $data;
    }

    function findStandardDeviation($frequency, $sample)
    {
        $n = count($frequency);

        if ($n === 0)
        {
            return 0;
        }

        $mean = array_sum($frequency) / $n;

        $carry = 0.0;

        foreach ($frequency as $val) {
            $d = ((double) $val) - $mean;
            $carry += $d * $d;
        };

        if ($sample && $n > 1) {
           --$n;
        }
        $result = sqrt($carry/$n);
        return $result;
    }

    function printAndTallyPatterns()
    {

        $isFancyPrint = false;
        $isLinksPrint = false;

        $newGroups = $this->newGroups;

        foreach ($newGroups as $newGroup)
        {
            $groupCounts = $title = array();
            foreach ($newGroup[0] as $groupID)
            {
                $title[] = $this->groups[$groupID][0];
                $groupCounts[] = $this->groups[$groupID][2];
            }

            if ($isFancyPrint) {echo "<h4>";}

            echo implode(" ", $title);

            if ($isFancyPrint) {echo "</h4>";} else {echo ",";}

            $linkCount = count($newGroup[1]);

            foreach ($groupCounts as $key => $groupCount)
            {
                echo $title[$key].": ".$linkCount."/".$groupCount.",";
            }

            if (!$isFancyPrint) {echo "</br>";}

            if ($isLinksPrint)
            {
                foreach ($newGroup[1] as $listingID)
                {
                    echo $this->listings["link_title"]."</br>";
                }
            }
        }
    }

    function splitTimer($message)
    {
        if (!(isset($this->splits)))
        {
            $this->splits = array(microtime(true),array());
        }

        $this->splits[1][] = array(microtime(true),$message);

    }

    // function jsonPrint()
    // {
    //     $tally = $this->timeTally;
    //     foreach ($tally as $daily)
    //     {
    //         $box = array(); //Needs to be reset on each iteration.
    //         foreach ($daily as $word => $days)
    //         {
    //             $lengths = array_map("count", $days);
    //             $max = max($lengths);
    //             $box[] = array($word, $lengths, $max);
    //         }
    //         $container[] = $box;
    //     }
    //     $container[] = $this->range; //Add the 1st day of the range to remain consistent in the JavaScript
    //     $container[] = array($this->monthCohorts,$this->listings,$this->groups);
    //     $container = json_encode($container);
    //     echo $container;
    // }

    function phpPrint()
    {
        $daily = $this->daily;
        $groups = $this->groups;

        foreach ($daily as $wordKey => $days)
        {
            $word = $groups[$wordKey][0];
            $tally = array();
            $yesterday = 0;
            print_r("<h3>".$word."</h3>");

            //Which day has the highest total? Used for graphing.
            $lengths = array_map("count", $days);
            $max = max($lengths);

            //We graph oldest to newest; arrays are built newest to oldest.
            end($days);
            do
            {
                $count = count(current($days));

                if (empty($tally))
                {
                    $tally[] = $count;
                }
                else
                {
                    $tally[] = $count + $tally[count($tally)-1];
                }


            } while (prev($days));

            echo "</br>";

            foreach ($tally as $count)
            {
                echo "[".$count."]";
            }
        }
    }

    function printJSON()
    {
        $results = $this->results;
        $final = json_encode($results);
        echo $final;
        // $final = json_encode($this->test);
        // echo "<pre>";
        // var_dump($this->test);
        // echo $final;
        // exit();
        // echo $final;
        // file_put_contents("../samples/jsonResponse.json", $final);
        // echo "## SUCCESS ##";
    }

    function mysqlErrorHandler($error, $line)
    {

        $line = date('Y-m-d H:i:s') . " - ".$_SERVER['REMOTE_ADDR'].'| '.$error.$this->errno.') '.$this->error.' on line '.$line.' in file '.__FILE__;
        // file_put_contents('/var/www/html/drames.com/error_logs/error_log', $line . PHP_EOL, FILE_APPEND);
        print_r('internal_error');

        if ($result = $this->query("SELECT @@autocommit"))
        {
            $row = $result->num_rows;
        }

        if (!$row)
        {
            $this->rollback();
            $this->autocommit(true);
        }

        return ("Error communicating with the database.");
    }
}

?>