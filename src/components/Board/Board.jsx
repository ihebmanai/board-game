import './Board.css'

import React from 'react';
import PropTypes from 'prop-types';
import { MoveType } from '../../enums/move-type.enum';

const Board = props => {
const movesArr : string[] = Object.values(MoveType)
  return (
    <div className="Board">
      {movesArr.map((move, i )=>
        <div key={i} className="Board__element" onClick={() => props.getMove(move)}>{move}</div>
      )}
    </div>
  );
};

Board.propTypes = {
  getMove: PropTypes.func,
};

export default Board;
