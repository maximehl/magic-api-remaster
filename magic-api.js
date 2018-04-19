var suggestions = [
    ["Artifact", "Creature", "Enchantment", "Instant", "Land", "Phenomenon", "Plane",
        "Planeswalker", "Scheme", "Sorcery"], //Card Types
    [
        ["url", "https://api.scryfall.com/catalog/artifact-types"], //Artifact Subtypes
        ["url", "https://api.scryfall.com/catalog/creature-types"], //Creature Subtypes
        ["url", "https://api.scryfall.com/catalog/enchantment-types"],
        ["url", "https://api.scryfall.com/catalog/spell-types"], //Instant Subtypes
        ["url", "https://api.scryfall.com/catalog/land-types"], //Land Subtypes
        [], //Phenomenon subtypes
        ["Alara", "Arkhos", "Azgol", "Belenon", "Bolas's Meditation Realm", "Dominaria",
            "Equilor", "Ergamon", "Fabacin", "Innistrad", "Iquatana", "Ir", "Kaldheim",
            "Kamigawa", "Karsus", "Kephalai", "Kinshala", "Kolbahan", "Kyneth", "Lorwyn",
            "Luvion", "Mercadia", "Mirrodin", "Moag", "Mongseng", "Muraganda", "New Phyrexia",
            "Phyrexia", "Pyrulea", "Rabiah", "Rath", "Ravnica", "Regatha", "Segovia",
            "Serra's Realm", "Shadowmoor", "Shandalar", "Ulgrotha", "Valla", "Vryn", "Wildfire",
            "Xerex", "Zendikar"], //plane subtypes
        ["url", "https://api.scryfall.com/catalog/planeswalker-types"], //Planeswalker Subtypes
        [], //Scheme subtypes
        ["Arcane"] //Sorcery Subtypes
    ], //Card Subtypes: Changes Based On Card Type
    ["Basic", "Legendary", "Ongoing", "Snow", "World"], //Card Supertypes
    [], //Name: "https://api.scryfall.com/cards/autocomplete?q=" + $("#data3").val()
    ["Absorb", "Affinity", "Aftermath", "Amplify", "Annihilator", "Attach", "Aura swap",
        "Banding", "Bands with other", "Battalion", "Battle cry", "Bestow", "Bloodrush",
        "Bloodthirst", "Bolster", "Bury", "Bushido", "Buyback", "Cascade", "Champion",
        "Changeling", "Channel", "Chroma", "Cipher", "Clash", "Conspire", "Convoke",
        "Counter", "Crew", "Cumulative upkeep", "Cycling", "Dash", "Deathtouch", "Defender",
        "Delve", "Detain", "Devour", "Domain", "Double strike", "Dredge", "Echo", "Embalm",
        "Enchant", "Entwine", "Epic", "Equip", "Evoke", "Evolve", "Exalted", "Exert", "Exile",
        "Exploit", "Extort", "Fabricate", "Fading", "Fateful hour", "Fateseal", "Fear",
        "Ferocious", "Fight", "First strike", "Flanking", "Flash", "Flashback", "Flip",
        "Flying", "Forecast", "Fortify", "Frenzy", "Graft", "Grandeur", "Gravestorm", "Haste",
        "Haunt", "Hellbent", "Heroic", "Hexproof", "Hideaway", "Horsemanship", "Imprint",
        "Indestructible", "Infect", "Intimidate", "Join forces", "Kicker", "Kinship",
        "Landfall", "Landhome", "Landwalk", "Level up", "Lifelink",
        "Living weapon", "Madness", "Manifest", "Meld", "Menace", "Metalcraft", "Miracle",
        "Modular", "Monstrosity", "Morbid", "Morph", "Multikicker", "Ninjutsu", "Offering",
        "Overload", "Persist", "Phasing", "Phasing", "Poisonous", "Populate", "Proliferate",
        "Protection", "Provoke", "Prowess", "Prowl", "Radiance", "Raid", "Rally", "Rampage",
        "Reach", "Rebound", "Recover", "Regenerate", "Regenerate", "Reinforce", "Renown",
        "Replicate", "Retrace", "Ripple", "Sacrifice", "Scavenge", "Scry", "Shadow",
        "Shroud", "Soulbond", "Soulshift", "Splice", "Split second", "Storm", "Sunburst",
        "Suspend", "Sweep", "Tap/Untap", "Threshold", "Totem armor", "Trample",
        "Transfigure", "Transform", "Transmute", "Typecycling", "Undying", "Unearth",
        "Unleash", "Vanishing", "Vigilance", "Wither"], //Rules Text
    [], //Set (Three Letter Code)
    [/*"common", "uncommon", "rare", "mythic"*/], //Rarity
    [/*"white", "blue", "black", "red", "green"*/], //Color(s)
    [], //Multicolor: True Or False, No Suggestions
    [/*"Commander", "Legacy", "Modern", "Standard", "Vintage"*/], //Format
    [] //Legality
];

