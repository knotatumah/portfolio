/*
    ============================================================================
                        ABANDON ALL HOPE YE WHO ENTER HERE
    ============================================================================

    This is unmaintained and un-refactored code!

    Its horrible, ugly, full of bad shortcuts and bad practices, and in many
    ways broken just to fit into a React view.

    Why is it here then? Why are you reading this? Because Shadows Version 2 is
    a ways away and this is still pretty cool to me. If it looks wrong, and it
    probably is, I'm most likely aware of it. Or not. Shadows V2 is happening
    for a reason.

    This is what you get when you don't do things the right way the first time
    around and "temporary" becomes "permanent"!
*/


function ShadowDraw(arg)
{
    

    this.mxPos = 0;
    this.myPos = 0;
    this.canDraw = true;

    //Debug options
    this.debugOptions = {
        enableShape: true,
        enableShadow: true,
        debugShadow: false,
        debugMid: false,
        debugLines: false,
        visibleEdge: false,
        allLines: false
    }

    this.boxStore = new Array(


        new Array(
            new Array(
                new Array(100,25),
                new Array(175,25),
                new Array(150,50),
                new Array(150,75),
                new Array(175,100),
                new Array(100,100),
                new Array(125,75),
                new Array(125,50)
            )
        ),
        /*
            Plus Sign
        */
        new Array(
            new Array(
                new Array(100,62.5),
                new Array(125, 62.5),
                new Array(125, 50),
                new Array(175, 50),
                new Array(175, 62.5),
                new Array(200, 62.5),
                new Array(200, 87.5),
                new Array(175, 87.5),
                new Array(175, 100),
                new Array(125, 100),
                new Array(125, 87.5),
                new Array(100, 87.5)
            )
        ),
        /*
            Squares
        */
        new Array(
            new Array(
                    new Array(50, 25),
                    new Array(100, 25),
                    new Array(100, 75),
                    new Array(50, 75)
                ),
            new Array(
                new Array(200, 50),
                new Array(250, 50),
                new Array(250, 125),
                new Array(200, 125)
            )
        ),
        /*
            original shapes
        */
        new Array(
            new Array(
                new Array(50,40),
                new Array(65,20),
                new Array(80,40),
                new Array(80,60),
                new Array(50,50)
            ),
            new Array(
                new Array(200,60),
                new Array(250,60),
                new Array(250,110),
                new Array(200,110),
                new Array(225,98),
                new Array(225,72)
            )
        ),

        /*
            The X
        */
        new Array(
            new Array(
                new Array(50,25),
                new Array(150,50),
                new Array(250,25),
                new Array(200,75),
                new Array(250,125),
                new Array(150,100),
                new Array(50,125),
                new Array(100,75)
            )
        ),

        /*
            The Star
        */
        new Array(
            new Array(
                new Array(132, 86),
                new Array(83, 98),
                new Array(129, 77),
                new Array(80, 68),
                new Array(130, 67),
                new Array(88, 39),
                new Array(135, 59),
                new Array(108, 17),
                new Array(142, 53),
                new Array(135, 3),
                new Array(152, 51),
                new Array(165, 1),
                new Array(161, 52),
                new Array(193, 14),
                new Array(169, 59),
                new Array(214, 35),
                new Array(174, 67),
                new Array(224, 63),
                new Array(175, 76),
                new Array(224, 92),
                new Array(173, 84),
                new Array(210, 119),
                new Array(167, 91),
                new Array(185, 139),
                new Array(157, 95),
                new Array(153, 147),
                new Array(147, 97),
                new Array(123, 140),
                new Array(138, 92),
                new Array(98, 124)
            )
        ),

        /*
            Big Horizontal & Vertical
        */
        new Array(
            new Array(
                new Array(30, 45),
                new Array(70, 35),
                new Array(90, 15),
                new Array(110, 35),
                new Array(130, 15),
                new Array(150, 35),
                new Array(170, 15),
                new Array(190, 35),
                new Array(210, 15),
                new Array(230, 35),
                new Array(280, 45),
                new Array(230, 55),
                new Array(280, 65),
                new Array(230, 75),
                new Array(280, 85),
                new Array(230, 95),
                new Array(280, 105),
                new Array(230, 115),
                new Array(210, 135),
                new Array(190, 115),
                new Array(170, 135),
                new Array(150, 115),
                new Array(130, 135),
                new Array(110, 115),
                new Array(90, 135),
                new Array(70, 115),
                new Array(30, 105),
                new Array(70, 95),
                new Array(30, 85),
                new Array(70, 75),
                new Array(30, 65),
                new Array(70, 55)
            )
        )
    );
}

