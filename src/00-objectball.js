let gameObject = () => {
    return ( 
    {
        home: {
            teamName: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: {
                "Alan Anderson": {
                    "number":0,
                    "shoe": 16,
                    "points": 22,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 3,
                    "blocks": 1,
                    "slamDunks":1,
                },
                "Reggie Evans":{
                    "number": 30,
                    "shoe": 14,
                    "points": 12,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 12,
                    "blocks": 12,
                    "slamDunks": 7,
                },
                "Brook Lopez":{
                    "number": 11,
                    "shoe": 17,
                    "points": 17,
                    "rebounds": 19,
                    "assists":10,
                    "steals": 3,
                    "blocks": 1,
                    "slamDunks": 15,
                },
                "Mason Plumlee":{
                    "number": 1,
                    "shoe": 19,
                    "points": 26,
                    "rebounds": 12,
                    "assists": 6,
                    "steals": 3,
                    "blocks": 8,
                    "slamDunks":5,
                }, 
                "Jason Terry":{
                    "number": 31,
                    "shoe": 15,
                    "points": 19,
                    "rebounds": 2,
                    "assists": 2 ,
                    "steals": 4,
                    "blocks": 11,
                    "slamDunks":1, 
                },
            }, // players 
        }, // home
        away: {
            teamName: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: {
                "Jeff Adrienn": {
                    "number": 4,
                    "shoe":18,
                    "points":10,
                    "rebounds": 1,
                    "assists":1,
                    "steals":2,
                    "blocks": 7,
                    "slamDunks": 2,
                },
                "Bismak Biyombo":{
                    "number": 0,
                    "shoe":16,
                    "points":12,
                    "rebounds":4,
                    "assists":7,
                    "steals":7,
                    "blocks": 15,
                    "slamDunks":10,
                },
                "DeSagna Diop":{
                    "number": 2,
                    "shoe": 14,
                    "points":24,
                    "rebounds":12,
                    "assists":12,
                    "steals":4,
                    "blocks":5,
                    "slamDunks": 5,
                },
                "Ben Gordon":{
                    "number": 8,
                    "shoe":15,
                    "points":33,
                    "rebounds": 3,
                    "assists":2,
                    "steals":1,
                    "blocks": 1,
                    "slamDunks": 0,
                }, 
                "Brendan Haywood":{
                    "number": 33,
                    "shoe": 15,
                    "points": 6,
                    "rebounds": 12,
                    "assists":12,
                    "steals":22,
                    "blocks": 5,
                    "slamDunks": 12,
                },
            }, // players  
        }, // away
    } )
}

let playerStats = (player) => {
    let localGameObject = gameObject();
    let statObject;

    for (let whichTeam in localGameObject) {
        if (statObject === undefined) {
            for (let playerCompare in localGameObject[whichTeam]["players"]) {
                if (playerCompare === player) {
                    // extract the statistics associated with the requested player
                    statObject = localGameObject[whichTeam]["players"][player];
                    break;
                }
            }
        } else {
            break;
        }
    }
    return statObject;


}

let findPlayerAttribute = (player, attribute) => {

    let attributeValue;
    let statObject = playerStats(player);
    // 
    if (statObject != undefined) {
        attributeValue = statObject[attribute]
    }
    return attributeValue;
}
let numPointsScored = (player) => {
    return(findPlayerAttribute(player, "points"))
}

let shoeSize = (player) => {
    return(findPlayerAttribute(player,"shoe"))
}

let jerseyNumber = (player) => {
    return(findPlayerAttribute(player, "number"))
}

let numRebounds = (player) => {
    return(findPlayerAttribute(player, "rebounds"))
}

let numSteals = (player) => {
    return(findPlayerAttribute(player, "steals"))
}

let getTeamAttributes = (whichTeam) => {
    let localGameObject = gameObject();
    let teamAttributes = localGameObject[whichTeam];
    return(teamAttributes);

}



let teamNames = ( ) => {
    let localGameObject = gameObject();

    
    let teamNameArray = [];
    for (let whichTeam in localGameObject) {
        teamNameArray.push(getTeamAttributes(whichTeam).teamName);
    }
    
    return (teamNameArray);
}

