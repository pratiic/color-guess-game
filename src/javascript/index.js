import { elements } from "./elements.js";

let turns = 5;

status = "";

let chosenColor;

let initialHeaderColor = "#007bff";

let randomValueGenerator = function (value) {
	return Math.floor(Math.random() * (value + 1));
};

let setColors = function () {
	elements.colors.forEach((color) => {
		color.style.backgroundColor = `rgb(${randomValueGenerator(
			256
		)}, ${randomValueGenerator(256)}, ${randomValueGenerator(256)})`;
	});

	elements.header.style.backgroundColor = initialHeaderColor;
};

let setGame = function () {
	//setting up the colors in the game
	setColors();

	//choosing a color to be guessed by the user
	chosenColor = elements.colors[randomValueGenerator(8)];
	elements.chosenColor.innerText = chosenColor.style.backgroundColor;

	//setting the number of turns
	elements.turns.innerText = turns;
};

setGame();

//event listener to listen for the user's clicking on the colors
elements.colorsSection.addEventListener("click", (event) => {
	if (event.target.classList.contains("color") && status === "") {
		checkIfCorrect(event.target);
	}
});

//this checks if the user's selected color is the same as the color to be guessed
let checkIfCorrect = function (selectedColor) {
	if (
		selectedColor.style.backgroundColor ===
		chosenColor.style.backgroundColor
	) {
		markCorrect(selectedColor);
	} else {
		markIncorrect(selectedColor);
	}

	elements.result.style.color = selectedColor.style.backgroundColor;
	elements.result.style.padding = "0.4rem 1.3rem";
};

//this resets the game
let resetGame = function () {
	turns = 5;

	status = "";

	elements.newColors.innerText = "new colors";

	setGame();
};

//event listener for the reset button
elements.newColors.addEventListener("click", resetGame);

//for when the user selects the wrong color
let markIncorrect = function (selectedColor) {
	elements.result.innerText = "try again";

	//to make the clicked color disappear
	selectedColor.classList.add("incorrect");

	elements.turns.innerText = --turns;

	if (turns === 0) {
		youLose();
	}
};

//for when the user selects the right color
let markCorrect = function (selectedColor) {
	elements.result.innerText = "correct";

	status = "win";

	showColorBoxes();

	changeColor(selectedColor.style.backgroundColor);

	elements.newColors.innerText = "play again";
};

//for when the user loses
let youLose = function () {
	changeColor("black");

	showColorBoxes();

	status = "lose";

	elements.result.innerText = "you lose";

	elements.newColors.innerText = "play again";
};

//to change the color of the overall game
let changeColor = function (color) {
	elements.colors.forEach((col) => {
		col.style.backgroundColor = color;
	});

	elements.header.style.backgroundColor = color;
};

//to reappear the disappeared colors
let showColorBoxes = function () {
	elements.colors.forEach((color) => {
		color.classList.remove("incorrect");
	});
};
