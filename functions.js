function parseToGridArea(array) {       //para convertir de vuelta, despues de sumar valores, a un valor aceptado por .gridArea
        return `${array[0]}/${array[1]}/${array[2]}/${array[3]}`;       //siempre seran 4 valores
}



//FUNCIONES DE EVENTO
function moveElement(element, padding, event) {
	//gridArea Actual de character, que seria donde esta 'posicionado'
	let oldElementAreaArray = getComputedStyle(element).gridArea.match(regex);
	switch (event.key) {
		case 'w':
			oldElementAreaArray[0]-=2;         //los strings se coercionan a ints      
			oldElementAreaArray[2]-=2;                                                
			element.style.gridArea = parseToGridArea(oldElementAreaArray);
			break;
	case 'a':
			oldElementAreaArray[1]-=2;
			oldElementAreaArray[3]-=2;
			element.style.gridArea = parseToGridArea(oldElementAreaArray);
			break;
	case 's':
			oldElementAreaArray[0]-=(-2);      //para que sigan coercionando a ints. Si sumo se concatenaran   
			oldElementAreaArray[2]-=(-2);
			element.style.gridArea = parseToGridArea(oldElementAreaArray);
			break;
	case 'd':
			oldElementAreaArray[1]-=(-2);
			oldElementAreaArray[3]-=(-2);
			element.style.gridArea = parseToGridArea(oldElementAreaArray);
			break;
	}
}

function checkObjectCollision(key) {
	let objectCoordinates = {};
	roomObjects.forEach((obj) => {
		objectCoordinates[getCoordinates(obj).x] = getCoordinates(obj).y; //guardar la informacion de ambas coordenadas en key y value
	});
	let character_x = getCoordinates(character).x;
	let character_y = getCoordinates(character).y;

	switch (key) {
		case "w":
			return !(character_y - 1 === objectCoordinates[character_x]);
			//break;
		case "s":
			return !(character_y + 1 === objectCoordinates[character_x]);
			//break;
		case "a":
			return !(objectCoordinates[character_x - 1] === character_y);
			//break;
		case "d":
			return !(objectCoordinates[character_x + 1] === character_y);
			//break;
	}
	return true;
}
function checkWorldCollision(key) {
	let character_x = getCoordinates(character).x;
	let character_y = getCoordinates(character).y;
	switch (key) {
		case "w":
			return character_y > 1;
		case "s":
			return character_y < 17;
		case "a":
			return character_x > 1;
		case "d":
			return character_x < 17;
	}
}
var footstepsCounter = 1;
function playFootsteps() {
	document.getElementById(`footsteps${footstepsCounter}`).pause();
	document.getElementById(`footsteps${footstepsCounter}`).currentTime = 0;
	footstepsCounter = Math.trunc((Math.random() * 3)+1);

	switch (footstepsCounter) {
		case 1:	
			document.getElementById('footsteps1').play();
			break;
		case 2:
			document.getElementById('footsteps2').play();
			break;
		case 3:
			document.getElementById('footsteps3').play();
			break;
	}
}

function getCoordinates(element) {
    let elementAreaArray = getComputedStyle(element).gridArea.match(regex);
	let coordinates = {
		x: (elementAreaArray[1]-charPadding+1)/2, //transformacion a plano, pues gridArea aumenta de a 2	
		y: (elementAreaArray[0]-charPadding+1)/2  
	}
	return coordinates;
}
function getShadowCoordinates(element) {
	let elementAreaArray = getComputedStyle(element).gridArea.match(regex);
	let coordinates = {
		x: (parseInt(elementAreaArray[1])+1)/2, //transformacion a plano, pues gridArea aumenta de a 2	
		y: (parseInt(elementAreaArray[0])+1)/2  
	}
	return coordinates;
}
function translateShadowCoordinates(element) {
	let coordinates = {
		x: getCoordinates(character).x - (4 + 1 - getShadowCoordinates(element).x),
		y: getCoordinates(character).y - (4 + 1 - getShadowCoordinates(element).y)
	}
	return coordinates;
}