$(document).ready(function(){
    $(".collapsible").each(function(){
        addCollapsibleTriggers($(this));
    });
    buildSetMenu();
    $("input, select").on("click", function(){
        event.stopPropagation();
    });
    $("#navBar").on("click", function(){
        event.stopPropagation();
    });
    $("input, select").on("keypress", function(){
        if(event.keyCode===13){
            searchButtonClicked();
        }
    });
});

function addCollapsibleTriggers(objectObject){
    objectObject.css("height", objectObject.children().first().outerHeight(true));
    if(objectObject.hasClass("menu")){
        objectObject.on("click", function(){
            $(this).toggleClass("shown");
            $(this).toggleClass("notShown");
            if($(this).hasClass("shown")){
                $(this).css("height", getHeightNeeded($(this)));
            }else{
                $(this).css("height", $(this).children().first().outerHeight(true));
            }
        });
    }else{
        objectObject.on("mouseenter", function(){
            $(this).css("height", getHeightNeeded($(this)));
            var parentObjects = $(this).parents(".collapsible");
            if(parentObjects.length>0){
                parentObjects.css("height", getHeightNeeded(parentObjects));
            }
        });
        objectObject.on("mouseleave", function(){
            $(this).css("height", $(this).children().first().outerHeight(true));
            var parentObjects = $(this).parents(".collapsible");
            if(parentObjects.length>0){
                parentObjects.css("height", getHeightNeeded(parentObjects));
            }
        });
    }
}

function getHeightNeeded(objectObject){
    var clone = $(objectObject).clone().css("height", "auto").appendTo("body");
    var heightNeeded = clone.height();
    clone.remove();
    return heightNeeded;
}

