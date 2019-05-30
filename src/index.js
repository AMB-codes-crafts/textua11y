import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ColorPicker from './components/color-picker'
import { MdCheck, MdClose} from 'react-icons/md';
import { register } from './serviceWorker';

require('typeface-lora');
require('typeface-roboto');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: '#000000',
      backgroundColor: '#ffffff',
    };
  }

  getRelativeLumninance(RGB) {
    var RsRGB = RGB[0] / 255;
    var GsRGB = RGB[1] / 255;
    var BsRGB = RGB[2] / 255;

    var R;
    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = ((RsRGB + 0.055) / 1.055) ** 2.4;
    }

    var G;
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = ((GsRGB + 0.055) / 1.055) ** 2.4;
    }

    var B;
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = ((BsRGB + 0.055) / 1.055) ** 2.4;
    }

    return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
  }

  getContrastRatio() {
    var textHex = this.state.textColor;
    var textRGB = [
      parseInt('0x' + textHex.substr(1, 2)),
      parseInt('0x' + textHex.substr(3, 2)),
      parseInt('0x' + textHex.substr(5, 2)),
    ];
    var text_lumninance = this.getRelativeLumninance(textRGB);

    var backgroundHex = this.state.backgroundColor;
    var backgroundRGB = [
      parseInt('0x' + backgroundHex.substr(1, 2)),
      parseInt('0x' + backgroundHex.substr(3, 2)),
      parseInt('0x' + backgroundHex.substr(5, 2)),
    ];
    var background_lumninance = this.getRelativeLumninance(backgroundRGB);

    var lighter;
    var darker;
    if (text_lumninance < background_lumninance) {
      lighter = text_lumninance;
      darker = background_lumninance
    } else {
      lighter = background_lumninance;
      darker = text_lumninance;
    }

    return Math.round(((darker + 0.05) / (lighter + 0.05)) * 100) / 100;
  }

  render() {
    var ratio = this.getContrastRatio();
    var largePasses = ratio >= 3.0;
    var smallPasses = ratio >= 4.5;

    return (
      <div>
        <div id="sidebar">
          <h1>textua11y</h1>
          <p>Are my color choices accessible?</p>

          <hr />

          <table>
            <tbody>
              <tr>
                <td><strong>headings</strong></td>
                {/* <td>{ratio} >= 3.0 ?</td> */}
                <td>{largePasses ? <MdCheck /> : <MdClose />}</td>
              </tr>
              <tr>
                <td><strong>bodies</strong></td>
                {/* <td>{ratio} >= 4.5 ?</td> */}
                <td>{smallPasses ? <MdCheck /> : <MdClose />}</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>Text color</h2>
          <ColorPicker callback={(color) => {
            this.setState({
              textColor: color,
              backgroundColor: this.state.backgroundColor,
            })
          }} />

          <hr />

          <h2>Background color</h2>
          <ColorPicker callback={(color) => {
            this.setState({
              textColor: this.state.textColor,
              backgroundColor: color,
            });
          }} />
        </div>
        <div id="content" style={{
          color: this.state.textColor,
          backgroundColor: this.state.backgroundColor
        }}>
          <h1>Cupcake ipsum dolor sit amet</h1>
          <p>Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer jelly soufflé cotton candy gingerbread carrot cake gingerbread topping topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa chups pastry. Liquorice gummies croissant liquorice candy marshmallow gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.</p>
          <h2>Cupcake ipsum dolor sit amet</h2>
          <p>Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer jelly soufflé cotton candy gingerbread carrot cake gingerbread topping topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa chups pastry. Liquorice gummies croissant liquorice candy marshmallow gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.</p>
          <h3>Cupcake ipsum dolor sit amet</h3>
          <p>Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer jelly soufflé cotton candy gingerbread carrot cake gingerbread topping topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa chups pastry. Liquorice gummies croissant liquorice candy marshmallow gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// register a service worker
register();