let playerNumbers = (desiredTeam) => {
    let jerseyArray = [];
    let localGameObject = gameObject();
    
    for (let whichTeam in localGameObject) {
        
        let localTeamAttributes = getTeamAttributes(whichTeam);
        let localTeamName = localTeamAttributes.teamName;
        if (getTeamAttributes(whichTeam).teamName === desiredTeam) {
            for (let player in localGameObject[whichTeam].players) {
                jerseyArray.push(jerseyNumber(player))
            }
        }
    }
    return(jerseyArray);
}
//
// Note that this returns an array of all the players on either the home or away team.  It does not return
// the combination of all the players of the 2 teams.
//
let listAllTeamPlayers = (whichTeam) => {
    let localGameObject = gameObject();
    let playerArray = [];
    for (let currentPlayer in localGameObject[whichTeam]["players"]) {
        playerArray.push(currentPlayer);
    }
    return(playerArray);

}

//
// This routine returns an array of all the players on both teams.
//
let listAllPlayers = () => {
    let localGameObject = gameObject();
    let playerArray = [];

    for (let whichTeam in localGameObject) {
        
        playerArray = [...playerArray,...listAllTeamPlayers(whichTeam)];
        
    }
    return(playerArray);
}

//
// This routine returns the number of rebounds of the player with the biggest shoe size.
//
let bigShoeRebounds = ( ) => {
    let playerArray = listAllPlayers();
    let largestShoe = 0;
    let playerLargestShoe;

    for (let playerCandidate of playerArray) {
        let currentShoeSize = shoeSize(playerCandidate);
        if (currentShoeSize > largestShoe) {
            largestShoe = currentShoeSize;
            playerLargestShoe = playerCandidate;
        }
    }

    return(numRebounds(playerLargestShoe));

}

//
// This routine returns the name of the player who scored the most points.
//
let mostPointsScored = () => {
    let playerArray = listAllPlayers();
    let mostPoints = 0;
    let playerMostPoints;

    for (let playerCandidate of playerArray) {
        let currentPoints = numPointsScored(playerCandidate);
        if (currentPoints > mostPoints) {
            mostPoints = currentPoints;
            playerMostPoints = playerCandidate;
        }
    }
    return(playerMostPoints);
}

//
// This routine adds up all the scores of the individuals on the "home" team and all the scores of the individuals on the "away" team.  It then returns
// the name of the team that won the game.
//
let winningTeam = () => {
    let awayTeamPlayers = [];
    let homeTeamPlayers = [];
    let awayTeamPoints = 0;
    let homeTeamPoints = 0;

    
    awayTeamPlayers = [...listAllTeamPlayers("away")];
    homeTeamPlayers = [...listAllTeamPlayers("home")];
    

    for (let currentAwayPlayer of awayTeamPlayers ) {
        awayTeamPoints += numPointsScored(currentAwayPlayer);
    }

    for (let currentHomePlayer of homeTeamPlayers ) {
        homeTeamPoints += numPointsScored(currentHomePlayer)
    }

    
    if (homeTeamPoints < awayTeamPoints) {
        return gameObject()["away"]["teamName"];
    } else {
        return gameObject()["home"]["teamName"];
    }
}

let playerWithLongestName = () => {
    let players = listAllPlayers();

    let longestNamePlayer;
    let longestNameLength = 0;

    
    for (let currentPlayer of players) {
        if (currentPlayer.length > longestNameLength) {
            longestNameLength = currentPlayer.length;
            longestNamePlayer = currentPlayer.slice(0);
        }
    }

    
    return(longestNamePlayer);
}

let doesLongNameStealATon = () => {
    let players = listAllPlayers();
    let mostSteals = 0;
    let bestStealer;

    for (let currentPlayer of players) {
        let steals = numSteals(currentPlayer);
        if (steals > mostSteals) {
            mostSteals = steals;
            bestStealer = currentPlayer.slice(0);
        }
    }

    if (bestStealer === playerWithLongestName()) {
        return true;
    } else {
        return false; 
    }
}

// 
let testPoints = numPointsScored("Brendan Haywood");
testPoints = numPointsScored("Mason Plumlee");
testPoints = numPointsScored("Alfred E. Newman");
let testShoe = shoeSize("Alan Anderson");
testShoe = shoeSize("Ben Gordon");
testShoe = shoeSize("Anna Nichole Smith");
let stats = playerStats("Jeff Adrienn")
// 
stats = playerStats("Brendan Haywood")
// 
stats =  playerStats("Dave the DORK!")

let heavyDTNames = teamNames( );

let jerseyArray = playerNumbers("Charlotte Hornets");

jerseyArray = playerNumbers("Brooklyn Nets")

let reboundSound = bigShoeRebounds();

let scoringChamp = mostPointsScored();

let victors = winningTeam();

let spellChamp = playerWithLongestName();

let highlyUnlikely = doesLongNameStealATon();
