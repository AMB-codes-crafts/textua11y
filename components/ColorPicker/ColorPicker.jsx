import { useState } from 'react';
import colors from './colors.json';
import styles from './ColorPicker.module.scss';

const ColorPicker = ({ title }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedTone, setSelectedTone] = useState();
  const [selectedShade, setSelectedShade] = useState();

  let subtitle;
  let buttonsToRender;
  if (!selectedColor) {
    subtitle = 'Pick your color';
    buttonsToRender = colors.map(({ name, tones }) => {
      const at500Tone = tones.find(({ tone }) => tone == 500);
      return { backgroundColor: at500Tone.default, name };
    });
  } else if (!selectedTone) {
    subtitle = 'Pick your tone';
    const color = colors.find((color) => color.name === selectedColor);
    buttonsToRender = color.tones.map((tone) => ({
      backgroundColor: tone.default,
      tone: tone.tone,
    }));
  } else if (!selectedShade) {
    subtitle = 'Pick your shade';
    const color = colors.find((color) => color.name === selectedColor);
    const tone = color.tones.find(({ tone }) => tone === selectedTone);
    buttonsToRender = [
      { shade: 'default', backgroundColor: tone.default },
      { shade: 'light', backgroundColor: tone.light },
      { shade: 'dark', backgroundColor: tone.dark },
    ];
  } else {
    const color = colors.find((color) => color.name === selectedColor);
    const tone = color.tones.find(({ tone }) => tone === selectedTone);
    const shade = tone[selectedShade];
    subtitle = `${selectedColor} ${selectedTone} // ${selectedShade}`;
    buttonsToRender = [{ backgroundColor: shade }];
  }

  return (
    <div className={styles.ColorPicker}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {buttonsToRender.map(({ backgroundColor, name, tone, shade }) => (
          <button
            style={{
              width: 50,
              height: 50,
              backgroundColor: backgroundColor,
              border: 'none',
            }}
            onClick={() => {
              if (!selectedColor) {
                setSelectedColor(name);
              } else if (!selectedTone) {
                setSelectedTone(tone);
              } else if (!selectedShade) {
                setSelectedShade(shade);
              } else {
                setSelectedColor();
                setSelectedTone();
                setSelectedShade();
              }
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
