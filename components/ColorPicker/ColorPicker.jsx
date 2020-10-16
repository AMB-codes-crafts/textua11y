import { useState } from 'react';
import { Icon } from '../../components';
import colors from './colors.json';
import styles from './ColorPicker.module.scss';

const getIconColor = (hex_color) => {
  var red_hex = hex_color.substring(1, 3);
  var green_hex = hex_color.substring(3, 5);
  var blue_hex = hex_color.substring(5, 7);

  var red = parseInt(red_hex, 16) / 255.0;
  if (red <= 0.03928) {
    red = red / 12.92;
  } else {
    red = Math.pow((red + 0.055) / 1.055, 2.4);
  }

  var green = parseInt(green_hex, 16) / 255.0;
  if (green <= 0.03928) {
    green = green / 12.92;
  } else {
    green = Math.pow((green + 0.055) / 1.055, 2.4);
  }

  var blue = parseInt(blue_hex, 16) / 255.0;
  if (blue <= 0.03928) {
    blue = blue / 12.92;
  } else {
    blue = Math.pow((blue + 0.055) / 1.055, 2.4);
  }

  var luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  if (luminance > 0.179) {
    return '#000000';
  } else {
    return '#ffffff';
  }
};

const ColorPicker = ({ title, onChangeCallback }) => {
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
      { shade: 'light', backgroundColor: tone.light },
      { shade: 'default', backgroundColor: tone.default },
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
      <div>
        {buttonsToRender.map(
          ({ backgroundColor, name, tone, shade }, index) => (
            <button
              key={`colorButton-${index}-${new Date().getTime()}`}
              style={{ backgroundColor }}
              onClick={() => {
                if (!selectedColor) {
                  setSelectedColor(name);
                } else if (!selectedTone) {
                  setSelectedTone(tone);
                } else if (!selectedShade) {
                  setSelectedShade(shade);
                  onChangeCallback(backgroundColor);
                } else {
                  setSelectedColor();
                  setSelectedTone();
                  setSelectedShade();
                }
              }}
            >
              {selectedShade && (
                <Icon name="redo-alt" color={getIconColor(backgroundColor)} />
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
