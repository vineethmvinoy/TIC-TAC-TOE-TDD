import { fireEvent, getAllByTestId, getByTestId, render, screen } from '@testing-library/react';
import App from './App';

describe("Should Render A Board With 9 Buttons",()=>{
    it("Should Return A Board",()=>{
      render(<App/>);
      const board=screen.getAllByTestId('gameBoard');
      expect(board).not.toBeNull();
    });
    it("Should Render 9 Buttons",()=>{
      render(<App/>);
      const buttons=screen.getAllByRole('button');
      expect(buttons.length).toBe(9);
    });
    it("All the buttons should have no initial value",()=>{
      render(<App/>);
      const buttons=screen.getAllByRole('button');
      for(let i=0;i<buttons.length;i++)
      {
        expect(buttons[i].textContent).toBe('');
      }
    });
});

describe("Tic Tac Toe Functionality",()=>{
  it("Should Alternate Chances after each oppurtunity",()=>{
    render(<App/>);
    const squares=screen.getAllByRole('button');
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
    fireEvent.click(squares[1]);
    expect(squares[1].textContent).toBe('O');
  });
  it("Should not change value if pressed upon existing value or game won",()=>{
    render(<App/>);
    const buttons=screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0].textContent).toBe('X');
    fireEvent.click(buttons[0])
    expect(buttons[0].textContent).toBe('X');
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[2]);
    const status=screen.getByTestId("status");
    expect(status.textContent).toBe('Winner: X');
    fireEvent.click(buttons[5]);
    expect(buttons[5].textContent).toBe('');
  });
  it("Should Declare Winner When X Wins Correctly",()=>{
    render(<App/>);
    const buttons=screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[8]);
    fireEvent.click(buttons[2]);
    fireEvent.click(buttons[4]);
    const status=screen.getByTestId("status");
    expect(status.textContent).toBe('Winner: X')
  });
  it("Should Declare Winner When o Wins Correctly",()=>{
    render(<App/>);
    const buttons=screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[2]);
    fireEvent.click(buttons[7]);
    const status=screen.getByTestId("status");
    expect(status.textContent).toBe('Winner: O')
  });
  it("Should Return Draw If Game Ends In Draw",()=>{
    render(<App/>);
    const buttons=screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[7]);
    fireEvent.click(buttons[8]);
    fireEvent.click(buttons[4]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);
    fireEvent.click(buttons[6]);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons[5]);
    const status=screen.getByTestId("status");
    expect(status.textContent).toBe("Draw");
  });
});