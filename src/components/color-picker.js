import React from 'react';
import colors from '../colors.json';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSetting: [null, null, null],
    };
  }

  handleClick(selection) {
    var currentSetting = this.state.currentSetting;
    if (this.state.currentSetting[0] === null) {
      currentSetting[0] = selection;
    } else if (this.state.currentSetting[1] === null) {
      currentSetting[1] = selection;
    } else if (this.state.currentSetting[2] === null) {
      currentSetting[2] = selection;
      this.props.callback(this.getCurrentColorHash());
    }

    this.setState({
      currentSetting: currentSetting,
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
        <div className="selected-color" style={{
          backgroundColor: this.getCurrentColorHash(),
        }}></div>
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
