import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/reducers';
import { TPreferences } from '../../../libs/types';

interface IGamePreferences {
  setStartGame: (value: boolean) => void;
}

const GamePreferences: React.FC<IGamePreferences> = ({ setStartGame }) => {
  const { state, dispatch } = useContext(AppContext);

  const [formValues, setFormValues] = useState<TPreferences>(state.preferences);

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
    console.log(target.name, target.value);
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const dispatchDefaults = () => {
    dispatch({
      type: 'game',
      payload: { A923476983: [], B8486384963: [] },
    });

    dispatch({
      type: 'players',
      payload: { A923476983: 'Player', B8486384963: 'Computer' },
    });

    dispatch({
      type: 'currentUser',
      payload: 'A923476983',
    });

    dispatch({ type: 'preferences', payload: formValues });
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
