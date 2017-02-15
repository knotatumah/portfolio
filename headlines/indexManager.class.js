function indexManager(arg)
{
    
}

indexManager.prototype = 
{
    main: function()
    {
        indexManager.getTitles();
        
    },
    getTitles: function()
    {
        var lines = document.getElementById("sampleHeadlines").value.split("\n"),
            container = new Array();

        for (var i = 0; i < lines.length; i++)
        {
            var title = lines[i];

            if (title !== "" && title.length <= 175)
            {
                container.push(title);
            }
        }

        container = JSON.stringify(container);

        $.ajax({
            url: "../headlines/patterns.class.php",
            type: "POST",
            data: container,
            success: function(results)
            {
                indexManager.printProducts(results);
            }
        });
    },
 
    printProducts: function(results)
    {

        results = JSON.parse(results);

        var brackets = new Array(new Array(results[0][0], results[0][1])),
            listings = results[0][2];

        for (var i = 0; i < brackets.length; i++)
        {
            var container = document.createElement("div");
            container.className = "content";

            var dataListings = brackets[i][0];
            var dataOrder = brackets[i][1];
            
            var stack = document.getElementById("headlineContent");

            
            
            for (var ii = 0; ii < dataOrder.length; ii++)
            {

                var category = document.createElement("h3");

                category.className = "modernSans";
                category.innerHTML = dataOrder[ii];

                container.appendChild(category);

                var categoryListings = document.createElement("div");

                for (var iii = 0; iii < dataListings[dataOrder[ii]].length; iii++)
                {
                    var listingID = dataListings[dataOrder[ii]][iii];

                    var listing = document.createElement("p");
                    listing.style.margin = "7px";


                    listing.innerHTML = listings[listingID]["link_title"];

                    categoryListings.appendChild(listing);
                }

                container.appendChild(categoryListings);

            }

            stack.appendChild(container);
        }
    }
 
}