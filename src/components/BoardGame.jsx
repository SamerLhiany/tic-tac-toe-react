import React, { Component } from 'react';
import Square from './Square';

export default class BoardGame extends Component {

    rendersquare(i){
        return <Square value={this.props.Square[i]}
        onClick={()=>this.props.onClick(i)}>
        </Square>
    }


    render() {
        return (
            <div>

                  {/* creat a boarder gamme */}

                <div className="boarder_row">
                    {this.rendersquare(0)}
                    {this.rendersquare(1)}
                    {this.rendersquare(2)}
                </div>
                <div className="boarder_row">
                    {this.rendersquare(3)}
                    {this.rendersquare(4)}
                    {this.rendersquare(5)}
                </div>
                <div className="boarder_row">
                    {this.rendersquare(6)}
                    {this.rendersquare(7)}
                    {this.rendersquare(8)}
                </div>

            </div>
        )
    }
}
