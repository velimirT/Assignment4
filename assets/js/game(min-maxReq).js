$(document).ready(function(){
	var keys = "qwertyuiopasdfghjklzxcvbnm";

	game = {
		words : [
			"maradonna",
			"cantona",
			"rooney",
			"ronaldo",
		],
		word : "",
		guessedLetters : [],
		guesses : 15,
		wins : 0,
		fails : 0,
		setWord : function(){
			this.word = this.words[Math.floor((Math.random() * this.words.length))];
			let result = "";
			for (var i = 0; i < this.word.length; i++) {
			  result += '<span data-letter = "'+this.word.charAt(i)+'">_</span>';
			}
			$("#word_wrap").html(result);
		},
		checkLetter : function(letter){
			if(game.guessedLetters.indexOf(letter) < 0){
				game.guessedLetters.push(letter);
				$("#guesses_left").html(game.guesses - game.guessedLetters.length);
				if(game.word.indexOf(letter) > -1){
					$("#word_wrap span[data-letter='"+ letter +"'").each(function(){
						$(this).html(letter).addClass("resolved");
					});
				}else{
					$("#guessed_letters").html($("#guessed_letters").html()+ letter +', ');
				}

				if($("#word_wrap span.resolved").length === game.word.length){
					alert("Win!");
					game.wins += 1;
					console.log(game.words.indexOf(game.word));
					this.restart();
				}

				if(game.guessedLetters.length >= game.guesses){
					alert("Fail!");
					game.fails += 1;
					game.words.slice(game.words.indexOf(game.word), 1);
					this.restart();
				}

			}
		},
		restart : function(){
			if(game.words.length > 1){
				$("#word_wrap").html("");
				game.guessedLetters = [];
				$("#guessed_letters").html("");
				$("#guesses_left").html(game.guesses);
				$("#results .wins").html(game.wins);
				$("#results .fails").html(game.fails);
				game.words.splice(game.words.indexOf(game.word), 1);
				game.setWord();
			}else{
				alert("There are no more game words! Press CTR + R to restart the game!");
				window.removeEventListener('keydown', keyDownHandler)
			}
		},
	};

	window.addEventListener('keydown', keyDownHandler = (event) => {
	    var key = event.key; // "a", "1", "Shift", etc.
	    if(keys.indexOf(key) > -1){
			game.checkLetter(key);
		}
	});

	
	game.setWord();

});