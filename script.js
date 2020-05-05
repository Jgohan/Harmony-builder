var notes = ["C", "C#", "D", "D#", "E",
			 "F", "F#", "G", "G#", "A", "A#", "B"];
var interval = ["T", "T", "H", "T", "T", "T", "H"];			 

var tonicInput = document.getElementById("tonicInput");
var harmonyInput = document.getElementById("harmonyInput");
var chordInput = document.getElementById("chordInput");
var output = document.getElementById("output");

function clearNoteButtons() {
	var noteButtons = document.getElementsByClassName("note");

	for(var i = 0; i < noteButtons.length; i++) {
		noteButtons[i].style.backgroundColor = "rgb(221, 221, 221)";
	}
}

function clearAll() {
	clearNoteButtons();
	tonicInput.value = -1;
	harmonyInput.value = -1;
	chordInput.value = -1;
}

function chooseTonic() {
	for(var i = 0; i < notes.length; i++) {
		if(event.target.innerText == notes[i]) {
			tonicInput.value = i;
		}
	}

	if(harmonyInput.value >= 0) {
		buildHarmony(+harmonyInput.value, +tonicInput.value);
	}

	clearNoteButtons();
	event.target.style.backgroundColor = "#888";
}

function chooseHarmony() {
	harmonyInput.value = event.target.classList.item(1);

	if(tonicInput.value >= 0) {
	 	buildHarmony(+harmonyInput.value, +tonicInput.value);
	}
}

function chooseChordType() {
	chordInput.value = event.target.classList.item(1);

	if(tonicInput.value >= 0) {
		buildChord(+tonicInput.value, +chordInput.value)
   }
}

function T(counter, flag) {
	if(flag.value < 7) {
		counter.value += 2;
		counter.value %= 12; 
		flag.value += 1;
		output.innerText += " " + notes[counter.value];
	}
}

function H(counter, flag) {
	if(flag.value < 7) {
		counter.value += 1;
		counter.value %= 12;
		flag.value += 1; 
		output.innerText += " " + notes[counter.value];
	}
}

function m3(counter) {
	counter.value += 3;
	counter.value %= 12;
	output.innerText += " " + notes[counter.value];
}

function b3(counter) {
	counter.value += 4;
	counter.value %= 12;
	output.innerText += " " + notes[counter.value];
}

function buildHarmony(intervalCounter, tonic) {
	var counter = {value: tonic};
	var flag = {value: 1};

	output.innerText = notes[tonic] + " " + 
		document.getElementById(intervalCounter).innerText.toLowerCase() + ": " +
		notes[tonic];

	for(var i = intervalCounter; i < 7; i++) {
		if(interval[i] == "T") T(counter, flag);
		else H(counter, flag);
	}

	for(var i = 0; i < intervalCounter-1; i++) {
		if(interval[i] == "T") T(counter, flag);
		else H(counter, flag);
	}
}	

function buildChord(tonic, chord) {
	counter = {value: tonic};

	output.innerText = notes[tonic] + " " + 
		document.getElementById("chord"+chord).innerText.toLowerCase() + ": " +
		notes[tonic];

		if(chord == 0) {
			b3(counter);
			m3(counter);
		}

		if(chord == 1) {
			m3(counter);
			b3(counter);
		}
}