function parseToGridArea(array) {       //para convertir de vuelta, despues de sumar valores, a un valor aceptado por .gridArea
        return `${array[0]}/${array[1]}/${array[2]}/${array[3]}`;       //siempre seran 4 valores
}



//FUNCIONES DE EVENTO
function moveElement(element, padding, event) {
	//gridArea Actual de character, que seria donde esta 'posicionado'
        let oldElementAreaArray = getComputedStyle(element).gridArea.match(regex);

        switch (event.key) {
                case 'w':
                        if (oldElementAreaArray[0]> 1+padding) {	//oldCharArray. Quizas hacer nuevo array: newCharAreaArray 
                                oldElementAreaArray[0]-=2;         //los strings se coercionan a ints      
                                oldElementAreaArray[2]-=2;                                                
                                element.style.gridArea = parseToGridArea(oldElementAreaArray);
                        }
                        break;
                case 'a':
                        if (oldElementAreaArray[1] > 1+padding) {
                                oldElementAreaArray[1]-=2;
                                oldElementAreaArray[3]-=2;
                                element.style.gridArea = parseToGridArea(oldElementAreaArray);
                        }
                        break;
                case 's':
                        if (oldElementAreaArray[2] < constructedRoomSize-padding) {
                                oldElementAreaArray[0]-=(-2);      //para que sigan coercionando a ints. Si sumo se concatenaran   
                                oldElementAreaArray[2]-=(-2);
                                element.style.gridArea = parseToGridArea(oldElementAreaArray);
                        }
                        break;
                case 'd':
                        if (oldElementAreaArray[3] < constructedRoomSize-padding) {
                                oldElementAreaArray[1]-=(-2);
                                oldElementAreaArray[3]-=(-2);
                                element.style.gridArea = parseToGridArea(oldElementAreaArray);
                        }
                        break;
                //final de switch
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
function coordinatesToGridArea(coordinates, elementPadding, elementSize) {
	let rowStart = (coordinates.y*2)+elementPadding-1;
	let colStart = (coordinates.x*2)+elementPadding-1;
	let gridArea = `${rowStart}/${colStart}/${rowStart+elementSize}/${colStart+elementSize}`;
	return gridArea;
}
function setElementXY(element, coordinates, elementPadding, elementSize) {	//quizas usar esta funciona para mover char con menos codigo
	element.style.gridArea = coordinatesToGridArea(coordinates, elementPadding, elementSize);
}

function createShadowBits() {
	for (let i=1; i <= (shadowSize/2)+1; i++) {
		for (let k=1; k <= shadowSize/2; k++) {
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