function buildSetMenu(){
    var imageLinks = [[1, "-icon.png"], [3, "_SET_SYMBOL.png"], [1, "_SYMBOL_0.png"], [1, "_SET_SYMBOL_12.png"],
        [2, "_SYMBOL.png"], [1, "_ExpansionSymbol.png"], [6, "_SetSymbol.png"], [61, "_SetIcon.png"], [1, "TEM_SetIcon.png"],
        [10, "_SetIcon.png"], [1, "LED_SetIcon.png"], [2, "_SetIcon.png"], [1, false],
        [1, "_SetIcon.png"], [2, false]];
    var threeLetterCodes = ["xln", "HOU", "AKH", "AER", "KLD", "EMN", "SOI", "OGW", "BFZ", "ORI", "DTK", "FRF",
        "KTK", "M15", "JOU", "BNG", "THS", "M14", "DGM", "GTC", "RTR", "M13", "AVR", "DKA",
        "ISD", "M12", "NPH", "MBS", "SOM", "M11", "ROE", "WWK", "ZEN", "M10", "ARB", "CON",
        "ALA", "EVE", "SHM", "MOR", "LRW", "10E", "FUT", "PLC", "TSP", "CSP", "DIS", "GPT",
        "RAV", "9ED", "SOK", "BOK", "CHK", "5DN", "DST", "MRD", "8ED", "SCG", "LGN", "ONS",
        "JUD", "TOR", "ODY", "APC", "7ED", "PLS", "INV", "PCY", "NEM", "MMQ", "UDS", "6ED",
        "ULG", "USG", "EXO", "STH", "TMP", "WTH", "5ED", "VIS", "MIR", "ALL", "HML", "ICE",
        "4ED", "FEM", "DRK", "LEG", "3ED", "ATQ", "2ED", "ARN", "LEB", "LEA"];
    var imageCodes = [];
    var setNames = ["Ixalan", "Hour of Devastation", "Amonkhet", "Aether Revolt", "Kaladesh",
        "Eldritch Moon", "Shadows over Innistrad", "Oath of the Gatewatch",
        "Battle for Zendikar", "Magic Origins", "Dragons of Tarkir", "Fate Reforged",
        "Khans of Tarkir", "Magic 2015", "Journey into Nyx", "Born of the Gods",
        "Theros", "Magic 2014", "Dragon's Maze", "Gatecrash", "Return to Ravnica",
        "Magic 2013", "Avacyn Restored", "Dark Ascension", "Innistrad", "Magic 2012",
        "New Phyrexia", "Mirrodin Besieged", "Scars of Mirrodin", "Magic 2011",
        "Rise of the Eldrazi", "Worldwake", "Zendikar", "Magic 2010", "Alara Reborn",
        "Conflux", "Shards of Alara", "Eventide", "Shadowmoor", "Morningtide", "Lorwyn",
        "10th Edition", "Future Sight", "Planar Chaos", "Time Spiral", "Coldsnap",
        "Dissension", "Guildpact", "Ravnica: City of Guilds", "9th Edition",
        "Saviors of Kamigawa", "Betrayers of Kamigawa", "Champions of Kamigawa",
        "Fifth Dawn", "Darksteel", "Mirrodin", "8th Edition", "Scourge", "Legions",
        "Onslaught", "Judgment", "Torment", "Odyssey", "Apocalypse", "7th Edition",
        "Planeshift", "Invasion", "Prophecy", "Nemesis", "Mercadian Masques",
        "Urza's Destiny", "6th Edition", "Urza's Legacy", "Urza's Saga", "Exodus",
        "Stronghold", "Tempest", "Weatherlight", "5th Edition", "Visions", "Mirage",
        "Alliances", "Homelands", "Ice Age", "4th Edition", "Fallen Empires", "The Dark",
        "Legends", "Revised Edition", "Antiquities", "Unlimited Edition",
        "Arabian Nights", "Beta", "Alpha"];
    var setsPerBlock = [1, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 4, 1, 3, 1, 3, 1, 3, 3, 1, 3, 3, 1,
        1, 2, 3, 1, 3, 3, 1, 3, 1, 1, 9];
    var blockNames = ["Ixalan Block", "Amonkhet Block", "Kaladesh Block", "Shadows over Innistrad Block",
        "Battle For Zendikar Block", "Magic Origins", "Khans of Tarkir Block", "Core Set",
        "Theros Block", "Core Set", "Return to Ravnica Block", "Core Set", "Innistrad Block",
        "Core Set", "Scars of Mirrodin Block", "Core Set", "Zendikar Block", "Core Set",
        "Shards of Alara Block", "Lorwyn-Shadowmoor Block", "Core Set", "Time Spiral Block",
        "Ice Age Block", "Ravnica Block", "Core Set", "Kamigawa Block", "Mirrodin Block",
        "Core Set", "Onslaught Block", "Odyssey Block", "Invasion Block", "Core Set",
        "Invasion Block", "Masques Block", "Core Set", "Urza Block", "Tempest Block",
        "Core Set", "Mirage Block", "Ice Age Block", "Homelands Block", "Ice Age Block"];

    //build an array of image objects for all the sets
    var loc = 0;
    var l1;
    var l2;
    for(l1 in imageLinks){
        for(l2 = 0; l2<imageLinks[l1][0]; l2++){
            imageCodes[loc] = "";
            if(imageLinks[l1][1]!==false){
                if(imageLinks[l1][1][0]!=="_"&&imageLinks[l1][1][0]!=="-"){
                    imageCodes[loc] = "<img src='https://magic.wizards.com/sites/mtg/files/images/featured/" +
                        imageLinks[l1][1] + "' class='iconImage'>";
                }else{
                    imageCodes[loc] = "<img src='https://magic.wizards.com/sites/mtg/files/images/featured/" +
                        threeLetterCodes[loc] + imageLinks[l1][1] + "' class='iconImage'>";
                }
            }
            loc++;
        }
    }
    var pageObject;
    loc = 0;
    for(l1 in setsPerBlock){
        pageObject = $("<div id='block" + l1 + "' class='collapsible block canClick collapsible'><p>" +
            blockNames[l1] + "</p><br></div>");
        $("#blocksContainer").append(pageObject);
        addCollapsibleTriggers(pageObject);
        for(l2 = 0; l2<setsPerBlock[l1]; l2++){
            pageObject = $("<div class='set canClick' data-letter-code='" + threeLetterCodes[loc] + "'>" +
                imageCodes[loc] + " " + setNames[loc] + "</div>");
            $('#block' + l1).append(pageObject);
            loc++;
        }
    }
    $(".canClick").filter(".block, .set").click(function(){
        event.stopPropagation();
        $(this).toggleClass("selected");
        if($(this).hasClass("block")){
            var setChildren = $(this).find(".set");
            if($(this).hasClass("selected")){
                setChildren.addClass("selected");
            }else{
                setChildren.removeClass("selected");
            }
        }else{
            if($(this).parent().find(".set").filter(".selected").length>0){
                $(this).parent().addClass("selected");
            }else{
                $(this).parent().removeClass("selected");
            }
        }
    });
}

