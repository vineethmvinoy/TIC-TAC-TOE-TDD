import { useState } from "react";

export default function App(){
  return (
  <Board/>
  );
}
export const Square=({value,onSquareClicked})=>{
  return (<button className="square" onClick={onSquareClicked}>{value}</button>);
}

export const Board=()=>{
  const [square,setSquares]=useState(Array(9).fill(null));
  const [xIsNext,setXIsNext]=useState(true);  
  const handleClick=(i)=>{
    if(square[i] || calculateWinner(square) )
    return;
    const nextSquares=square.slice();
    if(xIsNext)
    nextSquares[i]='X';
    else
    nextSquares[i]='O';
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }
 
  const winner = calculateWinner(square);
  let status;
  if(winner=='Draw')
  status = winner;
  else
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return(
  <>
  <div className="status" data-testid='status'>{status}</div>
  <div data-testid="gameBoard">
  <div className="board-row">
    <Square value={square[0]} onSquareClicked={()=>handleClick(0)}/>
    <Square value={square[1]} onSquareClicked={()=>handleClick(1)}/>
    <Square value={square[2]} onSquareClicked={()=>handleClick(2)}/>
  </div>
  <div className="board-row">
    <Square value={square[3]} onSquareClicked={()=>handleClick(3)}/>
    <Square value={square[4]} onSquareClicked={()=>handleClick(4)}/>
    <Square value={square[5]} onSquareClicked={()=>handleClick(5)}/>

  </div>
  <div className="board-row">
    <Square value={square[6]} onSquareClicked={()=>handleClick(6)}/>
    <Square value={square[7]} onSquareClicked={()=>handleClick(7)}/>
    <Square value={square[8]} onSquareClicked={()=>handleClick(8)}/>
  </div>
  </div>
  </>
  );
}
export const calculateWinner=(square)=>{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i=0;i<lines.length;i++)
  {
    const [a,b,c]=lines[i];
    if(square[a] && square[a]===square[b] && square[c]===square[a])
    return square[a];
  }
  let flag=0;
  for(let i=0;i<9;i++)
  {
    if(square[i]==='X' || square[i]==='O')
    flag=1;
    else
    {flag=0;
    break;}
  }
  if(flag==1)
  return "Draw"

  return null;
}
