$(document).ready(function(){

	var keys = "qwertyuiopasdfghjklzxcvbnm";
	var first = true;
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
		totalGuesses : 0,
		totalGuessed : 0,
		guessedWords: [],
		setWord : function(){
			this.word = this.words[Math.floor((Math.random() * this.words.length))];
			let result = "";

			for (var i = 0; i < this.word.length; i++) {
			  result += '<span data-letter = "'+this.word.charAt(i)+'"></span>';
			}
			
			$("#word_wrap").html(result);
		},
		checkLetter : function(letter){
			if(this.guessedLetters.indexOf(letter) < 0){
				this.totalGuesses += 1;

				if(this.word.indexOf(letter) > -1){
					this.totalGuessed += 1;
					$("#word_wrap span[data-letter='"+ letter +"'").each(function(){
						$(this).html(letter).addClass("resolved");
					});
				}

				this.guessedLetters.push(letter);
				$("#guessed_letters").html($("#guessed_letters").html()+ letter +', ');
				
				if($("#word_wrap span.resolved").length === this.word.length){
					alert("Win!");
					this.wins += 1;
					this.guessedWords.push(this.word);
					console.log(this.words.indexOf(this.word));
					this.restart();
				}

				if(this.guessedLetters.length >= this.guesses){
					alert("Fail!");
					this.fails += 1;
					this.words.slice(this.words.indexOf(this.word), 1);
					this.restart();
				}

				$(".guesses_left").html(this.guesses - this.guessedLetters.length);
			}
		},
		restart : function(){
			if(this.words.length > 1){
				$("#word_wrap").html("");
				this.guessedLetters = [];
				$("#guessed_letters").html("");
				$(".guesses_left").html(this.guesses);
				$("#results .wins").html(this.wins);
				$("#results .fails").html(this.fails);
				this.words.splice(this.words.indexOf(this.word), 1);
				this.setWord();
			}else{
				alert("There are no more game words! Press CTR + R to restart the game!");
				window.removeEventListener('keydown', keyDownHandler)
				$("#final").html(`<p>Wins: ${game.wins}</p><p>Fails: ${game.fails}</p><p>Guesses: ${game.totalGuessed}</p><p>Guessed letters: ${game.totalGuessed}</p><p>Guessed words: ${JSON.stringify(game.guessedWords)}</p><p>All game words: ${JSON.stringify(game.oldWords)}</p>`).fadeIn("slow");
			}
		},
	};

	window.addEventListener('keydown', keyDownHandler = (event) => {
		if(first === false){
		    var key = event.key; // "a", "1", "Shift", etc.
		    if(keys.indexOf(key) > -1){
				game.checkLetter(key);
			}			
		}else{
			first = false;
			$(".welcome").fadeOut("slow");
		}
	});

	game.oldWords = game.words.slice();
	game.setWord();
});