function checkCreature(){
    if($("#data0").val()==="Creature"){
        $("#creatureOptions").show();
    }else{
        $("#creatureOptions").hide();

    }
}

function generateSuggestions(suggestionListIndex){
    var suggestionList = [];
    if(suggestionListIndex===1){
        var cardType = $("#data0").val();
        if(typeof cardType!== "undefined"){
            var cardSubtypeNum = suggestions[0].indexOf(cardType);
            if(cardSubtypeNum>-1){
                suggestionList = suggestions[1][cardSubtypeNum];
            }
        }
    }else if(suggestionListIndex===3){
        suggestionList = ["url", "https://api.scryfall.com/cards/autocomplete?q=" + $("#data3").val()];
    }else{
        suggestionList = suggestions[suggestionListIndex];
    }
    if(suggestionList.length>0){
        if(suggestionList[0]==="url"){
            grabJSON("suggest", suggestionList[1]);
            return;
        }
    }
    var returnList = "";
    for(var i in suggestionList){
        returnList+="<option value='" + suggestionList[i] + "'>"
    }
    $("#suggestions").html(returnList);
}

var newSearchTerms = ["Sort order:", "Name:", "Color(s):", "Type(s):", "Subtype(s):", "Supertype(s):",
    "Rules text:", "Converted Mana Cost:", "Power/Toughness:",
    "Card layout:", "Rarity:", "Set code(s):", "Play format:"];
var searchTerms = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]];
//tagHere: add event listener for enter key on text input boxes: empty out the text input, and add a search term
//each text input will need a data-term-num that you can call to determine which term it is
//tagHere: add OR/AND/NOT selector for all terms
function generateSearchTerm(term){
    searchTerms[term][0]++;
    searchTerms[term][searchTerms[term].length] = "";
    //things
}
function renderSearchTerms(){
    //things
}


var urlSearchTerms = ["type", "subtype", "supertype", "name", "oracle", "set",
    "rarity", "color", "multicolor", "format", "status"];
