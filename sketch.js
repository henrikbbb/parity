let n = 6
let size = 100
let squares
let checkbox_showNumbers
let slider

function setup() {
	createCanvas(800, 800)


	let button_shuffle = createButton('neu')
	button_shuffle.mousePressed(shuffleSquares)

	let divSlider = createDiv()
	slider = createSlider(3, 20, 6, 1)
	slider.parent(divSlider)
	slider.changed(() => {
		n = slider.value()
		size = 100 * 6 / slider.value()
		setupSquares()
	})

	checkbox_showNumbers = createCheckbox('Zahlen anzeigen', false)

	setupSquares()

}

function setupSquares() {
	squares = new Array(n)
	for (let i = 0; i < n; i++){
		squares[i] = new Array(n)
		for (let j = 0; j < n; j++){
			squares[i][j] = new Square(int((random(2))))
		}
	}
}

function draw() {
	background(255)

	showSquares()

	if (checkbox_showNumbers.checked()){
		showNumbers()
	}
}

function showNumbers(){
	fill(0)
	noStroke()
	textSize(50 * 6 / n)
	textAlign(CENTER, CENTER)

	for (let i = 0; i < n; i++){
		let counter = 0
		for (let j = 0; j < n; j++){
			if (squares[i][j].state){
				counter += 1
			}
		}
		let x = 50 + i*size
		let y = 50 + n*size
		text(counter, x + size/2, y + size/2)
	}

	for (let j = 0; j < n; j++){
		let counter = 0
		for (let i = 0; i < n; i++){
			if (squares[i][j].state){
				counter += 1
			}
		}
		let x = 50 + n*size
		let y = 50 + j*size
		text(counter, x + size/2, y + size/2)
	}
}

function showSquares(){
	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			let x = 50 + i*size
			let y = 50 + j*size
			squares[i][j].show(x, y)
		}
	}

	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			let x = 50 + i*size
			let y = 50 + j*size
			if (squares[i][j].mouseOver(x, y)){
				squares[i][j].show(x, y)
				return
			}
		}
	}
}

function mousePressed(){
	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			let x = 50 + i*size
			let y = 50 + j*size
			if (squares[i][j].mouseOver(x, y)){
				squares[i][j].state = 1 - squares[i][j].state
				return
			}
		}
	}
}

function shuffleSquares(){
	for (let i = 0; i < n; i++){
		for (let j = 0; j < n; j++){
			squares[i][j].state = int(random(2))
		}
	}
}

class Square{
	constructor(state){
		this.state = state
	}

	show(x, y){
		strokeWeight(5)
		stroke(255/2)
		fill(255)
		if (this.state){
			fill(0)
		}
		rect(x, y, size, size)

		if (this.mouseOver(x, y)){
			strokeWeight(10)
			rect(x-5, y-5, size+10, size+10)
		}
	}

	mouseOver(x, y){
		return (x < mouseX && mouseX < x+size && y < mouseY && mouseY < y+size)
	}
}
