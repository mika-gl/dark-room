//buscar referencias de HTML DOM
var character = document.getElementById('character');
var shadow = document.getElementById('shadow');
var constructedRoom = document.querySelector('.constructed-room'); //el cuarto GRID PADRE que limita la sombras
var characterRoom = document.querySelector('.character-room'); //el cuarto que limita el personaje
var shadowHiders = document.querySelectorAll('.hides-shadow');
var doors = document.querySelectorAll('.door');

//objetos
var roomObjects = document.querySelectorAll('.object');
var regex = /\d+/g;	//regex para buscar los digitos de ComputedStyle de GridArea




//variables de mapa
var charSize = 2;
var shadowSize = 18; //18
var charPadding = 8;


var constructedRoomSize = 50;	//def. 24

//creacion mapa
constructedRoom.style.gridTemplateRows = `repeat(${constructedRoomSize},1fr)`;
constructedRoom.style.gridTemplateColumns = `repeat(${constructedRoomSize},1fr)`;

setElementXY(character, {x:10,y:10}, charPadding, charSize);
setElementXY(shadow, {x:10,y:10}, 0, shadowSize); //{x:10,y:10}
characterRoom.style.gridArea = `${charPadding+1}/${charPadding+1}/${constructedRoomSize-charPadding+1}/${constructedRoomSize-charPadding+1}`;


distributeShadowHiders();	//necesita valores declarados arriba
createShadowBits();			//necesita valores declarados arriba
var shadowBits = document.querySelectorAll('.shadow-bit');


//crear en grid 'doors'
doors.forEach((element) => {
	let position = {};
	switch (element.id) {
		case "door-top":
			position = {x: 10, y: 1}
			setElementXY(element, position, 6,2);
			break;
		case "door-bottom":
			position = {x: 10, y: 19}
			setElementXY(element, position, 6,2);
			break;
		case "door-left":
			position = {x: 1, y: 10}
			setElementXY(element, position, 6,2);
			break;
		case "door-right":
			position = {x: 19, y: 10}
			setElementXY(element, position, 6,2);
			break;
	}
});




//mover personaje
var justMoved = false;
var movementKeys = ['w','a','s','d'];

document.addEventListener('keydown', function keyDownHandler(event) {
	if (!movementKeys.includes(event.key)) { return; }

	if (!justMoved && checkObjectCollision(event.key) && checkWorldCollision(event.key)) {
		justMoved = true;
		moveElement(character, charPadding, event);	
		moveElement(shadow, 0, event);
		playFootsteps();
	
		setTimeout(() => { justMoved = false; }, 300); //si es menos que la duracion del audio, el audio no alcanzara a terminar y se lo saltara (250ms)
		console.log(`character moved to: ${getCoordinates(character).x},${getCoordinates(character).y}`);

	} else {
		console.log("can't move yet");
	}
	
	
	//deteccion de sombra en cada shadow bit 
	shadowBits.forEach((bit) => {
		roomObjects.forEach((roomObject) => {
			if (isInsideOfShadow(roomObject)) {
			roomObject.style.opacity = "1";
			} else {
				roomObject.style.opacity = "0";
			}

			/*logica para generacion de sombras dependiendo de donde se encuentra el personaje */
			let sh_coord = translateShadowCoordinates(bit);
			let obj_coord = getCoordinates(roomObject);
			let char_coord = getCoordinates(character);
			//formula para reflexion de una coordenada referente a un punt: x_2 = 2x_r - x_1
			if (shadowLogic(sh_coord, obj_coord, char_coord)) {
				bit.style.opacity = "0";
			} else {
				bit.style.opacity = "1";
			}

		});
	});
	//console.log(`an object is at: ${getCoordinates(roomObjects[0]).x},${getCoordinates(roomObjects[0]).y}`);
	
});