var searchPage = 0;
var searchURL = 'https://api.deckbrew.com/mtg/cards';
function searchButtonClicked(){
    toggleCardsDisplay("hide");
    searchURL = 'https://api.deckbrew.com/mtg/cards';
    //https://api.scryfall.com/cards
    //if there's one or more search term, https://api.scryfall.com/cards/search?
    var dataObject;
    var dataReps;
    for(var i = 0; i<11; i++){
        dataObject = $("#data" + i);
        dataReps = dataObject.data("num-options");
        var n;
        if(dataReps==="many"){
            dataObject = $("#data" + i).val();
            var searchTerm = "";
            for(n = 0; n<dataObject.length; n++){
                if(dataObject[n]===" "){
                    searchTerm+="+";
                }else if(dataObject[n]===","){
                    addURLCueMark(i);
                    searchURL+=searchTerm.toLowerCase();
                    searchTerm = "";
                    if(dataObject[n+1]===" "){
                        n++;
                    }
                }else{
                    searchTerm+=dataObject[n];
                }
            }
            if(searchTerm!==""){
                addURLCueMark(i);
                searchURL+=searchTerm.toLowerCase();
            }
        }else if(dataReps==="sets"){
            dataObject = dataObject.find(".set").filter(".selected");
            dataObject.each(function(){
                addURLCueMark(i);
                searchURL+=$(this).data("letter-code").toLowerCase();
            });
        }else if(dataReps=="1"){
            dataObject = dataObject.val();
            if(dataObject!==""){ //tagHere: if this doesn't work, try dataObject.length>0
                addURLCueMark(i);
                searchURL+=dataObject;
            }
        }else{
            dataObject.find("input:checked").each(function(){
                addURLCueMark(i);
                searchURL+=$(this).val();
            });
        }
    }
    searchPage = 0;
    //searchURL+="&page=0";
    grabJSON("build", searchURL);
}

function addURLCueMark(iValue){
    if(searchURL==='https://api.deckbrew.com/mtg/cards'){
        searchURL += "?";
    }else{
        searchURL += "&";
    }
    searchURL+=urlSearchTerms[iValue].toLowerCase() + "=";
}

function clearSearch(){
    var dataReps;
    var dataObject;
    for(var i = 0; i<11; i++){
        dataObject = $("#data" + i);
        dataReps = dataObject.data("num-options");
        if(dataReps==="many" || dataReps=="1"){
            dataObject.val("");
        }else if(dataReps==="sets"){
            dataObject.find(".selected").removeClass("selected");
        }else {
            dataObject.find("input:checked").prop("checked", false);
        }
    }
    //tagHere: this might cause an error?
    toggleCardsDisplay("hide");
    $("#navBar").hide();
    $("#resultsContainerCards").empty().html("<br>No results yet!");
}

function toggleCardsDisplay(whichWay){
    //waitForImages();
    var searchResults = $("#searchResults");
    if(whichWay==="hide"){
        searchResults.removeClass("shown");
        searchResults.addClass("notShown");
    }else if(whichWay==="show"){
        searchResults.addClass("shown");
        searchResults.removeClass("notShown");
    }else{
        searchResults.toggleClass("shown");
        searchResults.toggleClass("notShown");
    }
    if(searchResults.hasClass("shown")){
        searchResults.css("height", getHeightNeeded(searchResults));
    }else{
        searchResults.css("height", searchResults.children().first().outerHeight(true));
    }
}

function changePage(newPage){
    //searchPage = newPageNum;
    //var oldPageDigits = searchPage.toString().length;
    toggleCardsDisplay("hide");
    var oldPage = searchPage;
    if(newPage==="++"){
        searchPage++;
    }else{
        searchPage--;
    }

    if(oldPage===0){
        if(searchURL==='https://api.deckbrew.com/mtg/cards'){
            searchURL += "?page=";
        }else{
            searchURL += "&page=";
        }
    }else{
        searchURL = searchURL.slice(0, searchURL.length-1);
    }

    searchURL+=searchPage;
    grabJSON("build", searchURL);
}

