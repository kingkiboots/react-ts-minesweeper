import React, { useState } from 'react';
import Main from '../Main';
import { NO_OF_BOMBS } from '../../constants';
import { OnChangeEvent } from '../../types';

const App = () => {
  // game setting 을 컨텍스트로 빼자.
  const [numberOfBombs, setNumberOfBombs] = useState<number>(NO_OF_BOMBS);

  const handleChange = (e: OnChangeEvent) => {
    const { value } = e.target;
    setNumberOfBombs(parseInt(value));
  };

  return (
    <div className="container">
      <div className="Level">
        <label>지뢰개수 선택 : </label>
        <select
          value={numberOfBombs}
          name="numberOfBombs"
          onChange={handleChange}
        >
          {Array(NO_OF_BOMBS)
            .fill(null)
            .map((_, idx) => {
              const value = idx + 1;
              return (
                <option key={`selectNumberOfBombs${value}`} value={value}>
                  {value}
                </option>
              );
            })}
        </select>
      </div>
      <div className="App">
        <Main numberOfBombs={numberOfBombs} />
      </div>
    </div>
  );
};

export default App;
