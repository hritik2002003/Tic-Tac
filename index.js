
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

// 8 position for winning
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// let's create the function to initialize the game
function initGame() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI pr empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        //remove green color,inital box with css properties again
        box.classList=`box box${index+1}`;

    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

initGame();

function swapTurn(){
    if(currPlayer==="X"){
        currPlayer="O";
    }
    else{
        currPlayer="X";
    }
    //UI update
    gameInfo.innerText=`Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        // all 3 boxes should not empty and exactly same value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" ||gameGrid[position[2]]!=="" ) &&(gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){


            //check if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="Y";
            }
            //diabsle pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    //it means we have winner
    if(answer!==""){
        gameInfo.innerText=`Winner is Player-${answer}`; 
        newGamebtn.classList.add("active");
        return;
    }

    //let's check whether there is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    //board is fill game is TIE
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGamebtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        //swap kro turn ko
        swapTurn();
        //check koi jeet to nhi gya
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


newGamebtn.addEventListener("click",initGame);