function grabJSON(action, URL){
    //console.log(searchURL);
    $.ajax({
        url: URL,
        type: 'GET',
        //crossDomain: true,
        dataType: 'json',
        success: function(result){
            //console.log(result);
            if(action==="build"){
                buildResults(result);
            }else if(action==="suggest"){
                var suggestionList = result.data;
                var returnList = "";
                for(var i in suggestionList){
                    returnList+="<option value='" + suggestionList[i] + "'>"
                }
                $("#suggestions").html(returnList);
            }
            return result;
        },
        error: function(){
            alert('Uh oh! There appears to be an error with your entry for Type or Supertype. ' +
                'Please try different search term.');
        }
    });
}

var unloadedImages = 0;
function buildResults(jsonData){
    $("#currentPageNumber").html(searchPage+1);
    $("#navBar").show();
    if(searchPage===0){
        $("#prevPage").css("visibility", "hidden")
    }else{
        $("#prevPage").css("visibility", "visible");
    }
    if(jsonData.length<100){
        $("#nextPage").css("visibility", "hidden");
    }else{
        $("#nextPage").css("visibility", "visible");
    }
    var appendLoc = $("#resultsContainerCards");
    appendLoc.empty();
    unloadedImages=0;
    if(jsonData.length>0){
        for(var i in jsonData){
            appendLoc.append(buildCard(jsonData[i]));
        }
        $("img").each(function(){
            $(this).on("load", function(){
                unloadedImages--;
                if(unloadedImages===0){
                    toggleCardsDisplay("show");
                }
            });
        });
    }else{
        $("#navBar").hide();
        if(searchPage===0){
            appendLoc.append($("<div>Uh oh! This search did not return any results.</div>"));
        }else{
            appendLoc.append($("<div>Uh oh! This search page did not return any results.</div>"));
        }
        toggleCardsDisplay("show");
    }
    $(".card").on("click", function(){
        event.stopPropagation();
    });
}

function buildCard(cardData){
    var returnObject = "";
    var stats = [cardData.name, cardData.types, cardData.subtypes, cardData.colors,
        cardData.cmc, cardData.cost, cardData.text];
    var statLabels = ["data-card-name=", "data-card-types=", "data-card-subtypes=",
        "data-card-colors=", "data-card-cmc=", "data-card-cost=", "data-card-text="];
    var i;
    var baseStats="";
    for(i=0; i<stats.length; i++){
        if(isNaN(stats[i])===false){
            baseStats+=" " + statLabels[i] + "'" + stats[i] + "'";
        }
    }
    var upperStatLabels = ["data-card-rarity=", "data-card-multiverse-id=", "data-card-flavor="];
    /*var upperStats = [cardData.editions[0].rarity, cardData.editions[0].multiverse_id,
          cardData.editions[0].flavor];
    if(upperStats[1]!="0"){
       returnObject+="<div class='card' " + baseStats;
       for(i=0; i<upperStats.length; i++){
          if(isNaN(upperStats[i])===false){
             returnObject+=" " + upperStatLabels[i] + "'" + upperStats[i] + "'";
          }
       }
       returnObject+="><img class='cardImage' src='" + cardData.editions[0].image_url + "'></div>";
         unloadedImages++;
    }*/
    var upperStats;
    for(i=0; i<cardData.editions.length; i++){
        upperStats = [cardData.editions[i].rarity, cardData.editions[i].multiverse_id,
            cardData.editions[i].flavor];
        if(upperStats[1]!="0"){
            returnObject+="<div class='card' " + baseStats;
            for(var n=0; n<upperStats.length; n++){
                if(isNaN(upperStats[n])===false){
                    returnObject+=" " + upperStatLabels[n] + "'" + upperStats[n] + "'";
                }
            }
            returnObject+="><img class='cardImage' src='" + cardData.editions[i].image_url + "'></div>";
            unloadedImages++;
            break;
        }
    }
    return $(returnObject);
}