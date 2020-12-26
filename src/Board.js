import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.30
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    // this.createBoard=this.createBoard.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; ++y) {
      let row = [];
      for (let i = 0; i < this.props.ncols; ++i)
        row.push(Math.random() < this.props.chanceLightStartsOn);
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log(coord);
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }

    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board: board, hasWon: hasWon });
    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    if (this.state.hasWon) {
      return <div className='winner'>
        <span className="neon-orange">YOU</span>
        <span className="neon-blue">WIN!</span>
      </div>
    }
    let tableBoard = [];
    for (let y = 0; y < this.props.nrows; ++y) {
      let row = [];
      for (let i = 0; i < this.props.ncols; ++i) {
        let coord = `${y}-${i}`
        row.push(<Cell key={coord} isLit={this.state.board[y][i]}
          flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }
      tableBoard.push(<tr key={y}>{row}</tr>);
    }
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    return (
      <div>
        <div className="neon-orange">LIGHTS</div>
        <div className="neon-blue">OUT</div>
        <table className='Board'>
          <tbody>{tableBoard}</tbody>
        </table>
      </div>)

    // TODO
  }
}


export default Board;
