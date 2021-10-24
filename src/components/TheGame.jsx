import React, { Component } from 'react';
import BoardGame from './BoardGame';

export default class TheGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			XisNext: true,
			stepNumber: 0,
			history: [ { Square: Array(9).fill(null) } ]
		};
	}

	jumpto(step) {
		this.setState({
			stepNumber: step,
			XisNext: step % 2 === 0
		});
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const Square = current.Square.slice();
		const Winner = CheckWinner(Square);
		if (Winner || Square[i]) {
			return;
		}

		Square[i] = this.state.XisNext ? 'X' : 'O';
		this.setState({
			history: history.concat({
				Square: Square
			}),
			XisNext: !this.state.XisNext,
			stepNumber: history.length
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const thewinner = CheckWinner(current.Square);
		const moves = history.map((step, move) => {
			const movegamehistory = move ? `Stip ` + move : `Start Game`;
			return (
				<li key={move}>
					<button
						onClick={() => { 
							this.jumpto(move);
						}}
					>
						{movegamehistory}
					</button>
				</li>
			);
		});
		let status;
		if (thewinner) {
			status = 'The Winner is ' + thewinner;
		} else {
			status = 'Next Player is ' + (this.state.XisNext ? 'X' : 'O');
		}

		return (
			<div className="container">
                <div className="game_information">
					<div className="status">{status}</div>
					<ul>{moves}</ul>
				</div>
				<div className="the_game">
					<h1>Tic Tac Toe</h1>
					<div className="board_game">
						<BoardGame onClick={(i) => this.handleClick(i)} Square={current.Square} />
					</div>
				</div>
                
				
			</div>
		);
	}
}

function CheckWinner(Square) {
	const line = [
		[ 0, 1, 2 ],
		[ 3, 4, 5 ],
		[ 6, 7, 8 ],
		[ 0, 3, 6 ],
		[ 1, 4, 7 ],
		[ 2, 5, 8 ],
		[ 0, 4, 8 ],
		[ 2, 4, 6 ]
	];

	for (let i = 0; i < line.length; i++) {
		const [ A, B, C ] = line[i];
		if (Square[A] && Square[A] === Square[B] && Square[B] === Square[C]) {
			return Square[C];
		}
	}
	return null;
}
