var HANGMANJS = {
	words: ["axe", "enchantress", "windranger", "outworld devourer", "undying", "mirana", "rubick"],
	chosenWord: "",
	cWordDisplay: [],
	guessed: [],
	lives: 10,
	docAttemptDisplay: document.getElementById("attempt"),
	docPending: document.getElementById("currentPending"),
	initialize: function(){
		console.log("initialize entered");
		let temp = this.words;
		this.chosenWord = this.words[Math.floor((Math.random() * temp.length))];
		for(let i = 0; i < this.chosenWord.length;i++){
			if(this.chosenWord[i] === " "){
				this.cWordDisplay.push(" ");
			}else{
				this.cWordDisplay.push("__");
			}
		}
		this.docAttemptDisplay.innerHTML = this.cWordDisplay;

	},
	readProperty: function() {
		console.log("readProperty entered");
		console.log("Word list: " + this.words);
		console.log("chosenWord: " + this.chosenWord);
		console.log("words length: " + this.words.length);
		console.log("Lives: " + this.lives);
		console.log("Display: " + this.cWordDisplay);
		console.log("Guessed: " + this.guessed);
	},
	checkEntry: function (guess){
		// console.log("checkEntry entered");
		guess = guess.toLowerCase();
		let hits = [];
		
		if(this.guessed.indexOf(guess) > -1){
			console.log("Already guessed!");
		} else { 
			for ( let i = 0; i < this.chosenWord.length; i++){
				if (this.chosenWord[i] === guess) hits.push(i);
			}
			if(hits.length > 0){
				// console.log("Got " + hits.length + " hits!");
				// console.log("checkEntry hits:" + hits);
				this.updateDisplay(guess, hits);
				this.guessed.push(guess);
			} else { 
				console.log("No hits :[");
				this.guessed.push(guess);
			}
		}
		console.log("checkEntry: Hits: " + hits.length);
	},
	updateDisplay: function (hit, indices){
		console.log("updateDisplay entered");
		let temp = indices.length;
		for (let i = 0; i < temp; i++){
			this.cWordDisplay[indices[i]] = hit;
		}

		this.docAttemptDisplay.innerHTML = this.cWordDisplay;
		console.log("updateDisplay: updated: " + this.cWordDisplay);
	},
	pendingDisplay: function (event){
		if (event.key === "Enter" || event.key === " "){
			HANGMANJS.checkEntry(HANGMANJS.docPending.innerHTML);
		} else {
			HANGMANJS.docPending.innerHTML = event.key;
			// console.log("doc: " + document.getElementById("currentPending").innerHTML);
			// console.log("obj: " + HANGMANJS.docPending);
		}
	}
};

HANGMANJS.initialize();
document.onkeyup = HANGMANJS.pendingDisplay;
// HANGMANJS.readProperty();
// HANGMANJS.checkEntry();
// HANGMANJS.readProperty();
