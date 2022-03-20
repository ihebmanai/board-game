import { FC, useEffect, useState } from 'react';

import './App.css';
import {
  addHistoryAction,
  appStartAction,
  historySelector,
  isAppStarted,
  resetGameAction,
  roundSelector,
  scoreBotSelector,
  scorePlayerSelector,
  updateScoreAction,
} from './getStore';
import { MoveType } from './enums/move-type.enum';
import History from './components/History/History';
import Board from './components/Board/Board';
import { connect } from 'react-redux';

export interface IAppProps {
  started: boolean;
  history: History[];
  scorePlayer: number;
  scoreBot: number;
  round: number;
  onStart: () => void;
  addHistory: () => void;
  resetGame: () => void;
  updateScore: () => void;
}

export const AppFC: FC<IAppProps> = ({
                                       started,
                                       history,
                                       scorePlayer,
                                       scoreBot,
                                       round,
                                       addHistory,
                                       updateScore,
                                       onStart,
                                       resetGame,
                                     }) => {
    const [playerMove, setPlayerMove] = useState<string>('');
    const [botMove, setBotMove] = useState<string>('');
    const [roundResult, setRoundResult] = useState<boolean>(null);


    const botMoves = [...Object.values(MoveType)];
    const botMovesPreff = [0.5, 0.25, 0.25];

    useEffect(() => {

      if (!started) {
        onStart();
      }
      shuffle(botMovesPreff);
    }, [started, onStart, botMovesPreff]);
    const gameRule: { [key: string]: MoveType, } = {
      Cavalry: MoveType.Archers,
      Archers: MoveType.Pikemen,
      Pikemen: MoveType.Cavalry,
    };
    const checkPlayerMoves = (playerMove: MoveType, currentRound) => {
      if (currentRound > 19) {
        return;
      }
      const _botMove: string = getBotMove(botMoves);

      //set users move
      setBotMove(_botMove);
      setPlayerMove(playerMove);

      //add moves to history
      addHistory({ playerMove: playerMove, botMove: _botMove });
      const _result = _botMove === playerMove ? null : gameRule[playerMove] === _botMove;
      const _roundMessage = _result === null ? 'DRAW' : _result ? 'Player win' : 'Bot win';
      setRoundResult(_roundMessage);
      updateScore(_result);
    };

    const shuffle = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };


    const getBotMove: MoveType = (moves): MoveType => {
      let i;

      for (i = 0; i < botMovesPreff.length; i++)
        botMovesPreff[i] += botMovesPreff[i - 1] || 0;

      const random = Math.random() * botMovesPreff[botMovesPreff.length - 1];

      for (i = 0; i < botMovesPreff.length; i++)
        if (botMovesPreff[i] > random)
          break;

      return moves[i];
    };

    const getFinalWinner = () => {
      console.log('fff');
      if (scoreBot > scorePlayer) {
        return 'Bot win';
      } else if (scoreBot < scorePlayer) {
        return 'Player win';
      } else {
        return 'Draw';
      }
    };

    if (!started) {
      return <span className='loading'>Loading...</span>;
    }
    return (
      <div className='app'>
        <div className='Game'>
          <div className='RoundBanner'> ROUND {round}
          </div>
          <p><b>{playerMove}</b> VS <b> {botMove} </b></p>
          <p> {roundResult} </p>
          <p><b>Player : </b>{scorePlayer} - <b>Bot :</b> {scoreBot}</p>
          {round > 19 ? <div><p>{getFinalWinner()}</p>
            <button onClick={() => {
              setRoundResult("")
              resetGame();
            }}>Reset Game</button>
          </div> : <Board getMove={(move) => checkPlayerMoves(move, round)} />}
        </div>
        <History history={history} />

      </div>
    );
  }
;

export const mapStateToProps = (state: IAppState) => {
  const started = isAppStarted(state);
  const scoreBot = scoreBotSelector(state);
  const scorePlayer = scorePlayerSelector(state);
  const round = roundSelector(state);
  const history = historySelector(state);
  return {
    started,
    scoreBot,
    scorePlayer,
    round,
    history,
  };
};

export const mapDispatchToProps = {
  onStart: appStartAction,
  addHistory: addHistoryAction,
  updateScore: updateScoreAction,
  resetGame: resetGameAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppFC);
export default App;
