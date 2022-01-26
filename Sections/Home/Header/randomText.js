// random quote generator
var quotes = [
	"There's a fine line between genius and insanity.",
	"Quote 2",
	"Quote 3",
	"Quote 4",
	"Quote 5",
	"Quote 6",
	"Quote 7",
	"Quote 8",
	"Quote 9",
];

var authors = [
	"Oscar Levant",
	"Quote Author 2",
	"Quote Author 3",
	"Quote Author 4",
	"",
	"",
	"Quote Author 7",
	"",
	"Quote Author 9",
];

displayQoute();

function displayQoute() {
	// choose and display quote
	var quoteIndex = Math.floor(Math.random() * quotes.length);
	var quote = quotes[quoteIndex];
	var author = authors[quoteIndex];

	// could be optimized by checking if the values differ, then update
	document.getElementById("quote").innerHTML = quote;
	document.getElementById("author").innerHTML = "- ";
	if (author != "") document.getElementById("author").innerHTML += author;
	else document.getElementById("author").innerHTML += "Unknown";
}

// set interval to update every hour
setInterval(function () {
	displayQoute();
}, 1000 * 60 * 60);
