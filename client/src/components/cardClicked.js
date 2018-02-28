import React, { Component } from 'react';
import GameBoard from './gameBoard';


class CardClicked extends Component {
    constructor(props) {
        super(props);
        console.log('clicked status is ' + props.clickedStatus)
    }

    toggleState() {

    }

    render() {
        return (
            <div onClick={(event) => this.props.handleClick(event, this.toggleState.bind(this))} className={this.props.className} style={{ backgroundImage: "url(" + this.props.style + ")", opacity: this.props.clickedStatus ? .4 : 1 }} ></div>
        )
    }
}

export default CardClicked;
