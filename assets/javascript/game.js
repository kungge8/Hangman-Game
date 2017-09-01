var HANGMANJS = {
	words: ["Abaddon", "Alchemist", "Ancient Apparition", "Arc Warden",
					"Axe", "Anti-Mage", "Bane", "Batrider", "Beastmaster", "Bloodseeker", "Bounty Hunter",
					"Brewmaster", "Bristleback", "Broodmother", "Centaur Warrunner", "Chaos Knight", "Chen",
					"Clinkz", "Clockwerk", "Crystal Maiden", "Dark Seer", "Dazzle", "Death Prophet", "Disruptor",
					"Doom", "Dragon Knight", "Drow Ranger", "Earth Spirit", "Earthshaker", "Elder Titan",
					"Ember Spirit", "Enchantress", "Enigma", "Faceless Void", "Gyrocopter", "Huskar", "Invoker", "Io",
					"Jakiro", "Juggernaut", "Keeper of the Light", "Kunkka", "Legion Commander", "Leshrac", "Lich",
					"Lifestealer", "Luna", "Lina", "Lion", "Lone Druid", "Lycan", "Magnus", "Medusa", "Meepo",
					"Mirana", "Monkey King", "Morphling", "Naga Siren", "Nature's Prophet", "Necrophos", "Night Stalker",
					"Nyx Assassin", "Ogre Magi", "Omniknight", "Oracle", "Outworld Devourer", "Phantom Assassin", "Phantom Lancer",
					"Phoenix", "Puck", "Pudge", "Queen of Pain", "Razor", "Rikimaru", "Rubick", "Sand King", "Shadow Demon",
					"Shadow Fiend", "Shadow Shaman", "Silencer", "Skywrath Mage", "Slardar", "Slark",
					"Sniper", "Mercurial Specter", "Spirit Breaker", "Storm Spirit", "Sven", "Techies",
					"Templar Assassin", "Terrorblade", "Tidehunter", "Timbersaw", "Tinker", "Tiny",
					"Treant Protector", "Troll Warlord", "Tusk", "Underlord", "Undying", "Ursa", "Vengeful Spirit",
					"Venomancer", "Viper", "Visage", "Warlock", "Weaver", "Windranger", "Winter Wyvern",
					"Witch Doctor", "Zeus"],
	chosenWord: "",
	cWordDisplay: [],
	guessed: [],
	lives: 0,
	wins: 0,
	losses: 0,
	correct: new Audio("assets/images/correct.mp3"),
	wrong: new Audio("assets/images/wrong.mp3"),
	docLivesDisplay: document.getElementById("counter"),
	docAttemptDisplay: document.getElementById("attempt"),
	docGuesses: document.getElementById("guesses"),
	docPending: document.getElementById("currentPending"),
	docHeroIcon: document.getElementById("portrait"),
	docPlayButton: document.getElementById("playbutton"),
	docWins: document.getElementById("wins"),
	initialize: function(){
		//Select a word from wordbank, initialize array display to blanks, etc
		console.log("initialize entered");
		document.onkeyup = HANGMANJS.pendingDisplay;
		console.log(HANGMANJS);
		let temp = HANGMANJS.words;
		HANGMANJS.chosenWord = HANGMANJS.words[Math.floor((Math.random() * temp.length))];
		HANGMANJS.cWordDisplay = []; //empty correct letters display array
		HANGMANJS.guessed = []; //blank out guessed letters array
		for(let i = 0; i < HANGMANJS.chosenWord.length;i++){ //initialize correct letters display array
			if(HANGMANJS.chosenWord[i] === " "){
				HANGMANJS.cWordDisplay.push(" ");
			}else if(HANGMANJS.chosenWord[i] === "-"){
				HANGMANJS.cWordDisplay.push("-");
			}else if(HANGMANJS.chosenWord[i] === "'"){
				HANGMANJS.cWordDisplay.push("'");
			}else{
				HANGMANJS.cWordDisplay.push("_");
			}
			// console.log(HANGMANJS.cWordDisplay);
		}

		//initialize displays
		HANGMANJS.docPlayButton.style.display = 'none';
		HANGMANJS.docHeroIcon.src = "assets/images/placehold.gif";
		HANGMANJS.docAttemptDisplay.innerHTML = HANGMANJS.cWordDisplay.toString().replace(/,/g,"&nbsp;");
		HANGMANJS.docGuesses.innerHTML = "Guessed: " + HANGMANJS.guessed.toString().replace(/,/g,"&nbsp;");
		HANGMANJS.docPending.innerHTML = "&nbsp;";
		HANGMANJS.lives = 7;
		HANGMANJS.docLivesDisplay.innerHTML = "Remaining Lives: " + String(HANGMANJS.lives);
		console.log("initialize ended");
	},
	readProperty: function() {
		//was used for testing
		console.log("readProperty entered");
		console.log("Word list: " + this.words);
		console.log("chosenWord: " + this.chosenWord);
		console.log("words length: " + this.words.length);
		console.log("Lives: " + this.lives);
		console.log("Display: " + this.cWordDisplay);
		console.log("Guessed: " + this.guessed);
	},
	checkEntry: function (guess){
		//processes players selected letter
		// console.log("checkEntry entered");	
		guess = guess.toLowerCase();
		let hits = [];
		
		if(this.guessed.indexOf(guess) > -1){
			console.log("Already guessed!");
		} else { 
			for ( let i = 0; i < this.chosenWord.length; i++){ //checking for any hits
				if (this.chosenWord[i].toLowerCase() === guess) hits.push(i);
			}
			if(hits.length > 0){ //if there are hits, update display with hits and update guessed array, if not update guessed and decrement life
				// console.log("Got " + hits.length + " hits!");
				// console.log("checkEntry hits:" + hits);
				this.updateDisplay(guess, hits);
				this.guessed.push(guess);
				this.correct.play();
				this.docGuesses.innerHTML = "Guessed: " + this.guessed.toString().replace(/,/g,"&nbsp;");
			} else { 
				console.log("No hits :[");
				this.wrong.play();
				this.guessed.push(guess);
				this.docGuesses.innerHTML = "Guessed: " + this.guessed.toString().replace(/,/g,"&nbsp;");
				this.lives--;
				if(this.lives > 0){
					this.docLivesDisplay.innerHTML = "Remaining Lives: " + String(this.lives);
				} else {
					this.gameOver(false);
				}			
			}
		}
		console.log("checkEntry: Hits: " + hits.length);
	},
	updateDisplay: function (hit, indices){
		//console.log("updateDisplay entered");
		let temp = indices.length;
		for (let i = 0; i < temp; i++){
			this.cWordDisplay[indices[i]] = hit;
		}

		// console.log("updateDisplay: toString " + this.cWordDisplay.toString());
		// console.log("updateDisplay: toString " + this.cWordDisplay.toString().replace(/,/g," "));

		this.docAttemptDisplay.innerHTML = this.cWordDisplay.toString().replace(/,/g,"&nbsp;");
		console.log(this.docAttemptDisplay.innerHTML);

		if(this.cWordDisplay.indexOf("_") === -1){
			this.gameOver(true);
		}
		//console.log("updateDisplay: updated: " + this.cWordDisplay);
	},
	pendingDisplay: function (event){
		//updates display with currently selected letter
		if (event.key === "Enter" || event.key === " "){
			HANGMANJS.checkEntry(HANGMANJS.docPending.innerHTML);
		} else {
			if (HANGMANJS.letterCheck(event.key))
			{
				HANGMANJS.docPending.innerHTML = event.key;
			}
		}
	},
	gameOver: function (status){
		//display success/failure and do things
		if (status) {
			this.docHeroIcon.src = "assets/images/" + this.chosenWord.replace(/ /g, "_") + "_icon.png";
			let blurb = new Audio("assets/images/blurbs/" + this.chosenWord.replace(/ /g, "_") + "_blurb.mp3");
			blurb.play();
			this.docLivesDisplay.innerHTML = "You got it!";
			this.docPlayButton.style.display = 'block';
			this.wins++;
			this.docWins.innerHTML = "Wins: " + this.wins + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Losses: " + this.losses;
			document.onkeyup = null;
		} else {
			this.docLivesDisplay.innerHTML = "It's a disastah!";
			this.losses++;
			this.docWins.innerHTML = "Wins: " + this.wins + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Losses: " + this.losses;
			this.docPlayButton.style.display = 'block';
			document.onkeyup = null;
		}
	},
	letterCheck: function(input){
		//used to filter out non alphabet inputs
		var letters = /^[A-Za-z]+$/;
		//console.log("letterCheck entered");
   if(input.match(letters) && input.length<2)  
     {  
      return true;  
     }  
   else  
     {   
     return false;  
     }  
	}
};

HANGMANJS.initialize();
HANGMANJS.docPlayButton.addEventListener("click", HANGMANJS.initialize);
//HANGMANJS.readProperty();
