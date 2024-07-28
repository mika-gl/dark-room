var character = document.getElementById('character');
var regex = /\d+/g;	//regex para buscar los digitos de ComputedStyle de GridArea

//asignar tamaño de personaje
var charSize = 2;
document.querySelector('#character').style.gridArea = `1/1/${charSize+1}/${charSize+1}`;
//asignar tamaño de cuarto
var roomSize = 24;	//def. 24
document.querySelector('.current-room').style.gridTemplateRows = `repeat(${roomSize},1fr)`;
document.querySelector('.current-room').style.gridTemplateColumns = `repeat(${roomSize},1fr)`;

function parseToGridArea(array) {	//para convertir de vuelta, despues de sumar valores, a un valor aceptado por .gridArea
	return `${array[0]}/${array[1]}/${array[2]}/${array[3]}`;	//siempre seran 4 valores
}





//mover personaje
document.addEventListener('keydown', function keyDownHandler(event) {
	var oldCharAreaArray = getComputedStyle(character).gridArea.match(regex); //gridArea Actual de character, que seria donde esta 'posicionado'
	
	switch (event.key) {
		case 'w':
			if (oldCharAreaArray[0] > 1 && oldCharAreaArray[2] > (charSize+1)) {//coercion	//actulizo el valor en el mismo array
				oldCharAreaArray[0]-=2;		//los strings se coercionan a ints	//oldCharAreaArray. Quiza en el futuro hacer
				oldCharAreaArray[2]-=2;							//un nuevo array newCharAreaArray
				character.style.gridArea = parseToGridArea(oldCharAreaArray);
				console.log(oldCharAreaArray);
			}
			break;
		case 'a':
			if (oldCharAreaArray[1] > 1 && oldCharAreaArray[3] > (charSize+1)) {
				oldCharAreaArray[1]-=2;		
				oldCharAreaArray[3]-=2;				
				character.style.gridArea = parseToGridArea(oldCharAreaArray);
				console.log(oldCharAreaArray);
			}
			break;
		case 's':
			if (oldCharAreaArray[0] < (roomSize-charSize) && oldCharAreaArray[2] < roomSize) {
				oldCharAreaArray[0]-=(-2);	//para que sigan coercionando a ints. Si sumo se concatenaran	
				oldCharAreaArray[2]-=(-2);	
				character.style.gridArea = parseToGridArea(oldCharAreaArray);
				console.log(oldCharAreaArray);
			}
			break;
		case 'd':
			if (oldCharAreaArray[1] < (roomSize-charSize) && oldCharAreaArray[3] < roomSize) {
				oldCharAreaArray[1]-=(-2);		
				oldCharAreaArray[3]-=(-2);	
				character.style.gridArea = parseToGridArea(oldCharAreaArray);
				console.log(oldCharAreaArray);
			}
			break;
		//final de switch
	}	
});
