const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const commonHarmonySchema = ["T", "T", "H", "T", "T", "T", "H"]
const commonChordSchema = ["M3", "m3"]

const harmonyInput = document.getElementById("harmonyInput")
const chordInput = document.getElementById("chordInput")
const keyInput = document.getElementById("keyInput")
const noteButtons = document.getElementsByClassName("note")

const output = document.getElementById("output")

function clearAll() {
	clearNoteButtons()
	keyInput.value = -1
	harmonyInput.value = -1
	chordInput.value = -1
}

function clearNoteButtons() {
	for (let button of noteButtons) {
		button.style.backgroundColor = "rgb(221, 221, 221)"
	}
}

function chooseHarmony(button) {
	harmonyInput.value = button.id

	if (keyInput.value >= 0) {
	 	buildHarmony(keyInput.value, harmonyInput.value)
	}
}

function chooseChordType(button) {
	chordInput.value = button.id

	if (keyInput.value >= 0) {
		buildChord(keyInput.value, chordInput.value)
    }
}

function chooseKey(button) {
	keyInput.value = notes.indexOf(button.textContent)

	if (harmonyInput.value >= 0) {
		buildHarmony(keyInput.value, harmonyInput.value)
	}

	if (chordInput.value.length > 0) {
		buildChord(keyInput.value, chordInput.value)
	}

	clearNoteButtons()
	button.style.backgroundColor = "#888"
}


function buildHarmony(key, harmonyStart) {
	let scale = moveByCycle(notes, key)
	const harmonyButton = document.getElementById(harmonyStart)

	output.innerText = `${notes[key]} ${harmonyButton.innerText.toLowerCase()}:`

	moveByCycle(commonHarmonySchema, harmonyStart)
		.map(interval => { 
			if (interval === "H") return 1
			if (interval === "T") return 2
		})
		.forEach((intervalSize, intervalNumber) => 
			makeStep(scale, intervalNumber, intervalSize)
		)
		
	for (let note of scale) {
		output.innerText += " " + note
	}
}	

function buildChord(key, chordType) {
	let scale = moveByCycle(notes, key)
	const chordSchemaOffset = chordType == "major" ? 0 : 1
	const chordButton = document.getElementById(chordType)

	output.innerText = `${notes[key]} ${chordButton.innerText.toLowerCase()}:`

	moveByCycle(commonChordSchema, chordSchemaOffset)
		.map(interval => { 
			if (interval === "m3") return 3
			if (interval === "M3") return 4
		})
		.forEach((intervalSize, intervalNumber) => 
			makeStep(scale, intervalNumber, intervalSize)
		)
		
	const chordNotes = scale.slice(0, commonChordSchema.length + 1)

	for (let note of chordNotes) {
		output.innerText += " " + note
	}
}

function moveByCycle(baseArray, movesNumber) {
	let array = Array.from(baseArray)

	for (let i = 0; i < movesNumber; i++) {
		array.push(array.shift())
	}

	return array
}

function makeStep(scale, stepNumber, intervalSize) {
	const currentNoteIndex = stepNumber + 1

	if (intervalSize > 1 && currentNoteIndex < scale.length) {
		scale.splice(currentNoteIndex, intervalSize - 1)
	}
}
