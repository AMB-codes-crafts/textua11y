import { useState } from 'react';
import colors from './colors.json';
import styles from './ColorPicker.module.scss';

const ColorPicker = ({ title }) => {
  const [subtitle, setSubtitle] = useState('Pick your color');

  return (
    <div className={styles.ColorPicker}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {colors.map(({ name, tones }) => {
          const at500Tone = tones.find(({ tone }) => tone == 500);
          if (!at500Tone) {
            return;
          }

          return (
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: at500Tone.default,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