function coordinatesToGridArea(coordinates, elementPadding, elementSize) {
	let rowStart = (coordinates.y*2)+elementPadding-1;
	let colStart = (coordinates.x*2)+elementPadding-1;
	let gridArea = `${rowStart}/${colStart}/${rowStart+elementSize}/${colStart+elementSize}`;
	return gridArea;
}

function setElementXY(element, coordinates, elementPadding, elementSize) {	//quizas usar esta funciona para mover char con menos codigo
	element.style.gridArea = coordinatesToGridArea(coordinates, elementPadding, elementSize);
}

function getShadowPosition() {
	let charChoordinates = getCoordinates(character);
	size = {
		top: charChoordinates.y - 4,
		bottom: charChoordinates.y + 4,
		right: charChoordinates.x + 4,
		left: charChoordinates.x - 4
	}
	return size;
}

function isInsideOfShadow(element) {
	let e_Coordinates = getCoordinates(element);
	let shadowPosition = getShadowPosition();
	let sh_arr = [shadowPosition.top, shadowPosition.right, shadowPosition.bottom, shadowPosition.left];
	return e_Coordinates.y >= sh_arr[0] && e_Coordinates.y <= sh_arr[2] && e_Coordinates.x >= sh_arr[3] && e_Coordinates.x <= sh_arr[1];
} 
function createShadowBits() {
	for (let i=1; i <= (shadowSize/2)+1; i++) {
		for (let k=1; k <= shadowSize/2 +1; k++) { //shadowSize/2
			if (!(k===5 && i===5)) {
				let div = document.createElement('div');
				div.classList.add('shadow-bit');
				document.getElementById('shadow').appendChild(div); 

				//posicionamiento
				let coordinates = {x:i, y:k};
				setElementXY(div, coordinates, 0, 2);	
			}
		}
	}
}

function distributeShadowHiders() {
	shadowHiders[0].style.gridArea = `1/1/${constructedRoomSize+1}/${charPadding+1}`;
	shadowHiders[1].style.gridArea = `1/${constructedRoomSize-charPadding+1}/${constructedRoomSize+1}/${constructedRoomSize+1}`;
	shadowHiders[2].style.gridArea = `1/${charPadding+1}/${charPadding+1}/${constructedRoomSize-charPadding+1}`;
	shadowHiders[3].style.gridArea = `${constructedRoomSize-charPadding+1}/${charPadding+1}/${constructedRoomSize+1}/${constructedRoomSize-charPadding+1}`;
}

function shadowLogic(sh_coord, obj_coord, char_coord) {
	let isReflected = sh_coord.x == 2*obj_coord.x - char_coord.x && sh_coord.y == 2*obj_coord.y - char_coord.y;

	let isAlined_x = sh_coord.y == char_coord.y && char_coord.y == obj_coord.y;
	let isAlined_y = sh_coord.x == char_coord.x && char_coord.x == obj_coord.x; 
	//en vez de que la condicion para 'char_coord' sea de igualdad entre sus coordenadas, podria ser simplemente que se encontraran en el cuadrante contrario al de la sombra.
	//de esta manera la sombra diagonal se mantendra en caso de que no se encuentre exactamente alineado el personaje
	let isOppositeAlined_diagonal = ((char_coord.x-obj_coord.x == char_coord.y-obj_coord.y && sh_coord.x-obj_coord.x == sh_coord.y-obj_coord.y) || (char_coord.x-obj_coord.x == -(char_coord.y-obj_coord.y) && (sh_coord.x-obj_coord.x == -(sh_coord.y-obj_coord.y))))
		&& ((char_coord.y > obj_coord.y && obj_coord.y > sh_coord.y) || (char_coord.y < obj_coord.y && obj_coord.y < sh_coord.y));

	let isOppositeAlined_x = isAlined_x && ((char_coord.x > obj_coord.x && obj_coord.x > sh_coord.x) || (char_coord.x < obj_coord.x && obj_coord.x < sh_coord.x)); 
	let isOppositeAlined_y = isAlined_y && ((char_coord.y > obj_coord.y && obj_coord.y > sh_coord.y) || (char_coord.y < obj_coord.y && obj_coord.y < sh_coord.y)); 

	

	return /*isReflected || */ isOppositeAlined_x || isOppositeAlined_y || isOppositeAlined_diagonal;
}
