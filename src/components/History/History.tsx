import './History.css';

import React from 'react';
import { HisotryModel } from '../../models/History';

const MyComponent = props => {
  const history: HisotryModel[] = props.history;
  return (
    <div className='History'>
      <h3>History</h3>
      {history
        .map((item, i) =>
          <p>Round {i} :<b>{item.playerMove}</b> - <b> {item.botMove} </b></p>,
        )}
    </div>);
};


export default MyComponent;
