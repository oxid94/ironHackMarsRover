// INICI function Create Rovers
function createRover(grid){
  this.direction = randomStartDirection();
  this.position = randomStartPosition(grid);
}

function randomStartPosition(grid){
  var position;
  // Generem una posicio entre 0 i 9 tant a la coordenada X com a la Y
  position = [Math.floor(Math.random()*grid.length),Math.floor(Math.random()*grid.length)];
  console.log("Random Start Position -> " + position);
  return position;
}

function randomStartDirection(){
  var dir = Math.floor(Math.random() * 4);
  switch (dir){
    case 0:
        dir = "N";
        break;
    case 1:
        dir = "E";
        break;
    case 2:
        dir = "S";
        break;
    case 3:
        dir = "W";
        break;
  }
  console.log("Random Start Direction -> " + dir);
  return dir;
}

// FI function Create Rovers

// INICI function Create Grid
function createGrid(size) {
  var grid = [];
  for (var i = 0; i < size; i++) {
    grid.push([]);
    // aqui generem un obstacle per cada linia
    var obstacle = Math.floor(Math.random() * 10);

    for (var j = 0; j < size; j++) {
      if(j == obstacle) {
        grid[i].push(".");
      } else {
        grid[i].push(" ");
      }
    }
  }
  return grid;
}

// FI function Create Grid

// INICI function Control rover movement

function controlLimitsGrid(rover, grid){
  //Controla que el rover no surti del grid.
  // Si la X es + petita q 0
  var limit = false;
  if(rover['position'][0] < 0){
    rover['position'][0] = grid.length - 1;
    limit = true;
  }
  // Si la Y es + petita q 0
  if(rover['position'][1] < 0){
    rover['position'][1] = grid.length - 1;
    limit = true;
  }
  // Si la X es + gran q el el limit del grid
  if(rover['position'][0] > grid.length - 1){
    rover['position'][0] = 0;
    limit = true;
  }
  // Si la Y es + gran q el el limit del grid
  if(rover['position'][1] > grid.length - 1){
    rover['position'][1] = 0;
    limit = true;
  }

  if (limit == true) console.log("Has arribat a un limit, la nova posició és: " + rover['position']);
}

function goForward(rover,grid) {
  var oldPos = rover["position"];
  switch(rover["direction"]) {
    case 'N':
      rover["position"][0]++;
      break;
    case 'E':
      rover["position"][1]++;
      break;
    case 'S':
      rover["position"][0]--;
      break;
    case 'W':
      rover["position"][1]--;
      break;
  };

  controlLimitsGrid(rover,grid);
  if (findObstacle(rover,grid) === true){
    rover["position"] = oldPos;
  }
  console.log("New Rover Position: [" + rover['position'][0] + ", " + rover['position'][1] + "] + Rover Direction: " + rover.direction)
}

function goBackward(rover,grid) {
  var oldPos = rover["position"];
  switch(rover["direction"]) {
    case 'N':
      rover["position"][0]--;
      break;
    case 'E':
      rover["position"][1]--;
      break;
    case 'S':
      rover["position"][0]++;
      break;
    case 'W':
      rover["position"][1]++;
      break;
  };

  controlLimitsGrid(rover,grid);
  if (findObstacle(rover,grid) === true){
    rover["position"] = oldPos;
  }
  console.log("New Rover Position: [" + rover['position'][0] + ", " + rover['position'][1] + "] + Rover Direction: " + rover.direction)
}

function goLeft(rover,grid){
  //rotates direction counterclockwise
   switch(rover["direction"]) {
       case "N":
           rover["direction"] = "W";
           break;
       case "W":
           rover["direction"] = "S";
           break;
       case "S":
           rover["direction"] = "E";
           break;
       case "E":
           rover["direction"] = "N";
           break;

   }
   console.log("New Rover Position: [" + rover['position'][0] + ", " + rover['position'][1] + "] + Rover Direction: " + rover.direction)
};

function goRight(rover,grid){
 //rotates direction clockwise
   switch(rover["direction"]) {
       case "N":
           rover["direction"] = "E";
           break;
       case "E":
           rover["direction"] = "S";
           break;
       case "S":
           rover["direction"] = "W";
           break;
       case "W":
           rover["direction"] = "N";
           break;
   }

   console.log("New Rover Position: [" + rover['position'][0] + ", " + rover['position'][1] + "] + Rover Direction: " + rover.direction)
 };

function findObstacle(rover,grid){
  var posX = rover["position"][0];
  var posY = rover["position"][1];
  
  if(grid[posX][posY] === ".") {
    console.log("Has trobat un obstacle, pasem la seguent comanda");
    return true;
  } else {
    return false;
  }

}


// FI function Control rover movement

// Inici del programa
function startProgram(command) {
  //creem el grid de 10 x 10
  var grid = createGrid(10);
  // creem el Rover
  var myRover = new createRover(grid);
  for (var i = 0; i < command.length; i++) {
    var option = command.charAt(i);
    switch (option) {
      case "f":
        goForward(myRover,grid);
        break;
      case "b":
        goBackward(myRover,grid);
        break;
      case "l":
        goLeft(myRover,grid);
        break;
      case "r":
        goRight(myRover,grid);
        break;
      default:

    }
  }
}

var command = String(prompt("Escriu f per anar endavan, b per anar enrrere, r per girar a la dreta, l per girar a l'esquerra, per executar varies comandes a l'hora escriu tot seguit. \"fffrfflfffbb\"")).toLowerCase();

startProgram(command);
