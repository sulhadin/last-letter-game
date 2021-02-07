import React, { useContext, useState } from 'react';
import GameContext from '../../../context/GameContext';
import { TGamePreferences } from '../../../utils/types';

interface IGamePreferences {
  setStartGame: (value: boolean) => void;
}

const GamePreferences: React.FC<IGamePreferences> = ({ setStartGame }) => {
  const { state, dispatch } = useContext(GameContext);

  const [formValues, setFormValues] = useState<TGamePreferences>({
    ...state.preferences,
    timer: state.timer,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : Number(target.value);

    setFormValues({
      ...formValues,
      [target.name]: value,
    });
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;

    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const dispatchDefaults = () => {
    dispatch({
      type: 'game',
      payload: { A9HUMAN: [], B8COMPUTER: [] },
    });

    dispatch({
      type: 'players',
      payload: { A9HUMAN: 'HUMAN', B8COMPUTER: 'COMPUTER' },
    });

    dispatch({
      type: 'currentUser',
      payload: 'A9HUMAN',
    });

    const preferences = {
      charLength: formValues.charLength,
      letterFromEnd: formValues.letterFromEnd,
      probabilityPercent: formValues.probabilityPercent,
      restricted: formValues.restricted,
      inputType: formValues.inputType,
    };

    const timer = {
      second: formValues.timer.second,
      timeIsUp: formValues.timer.timeIsUp,
    };

    dispatch({ type: 'preferences', payload: preferences });
    dispatch({ type: 'timer', payload: timer });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchDefaults();
    setStartGame(true);
  };

  return (
    <div className="last-letter-game-app">
      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }} className="preferences-form">
        <div className="form-item">
          <label htmlFor="charLength">
            Char length:
            <input
              type="number"
              name="charLength"
              value={formValues?.charLength}
              onChange={handleChange}
              min={1}
              max={2}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="letterFromEnd">
            Letter from end:
            <input
              name="letterFromEnd"
              type="checkbox"
              checked={formValues?.letterFromEnd}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="probabilityPercent">
            Probability Percent
            <input
              type="number"
              name="probabilityPercent"
              value={formValues?.probabilityPercent}
              onChange={handleChange}
              min={0}
              max={1}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="second">
            Count down second
            <input
              type="number"
              name="second"
              value={formValues?.timer.second}
              onChange={handleChange}
              min={3}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="restricted">
            Restricted
            <input
              name="restricted"
              type="checkbox"
              checked={formValues?.restricted}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="inputType">
            Choose Input Type
            <select
              defaultValue={formValues?.inputType}
              name="inputType"
              onChange={handleChangeSelect}
            >
              <option value="TEXT">TEXT</option>
              <option value="VOICE">VOICE</option>
            </select>
          </label>
        </div>
        <button type="submit">Start!</button>
      </form>
    </div>
  );
};
export default GamePreferences;
