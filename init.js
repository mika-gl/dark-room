//buscar pointers de HTML DOM
var character = document.getElementById('character');
var shadow = document.getElementById('shadow');
var constructedRoom = document.querySelector('.constructed-room'); //el cuarto GRID PADRE que limita la sombras
var characterRoom = document.querySelector('.character-room'); //el cuarto que limita el personaje
var shadowHiders = document.querySelectorAll('.hides-shadow');
//objetos
var roomObjects = document.querySelectorAll('.object');
var shadowBits = document.querySelectorAll('.shadow-bit');
var regex = /\d+/g;	//regex para buscar los digitos de ComputedStyle de GridArea




//variables de mapa
var charSize = 2;
var shadowSize = 18;
var charPadding = 8;


var constructedRoomSize = 50;	//def. 24

//creacion mapa
constructedRoom.style.gridTemplateRows = `repeat(${constructedRoomSize},1fr)`;
constructedRoom.style.gridTemplateColumns = `repeat(${constructedRoomSize},1fr)`;

setElementXY(character, {x:10,y:10}, charPadding, charSize);
setElementXY(shadow, {x:10,y:10}, 0, shadowSize);
characterRoom.style.gridArea = `${charPadding+1}/${charPadding+1}/${constructedRoomSize-charPadding+1}/${constructedRoomSize-charPadding+1}`;

//shadow bits
createShadowBits();

//shadow hiders fuera del mapa
shadowHiders[0].style.gridArea = `1/1/${constructedRoomSize+1}/${charPadding+1}`;
shadowHiders[1].style.gridArea = `1/${constructedRoomSize-charPadding+1}/${constructedRoomSize+1}/${constructedRoomSize+1}`;
shadowHiders[2].style.gridArea = `1/${charPadding+1}/${charPadding+1}/${constructedRoomSize-charPadding+1}`;
shadowHiders[3].style.gridArea = `${constructedRoomSize-charPadding+1}/${charPadding+1}/${constructedRoomSize+1}/${constructedRoomSize-charPadding+1}`;


//mover personaje
var justMoved = false;
var movementKeys = ['w','a','s','d'];
document.addEventListener('keydown', function keyDownHandler(event) {
	if (!movementKeys.includes(event.key)) { return; }
	if (!justMoved) {
		justMoved = true;
		moveElement(character, charPadding, event);	
		moveElement(shadow, 0, event);
		playFootsteps();
	
		setTimeout(() => { justMoved = false; }, 300); //duracion de audios 250ms
		//console.log(getCoordinates(character));

	} else {
		console.log("can't move yet");
	}
});

//deteccion de sombra en cada shadow bit 
shadowBits.forEach((bit) => {
	bit.addEventListener('keydown', function shadowBitHandler() {
		
	});
});
console.log(getCoordinates(roomObjects[0]));
