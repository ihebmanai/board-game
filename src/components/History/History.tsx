import './History.css';

import React from 'react';
import { History } from '../../models/history.model';

const HistoryTable = props => {
  const history: History[] = props.history;
  return (
    <div className='History'>
      <h3>History</h3>
      {history
        .map((item: History, i: number) =>
          <p>Round {i+1} :<b>{item.playerMove}</b> - <b> {item.botMove} </b></p>,
        )}
    </div>);
};


export default HistoryTable;
