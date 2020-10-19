import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
  return (
    // 注意onclick需要接收一个函数
    <button
      className="square"
      onClick={() => { props.onClick() }}
    >
      {props.value}
    </button>
  )
}

// 棋盘
class Board extends React.Component {
  // 构造函数中进行状态管理
  constructor(props) {
    super(props)
    // 九个各自的当前状态
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }
  handleClick (i) {
    const squares = this.state.squares.slice(0)
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    })
  }
  // 向子组件传递两个props value和onClick
  renderSquare (i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => { this.handleClick(i) }}
      />
    );
  }
  // 渲染九个方块
  render () {
    const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// 渲染一个棋盘
class Game extends React.Component {
  render () {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
