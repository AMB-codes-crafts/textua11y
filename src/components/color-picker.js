import React from 'react';
import colors from '../colors.json';
import { MdRefresh } from 'react-icons/md';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSetting: [null, null, null],
      currentStep: 0,
    };
  }

  handleClick(selection) {
    if (selection === null || selection === undefined) {
      this.setState({
        currentSetting: [null, null, null],
        currentStep: 0,
      })
      return;
    }

    var currentSetting = this.state.currentSetting;
    var currentStep = this.state.currentStep;

    currentSetting[currentStep % 3] = selection;
    if (currentStep % 3 === 2) {
      this.props.callback(this.getCurrentColorHash());
    }

    this.setState({
      currentSetting: currentSetting,
      currentStep: currentStep + 1,
    });
  }

  getCurrentColorHash() {
    if (
      this.state.currentSetting[0] === null ||
      this.state.currentSetting[1] === null ||
      this.state.currentSetting[2] === null
    ) {
      return null;
    }

    var color = colors[this.state.currentSetting[0]];
    var tone = color.tones[this.state.currentSetting[1]];
    var shade = tone[this.state.currentSetting[2]];

    return shade;
  }

  getCurrentColorName() {
    if (
      this.state.currentSetting[0] === null ||
      this.state.currentSetting[1] === null ||
      this.state.currentSetting[2] === null
    ) {
      return null;
    }

    var color = colors[this.state.currentSetting[0]];
    var tone = color.tones[this.state.currentSetting[1]];
    var shade = this.state.currentSetting[2];

    return color.name + ' ' + tone.tone + ' // ' + shade;
  }

  getTextColor(hex_color) {
    var red_hex = hex_color.substring(1, 3);
    var green_hex = hex_color.substring(3, 5);
    var blue_hex = hex_color.substring(5, 7);
  
    var red = parseInt(red_hex, 16) / 255.0;
    if (red <= 0.03928) {
      red = red / 12.92;
    } else {
      red = Math.pow(((red + 0.055) / 1.055), 2.4);
    }
  
    var green = parseInt(green_hex, 16) / 255.0;
    if (green <= 0.03928) {
      green = green / 12.92;
    } else {
      green = Math.pow(((green + 0.055) / 1.055), 2.4);
    }
  
    var blue = parseInt(blue_hex, 16) / 255.0;
    if (blue <= 0.03928) {
      blue = blue / 12.92;
    } else {
      blue = Math.pow(((blue + 0.055) / 1.055), 2.4);
    }
  
    var luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  
    if (luminance > 0.179) {
      return '#000000';
    } else {
      return '#ffffff';
    }
  }

  render() {
    var arrayToUse;
    var status;
    if (this.state.currentSetting[0] === null) {
      arrayToUse = colors;
      status = 'Pick your color';
    } else if (this.state.currentSetting[1] === null) {
      arrayToUse = colors[this.state.currentSetting[0]].tones;
      status = 'Pick your tone';
    } else if (this.state.currentSetting[2] === null) {
      var thing = colors[this.state.currentSetting[0]].tones[this.state.currentSetting[1]]
      arrayToUse = [
        thing.light,
        thing.default,
        thing.dark
      ];
      status = 'Pick your shade';
    } else {
      return <div className="color-picker">
        <p>{this.getCurrentColorName()}</p>
        <button
          className="selected-color"
          onClick={() => this.handleClick()}
          style={{
            backgroundColor: this.getCurrentColorHash(),
          }}
        >
          <MdRefresh className="refresh-icon" style={{
            color: this.getTextColor(this.getCurrentColorHash()),
          }} />
        </button>
      </div>
    }

    return (
      <div>
        <div className="color-picker">
          <p>{status}</p>
          {
            arrayToUse.map((item, index) => {
              var defaultTone;
              var selection = index;
              if (item.name) {
                for (var i in item.tones) {
                var tone = item.tones[i];
                if (tone.tone === '500') {
                  defaultTone = tone.default;
                  break;
                  }
                }
              } else if (item.default) {
                defaultTone = item.default;
              } else {
                defaultTone = item;
                if (index === 0) {
                  selection = 'light';
                } else if (index === 1) {
                  selection = 'default';
                } else {
                  selection = 'dark';
                }
              }

              return (
                <button
                  key={index}
                  className="color-button"
                  onClick={() => this.handleClick(selection)}
                  style={{
                    backgroundColor: defaultTone
                  }}
                ></button>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default ColorPicker;