ShadowDraw.prototype =
{

    enable: function()
    {
        this.shadowCanvas = document.getElementById("shadowCanvas");
        this.ctx = shadowCanvas.getContext("2d");
        window.addEventListener("mousemove", shadowDraw.mouseCall,true);
        window.addEventListener("resize", function(){shadowDraw.updateRect()});
        this.rect = this.shadowCanvas.getBoundingClientRect();
    },

    disable: function()
    {
        window.removeEventListener("mousemove", shadowDraw.mouseCall,true);
        window.removeEventListener("resize", function(){shadowDraw.updateRect()});
    },

    mouseCall: function(event)
    {
        if (shadowDraw.canDraw)
        {
            shadowDraw.main(event.pageX, event.pageY);
        }
    },

    updateRect: function()
    {
        this.rect = this.shadowCanvas.getBoundingClientRect();
    },
    
    main: function(mxPos, myPos)
    {



        this.ctx.clearRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height);

        drawX = (mxPos - this.rect.left)/2;
        drawY = (myPos - this.shadowCanvas.offsetTop)/2;

        var e = document.getElementById("shapeSelect");
        var selectBoxIndex = e.options[e.selectedIndex].value;
        boxCoordinates = this.boxStore[selectBoxIndex];

        for (var i = 0; i < boxCoordinates.length; i++)
        {

            var pointsRegistry = new Array(),
                isFirst = true,
                prevPoint = "box",
                intersects = new Array(),
                leadingEdges = new Array(),
                lines = new Array(),
                testHistory = new Array(),
                collinearList = new Array();

            for (var ii = 0; ii < boxCoordinates[i].length; ii++)
            {
                this.ctx.lineWidth = 1;
                intersects.push(this.findIntersect(new Array(drawX, drawY), boxCoordinates[i][ii], boxCoordinates[i], false, true));
            }


            for (var subLineKey = 0; subLineKey < intersects.length; subLineKey++)
            {
                var subjectLine = intersects[subLineKey],
                    drawCount = 0,
                    orderedLine = new Array(),
                    edgeRay = true,
                    isPoint = false,
                    drawQueue = new Array(),
                    sortRaw = new Array(),
                    sortRawCopy = new Array(),
                    targetPoint = false,
                    collinearLock = false;


                for (var iii = 0; iii < subjectLine.length; iii++)
                {
                    var result = Math.sqrt(
                                    Math.pow((drawX - subjectLine[iii][0]),2) + Math.pow((drawY - subjectLine[iii][1]),2)
                                );
                    sortRaw.push(result);
                    sortRawCopy.push(result);

                    if (this.debugOptions.allLines)
                    {
                        this.ctx.lineWidth = 1;
                        this.ctx.strokeStyle = "#AA00FF";
                        this.ctx.setLineDash([0]);

                        this.ctx.beginPath();
                        this.ctx.moveTo(drawX,drawY);
                        this.ctx.lineTo(subjectLine[subjectLine.length - 1][0], subjectLine[subjectLine.length - 1][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }

                }

                sortSorted = this.ascSort(sortRawCopy);

                var subjectIndex = sortRaw.indexOf(sortSorted[0]);


                //Check if the 1st entry in drawQueue is polygon coordinate
                for (var polyKey = 0; polyKey < boxCoordinates[i].length; polyKey++)
                {

                    if (subjectLine[subjectIndex][0] === boxCoordinates[i][polyKey][0] && subjectLine[subjectIndex][1] === boxCoordinates[i][polyKey][1])
                    {
                        // clearedIndexes.push(new Array(subjectIndex, V));
                        isPoint = true;
                        orderedLine.push(subjectLine[subjectIndex]);
                        var previousIndex = subjectIndex;
                        break;
                    }
                }
                

                if (isPoint)
                {
                    for (var sortedKey = 1; sortedKey < sortSorted.length; sortedKey++)
                    {
                        var subjectIndex = sortRaw.indexOf(sortSorted[sortedKey]);


                        //Test if the midpint is in or out of the shape
                        var pointA = subjectLine[previousIndex],
                            pointB = subjectLine[subjectIndex];

                        var midpoint = new Array(((pointA[0] + pointB[0])/2), ((pointA[1] + pointB[1])/2));


                        var isInShape = this.findIntersect(midpoint, new Array(300, midpoint[1]), boxCoordinates[i], true, true);

                        if (isInShape)
                        {

                            var isCollinear = false;

                            //Only check for collinear points if pointA & pointB are side-by-side in boxCoordinates
                            if (this.neighborCheck(boxCoordinates[i], pointA, pointB))
                            {
                                var slopeA = this.findSlope(new Array(drawX, drawY, pointA[0], pointA[1])),
                                    slopeB = this.findSlope(new Array(pointA[0], pointA[1], pointB[0], pointB[1]));

                                if (slopeA === slopeB)
                                {
                                    targetPoint = boxCoordinates[i][subLineKey];
                                    isCollinear = true;
                                    collinearLock = true;
                                }
                            }

                            if (!isCollinear)
                            {
                                edgeRay = false;
                                break;
                            }
                        }

                        previousIndex = subjectIndex;

                        
                    }

                    var subject = subjectLine[previousIndex],
                        canAdd = true;

                    if (subject[0] === orderedLine[0][0] && subject[1] === orderedLine[0][1])
                    {
                        canAdd = false;
                    }
                        

                    if (canAdd)
                    {
                        orderedLine.push(subject);
                    }

                }

                /*
                    Verify if each line/point is unique.
                    Depending on parallels & intersections,
                    some points may be added before they
                    appear in rotation.
                */
                if (orderedLine.length)
                {
                    var isUnique = true;

                    if (isInShape && collinearLock)
                    {
                        var isGoodTarget = false;
                        for (var OLKey = 0; OLKey < orderedLine.length; OLKey++)
                        {
                            if (targetPoint[0] == orderedLine[OLKey][0] && targetPoint[0] == orderedLine[OLKey][0])
                            {
                                orderedLine = new Array(targetPoint);
                                isGoodTarget = true;
                                break;
                            }
                        }

                        if (!isGoodTarget)
                        {
                            isUnique = false;
                        }
                    }

                    for (lineIndex = 0; lineIndex < lines.length; lineIndex++)
                    {
                        subjectLine = lines[lineIndex];

                        //If the whole line is unique...
                        if (orderedLine.length == 2 && subjectLine.length == 2)
                        {
                            if (orderedLine[0][0] === subjectLine[0][0] && orderedLine[0][1] === subjectLine[0][1] && orderedLine[1][0] === subjectLine[1][0] && orderedLine[1][1] === subjectLine[1][1])
                            {
                                isUnique = false;
                                break;
                            }
                        }
                        else if (orderedLine.length == 1 && subjectLine.length == 1)
                        {
                            orderedLine[0][0] === subjectLine[0][0] && orderedLine[0][1] === subjectLine[0][1]
                        }
                        else
                        {
                            if (orderedLine.length > subjectLine.length)
                            {
                                var shortPoint = subjectLine,
                                    longPoint = orderedLine;
                            }
                            else
                            {
                                var shortPoint = orderedLine,
                                    longPoint = subjectLine;
                            }


                            if ((shortPoint[0] == longPoint[0][0] && shortPoint[0] == longPoint[0][1]) || (shortPoint[0] == longPoint[1][0] && shortPoint[0] == longPoint[1][1]))
                            {
                                isUnique = false;
                                break;
                            }
                        }
                    }

                    if (isUnique)
                    {

                        lines.push(orderedLine);
                        collinearList.push(new Array(collinearLock, targetPoint));

                        if (edgeRay)
                        {
                            leadingEdges.push(orderedLine[0]);
                        }
                    }

                    /*
                        DEBUG PRINTING
                    */
                    if (this.debugOptions.debugLines)
                    {
                        this.ctx.lineWidth = 1;
                        if (edgeRay)
                        {
                            this.ctx.strokeStyle = "#3366ff";
                            this.ctx.setLineDash([0]);
                        }
                        else
                        {
                            this.ctx.strokeStyle = "#000";
                            this.ctx.setLineDash([2, 3]);
                        }
                        this.ctx.beginPath();
                        this.ctx.moveTo(drawX,drawY);
                        this.ctx.lineTo(orderedLine[orderedLine.length - 1][0], orderedLine[orderedLine.length - 1][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }

            /*
                Determine the starting location of our shadow path.
                This is all in effort to discover a consistent staring point.
            */

            var pointA = leadingEdges[0],
                pointB = leadingEdges[1];

            var slope = this.findSlope(new Array(pointA[0], pointA[1], pointB[0], pointB[1]));
            var b = pointA[1] - (pointA[0] * slope);

            var midpoint = new Array(((pointA[0] + pointB[0])/2), ((pointA[1] + pointB[1])/2));


            var intersects = this.findIntersect(new Array(drawX, drawY), midpoint, boxCoordinates[i], false, false);
            if (intersects.length > 1)
            {
                var mod = -1;
            }
            else
            {
                var mod = 1;
            }

            var distance = Math.sqrt(
                                Math.pow((midpoint[0] - pointA[0]),2) + Math.pow((midpoint[1] - pointA[1]),2)
                            );

            var adjustment = distance / Math.sqrt(Math.pow(pointA[1] - pointB[1],2) + Math.pow(pointA[0] - pointB[0],2)) * mod;
            var tempC = new Array(
                midpoint[0] + ((pointA[1] - pointB[1]) * adjustment),
                midpoint[1] + ((pointB[0] - pointA[0]) * adjustment)
                );
            var tempD = new Array(
                midpoint[0] - ((pointA[1] - pointB[1]) * adjustment),
                midpoint[1] - ((pointB[0] - pointA[0]) * adjustment)
                );

            var diff1 = Math.sqrt(
                                Math.pow((drawX - tempC[0]),2) + Math.pow((drawY - tempC[1]),2)
                            );
            var diff2 = Math.sqrt(
                                Math.pow((drawX - tempD[0]),2) + Math.pow((drawY - tempD[1]),2)
                            );


                if (diff1 > diff2)
                {
                    pointC = tempC;
                }
                else
                {
                    pointC = tempD;
                }

            var pointCRot = new Array(
                midpoint[0] - (pointC[1] - midpoint[1]),
                midpoint[1] + (pointC[0] - midpoint[0])
                );
            
            /*
                POINT C & POINT C ROTATION DEBUG
            */
            if (this.debugOptions.debugMid)
            {
                this.ctx.strokeStyle = "#a00";
                this.ctx.setLineDash([0]);
                this.ctx.beginPath();
                this.ctx.moveTo(midpoint[0], midpoint[1]);
                this.ctx.lineTo(pointC[0], pointC[1]);
                this.ctx.stroke();
                this.ctx.closePath();

                this.ctx.strokeStyle = "#0a0";
                this.ctx.setLineDash([0]);
                this.ctx.beginPath();
                this.ctx.moveTo(midpoint[0], midpoint[1]);
                this.ctx.lineTo(pointCRot[0], pointCRot[1]);
                this.ctx.stroke();
                this.ctx.closePath();
            }

            

            /*
                Begin adding the path for the shadow
            */
            
            //Identify which leadingEdge pointCRot describes
            for (var ii = 0; ii < leadingEdges.length; ii++)
            {
                if (pointCRot[0] == leadingEdges[ii][0] && pointCRot[1] == leadingEdges[ii][1])
                {

                    if (mod == 1)
                    {
                        if (ii == 1)
                        {
                            ii = 0;
                        }
                        else
                        {
                            ii = 1;
                        }

                        pointCRot = leadingEdges[ii];
                    }

                    startingEdge = leadingEdges[ii];

                    if (ii == 0)
                    {
                        endingEdge = ii + 1;
                    }
                    else
                    {
                        endingEdge = ii - 1;
                    }

                    break;
                }
            }


            //Find the starting index in boxCoordinates
            for (var ii = 0; ii < boxCoordinates[i].length; ii++)
            {
                if (boxCoordinates[i][ii][0] == pointCRot[0] && boxCoordinates[i][ii][1] == pointCRot[1])
                {
                    var startingIndex = ii,
                        boxIndex = ii + 1;

                    if (boxIndex >= boxCoordinates[i].length)
                    {
                        boxIndex = 0;
                    }
                    break;
                }
            }

            //Find the point describing the final point of the shadow
            for (var ii = 0; ii < lines.length; ii++)
            {
                for (var iii = 0; iii < lines[ii].length; iii++)
                {
                    if (lines[ii][iii][0] == pointCRot[0] && lines[ii][iii][1] == pointCRot[1])
                    {
                        var endingPoint = lines[ii][lines[ii].length - 1];
                        break;
                    }
                }
            }

            var shadowPath = new Array(pointCRot),
                currentPoint = new Array(-1, -1),
                isEdge = false,
                skippedPoints = false,
                pointsLength = 1,
                now = 1,
                then = 0,
                isInverse = false;

            /*
                Cycle through the polygon, starting at our determined starting point.
                This is to find the right order of our lines.
            */
            while (isEdge == false)
            {
                var boxPoint = boxCoordinates[i][boxIndex];

                for (var ii = 0; ii < lines.length; ii++)
                {
                    var points = new Array(),
                        isKeeper = false;


                    if (boxPoint[0] == lines[ii][0][0] && boxPoint[1] == lines[ii][0][1])
                    {
                        isKeeper = true;
                    }

                    for (var iii = 0; iii < lines[ii].length; iii++)
                    {

                        points.push(new Array(lines[ii][iii][0],lines[ii][iii][1]));


                        // need to verify the point is in order before we do this step...
                        if (lines[ii][iii][0] == leadingEdges[endingEdge][0] && lines[ii][iii][1] == leadingEdges[endingEdge][1] && isKeeper == true)
                        {
                            isEdge = true;
                        }
                    }

                    if (isKeeper)
                    {
                        pointsLength = points.length;
                        then = now;
                        now = pointsLength;

                        if (then !== 2 && now == 0)
                        {
                            isInverse = true;
                        }
                        else if (then == 0 && now == 2 && isInverse == true)
                        {
                            //Stay True
                        }
                        else if (then == 2 && now == 0 && isInverse == true)
                        {
                            //Stay True
                        }
                        else if (then > 0 && now !== 2)
                        {
                            isInverse = false;
                        }
                        else
                        {
                            isInverse = false;
                        }
                        

                        if (!isInverse || isEdge == true)
                        {
                            for (var ii = 0; ii < pointsLength; ii++)
                            {
                                shadowPath.push(new Array(points[ii][0], points[ii][1]));
                            }
                        }
                        else
                        {
                            for (var ii = pointsLength - 1; ii >= 0; ii--)
                            {
                                shadowPath.push(new Array(points[ii][0], points[ii][1]));
                            }
                            skippedPoints = false;
                        }


                        break;
                    }
                }

                if (isKeeper)
                {
                    skippedPoints = false;
                }
                else
                {
                    then = now;
                    now = 0;
                    if (now == 0 && then !== 2)
                    {
                        isInverse = true;
                    }
                    skippedPoints = true;
                }


                boxIndex++;

                if (boxIndex == boxCoordinates[i].length)
                {
                    boxIndex = 0;
                }
            }

            /*
                Experimental Visible Edge
            */
            if (this.debugOptions.visibleEdge)
            {
                this.ctx.strokeStyle = "#F00";
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([0]);
                this.ctx.moveTo(shadowPath[0][0], shadowPath[0][1]);
                this.ctx.beginPath();
                this.ctx.lineWidth = 1;

                for (var ii = 0; ii < shadowPath.length - 1; ii++)
                {
                    this.ctx.lineTo(shadowPath[ii][0], shadowPath[ii][1]);
                }
                this.ctx.stroke();
                this.ctx.closePath();
            }


            /*
                Fill in the outer edges of the shadow.
                Note that the true end points are delayed on mod 1
                to force the logic to work in a complete circle
                if the end points are on the same line.
            */
            var currentPoint = shadowPath[shadowPath.length - 1];
            var tempEndX = endingPoint[0],
                tempEndY = endingPoint[1],
                cpX = currentPoint[0],
                cpY = currentPoint[1],
                endX = "",
                endY = "";

                if (mod == -1)
                {
                    endX = tempEndX;
                    endY = tempEndY;  
                }

            while (cpX !== endX || cpY !== endY)
            {
                if (endY !== 0 && cpY == 0 && cpX >= 0 && cpX < 300)
                {
                    shadowPath.push(new Array(300, 0));
                    cpX = 300;
                    cpY = 0;
                }
                else if (endX !== 300 && cpX == 300 && cpY >= 0 && cpY < 150)
                {
                    shadowPath.push(new Array(300, 150));
                    cpX = 300;
                    cpY = 150;
                }
                else if (endY !== 150 && cpX <= 300 && cpX > 0 && cpY == 150)
                {
                    shadowPath.push(new Array(0, 150));
                    cpX = 0;
                    cpY = 150;
                }
                else if (endX !== 0 && cpX == 0 && cpY <= 150 && cpY > 0)
                {
                    shadowPath.push(new Array(0, 0));
                    cpX = 0;
                    cpY = 0;
                }
                else
                {
                    shadowPath.push(new Array(endX, endY));
                    cpX = endX;
                    cpY = endY;
                }

                endX = tempEndX;
                endY = tempEndY;
            }

            shadowPath.push(pointCRot);

            /*
                A few debug properties exist here to:
                disable the shadow entirely or show only the outline
            */

            this.ctx.strokeStyle = "#000";

            if (this.debugOptions.debugShadow) {
                // this.ctx.globalAlpha = 0.5;
                this.ctx.strokeStyle = "#F00";
            }

            if (this.debugOptions.enableShadow)
            {
                this.ctx.fillStyle = "#000";
                this.ctx.setLineDash([0]);
                this.ctx.moveTo(shadowPath[0][0], shadowPath[0][1]);
                this.ctx.beginPath();

                for (var ii = 0; ii < shadowPath.length; ii++)
                {
                    this.ctx.lineTo(shadowPath[ii][0], shadowPath[ii][1]);
                }

                this.ctx.stroke();

                if (!this.debugOptions.debugShadow) { this.ctx.fill(); }

                this.ctx.closePath();
            }

            if (this.debugOptions.debugShadow) { this.ctx.globalAlpha = 0.5; }

            // Add the inner edges of the shape
            if (this.debugOptions.enableShape)
            {
                this.ctx.strokeStyle = "#5f5";
                this.ctx.setLineDash([0]);
                this.ctx.beginPath();

                for (var ii = 0; ii < boxCoordinates[i].length; ii++)
                {
                    var key = ii + 1;
                    if (key === boxCoordinates[i].length)
                    {
                        key = 0;
                    }
                    this.ctx.moveTo(boxCoordinates[i][ii][0],boxCoordinates[i][ii][1]);
                    this.ctx.lineTo(boxCoordinates[i][key][0],boxCoordinates[i][key][1])
                }
                this.ctx.stroke();
                this.ctx.closePath();
            }

            if (this.debugOptions.debugShadow) { this.ctx.globalAlpha = 1; }

        }

        this.canDraw = false;

        setTimeout(function(){shadowDraw.canDraw = true;}, 16.666);

    },

    neighborCheck: function(polygon, pointA, pointB)
    {
        //Find the index of each point and then compare
        for (var key = 0; key < polygon.length; key++)
        {
            polyPoint = polygon[key];

            if (pointA[0] === polyPoint[0] && pointA[1] === polyPoint[1])
            {
                var indexA = key;
                break;
            }
        }

        for (var key = 0; key < polygon.length; key++)
        {
            polyPoint = polygon[key];

            if (pointB[0] === polyPoint[0] && pointB[1] === polyPoint[1])
            {
                var indexB = key;
                break;
            }
        }

        var result = Math.abs(indexA - indexB);

        if (result == 1 || result == polygon.length - 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    ascSort: function(stuff)
    {
        /*
            Recursive function to sort numbers in ascending order.
            For the life of me I couldn't get JS to do this natively
            without confusing the length of the numbers.
            Consider: 1,2,3,10,20,100
            JS native: 1, 10, 100, 2, 20, 3
        */
        var biggestNumb = stuff[0];

        for (var i = 0; i < stuff.length; i++)
        {
            if (stuff[i] > biggestNumb)
            {
                biggestNumb = stuff[i];
            }
            else
            {
                continue;
            }
        }

        biggestNumb = stuff.splice(stuff.indexOf(biggestNumb),1);
        if (stuff.length)
        {
            var result = this.ascSort(stuff);
        }
        else
        {
            return biggestNumb;
        }
        
        result.push(biggestNumb[0]);

        return result;
    },
    findSlope: function(points)
    {

        if ((points[2] - points[0]) === 0)
        {
            return "infinite";
        }

        return (points[3] - points[1])/(points[2] - points[0]);

    },

    findIntersect: function(pointA, pointB, polygon, isRayTest, needsEdges)
    {



        var polyLength = polygon.length,
            intersects = new Array(),
            radius = Math.sqrt(
                Math.pow((pointA[0] - pointB[0]),2) + Math.pow((pointA[1] - pointB[1]),2)
            ),
            boundaries = new Array(
                new Array(0, 0),
                new Array(300, 0),
                new Array(300, 150),
                new Array(0, 150)
                );

        if (isRayTest)
        {
            var count = 0,
                lastUpDown = 0;
        }

        intersectLoop:
        for (var i = 0; i < polyLength; i++)
        {
            var key = i,
                polyPointA = polygon[key];

            key++;
            if (key === polyLength)
            {
                key = 0;
            }

            var polyPointB = polygon[key];

            var x_coords = new Array(pointA[0], pointB[0], polyPointA[0], polyPointB[0]);
            var y_coords = new Array(pointA[1], pointB[1], polyPointA[1], polyPointB[1]);

            var topX = (((x_coords[0]*y_coords[1]) - (y_coords[0] * x_coords[1])) * (x_coords[2] - x_coords[3]) - (x_coords[0] - x_coords[1])*((x_coords[2]*y_coords[3]) - (y_coords[2] * x_coords[3])));
            var topY = (((x_coords[0]*y_coords[1]) - (y_coords[0] * x_coords[1])) * (y_coords[2] - y_coords[3]) - (y_coords[0] - y_coords[1])*((x_coords[2]*y_coords[3]) - (y_coords[2] * x_coords[3])));
            var bottomEquation = (((x_coords[0] - x_coords[1])*(y_coords[2] - y_coords[3])) - ((y_coords[0] - y_coords[1])*(x_coords[2] - x_coords[3])));

            intersectX = (Math.round((topX/bottomEquation)*100000))/100000;
            intersectY = (Math.round((topY/bottomEquation)*100000))/100000;

            
            /*
                Generate new coordinates if the intersect is outside the canvas boundaries
            */
            if (intersectX < boundaries[0][0] || intersectX > boundaries[1][0])
            {
                var slope = this.findSlope(new Array(intersectX, intersectY, pointA[0], pointA[1]));

                var yIntercept = intersectY - (slope * intersectX);

                if (intersectX < boundaries[0][0])
                {
                    var newX = boundaries[0][0];
                }
                else
                {
                    var newX = boundaries[1][0];
                }

                var newY = (slope * newX) + yIntercept;

                intersectX = newX;
                intersectY = newY;
            }

            /*
                Check to see if the intersect is between or beyond our
                pair of points. Consider: origin as A, poly point as B,
                and intersect as C. The result should always be
                A---B---C---> or A---C---B--->,
                but never C---A---B--->.
                
                Accomplish this by checking distances between points.
                B to C should always be smaller than A to C **EXCEPT**
                when within the distance of A to B.
            */
            var bcDistance = Math.sqrt(
                    Math.pow((intersectX - pointB[0]),2) + Math.pow((intersectY - pointB[1]),2)
                );

            if (bcDistance > radius)
            {
                var acDistance = Math.sqrt(
                        Math.pow((intersectX - pointA[0]),2) + Math.pow((intersectY - pointA[1]),2)
                    );
                if (bcDistance > acDistance)
                {
                    continue;
                }
            }

            /*
                This next block determins if the intersecting
                point is actually on the polygon and not an
                intersecting point outside of it. It is important
                to remember the formulas above look for intersects
                along the _entire_ line and not just wihin the 
                given shape.
            */


            if ((polyPointA[0] <= intersectX && intersectX <= polyPointB[0]) || (polyPointB[0] <= intersectX && intersectX <= polyPointA[0]))
            {
                // var strokeStyle = "#0f0";
                if ((polyPointA[1] <= intersectY && intersectY <= polyPointB[1]) || (polyPointB[1] <= intersectY && intersectY <= polyPointA[1]))
                {
                    var strokeStyle = "#f00";


                    if (isRayTest)
                    {
                        //During a ray test some collinear midpoints on the left-side of a shape return false.
                        if (intersectX == pointA[0] && intersectY == pointA[1])
                        {
                            return true;
                        }

                        var upDown = polyPointB[1] - polyPointA[1],
                            isSame = false;

                        //Twice in the same direction suggests a point intersect in the same direction
                        if ((lastUpDown > 0 && upDown > 0) || (lastUpDown < 0 && upDown < 0) || upDown === 0)
                        {
                            isSame = true;
                        }

                        if (!isSame)
                        {
                            if (upDown > 0)
                            {
                                count++;
                            }
                            else
                            {
                                count--;
                            }
                        }

                        lastUpDown = upDown;

                    }

                }
                else
                {
                    var strokeStyle = false;
                    lastUpDown = 0;
                }
            }
            else
            {
                var strokeStyle = false;
                lastUpDown = 0;
            }

            if (strokeStyle !== false)
            {
                for (var ii = 0; ii < intersects.length; ii++)
                {
                    if (intersectX == intersects[ii][0] && intersectY == intersects[ii][1])
                    {
                        continue intersectLoop;
                    }
                }
                intersects.push(new Array(intersectX, intersectY, strokeStyle));
            }

        }



        //Add the screen-edge interesect point.
        // intersects.push(findEdges(new Array(pointA[0], pointA[1], pointB[0], pointB[1])));

        //Find the canvas boundary intersects by call interesects again with an off-screen point that we find
        //note: 1000 is a magic number
        var abDistance = Math.sqrt(
                Math.pow((pointA[0] - pointB[0]),2) + Math.pow((pointA[1] - pointB[1]),2)
            );
        var offX = pointB[0] + (pointB[0] - pointA[0]) / abDistance * 1000;
        var offY = pointB[1] + (pointB[1] - pointA[1]) / abDistance * 1000;

        if (needsEdges)
        {
            if (intersects.length === 0 && typeof (intersectX !== "number" || typeof intersectY !== "number"))
            {
                intersects.push(pointB);
            }
            var edgeIntersects = this.findIntersect(pointB, new Array(offX, offY), boundaries, false, false);
            intersects.push(edgeIntersects[0]);
        }

        if (!isRayTest)
        {
            return intersects;
        }
        else
        {
            if (count == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

    },
    updateDebug: function(checked)
    {
        this.debugOptions.debugShadow = checked;
    }
}
