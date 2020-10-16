import { useState } from 'react';
import { ColorPicker, Icon } from '../components';

const Index = () => {
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const getRelativeLumninance = (RGB) => {
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

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const getContrastRatio = () => {
    var textRGB = [
      parseInt('0x' + textColor.substr(1, 2)),
      parseInt('0x' + textColor.substr(3, 2)),
      parseInt('0x' + textColor.substr(5, 2)),
    ];
    var textLumninance = getRelativeLumninance(textRGB);

    var backgroundRGB = [
      parseInt('0x' + backgroundColor.substr(1, 2)),
      parseInt('0x' + backgroundColor.substr(3, 2)),
      parseInt('0x' + backgroundColor.substr(5, 2)),
    ];
    var backgroundLumninance = getRelativeLumninance(backgroundRGB);

    var lighter;
    var darker;
    if (textLumninance < backgroundLumninance) {
      lighter = textLumninance;
      darker = backgroundLumninance;
    } else {
      lighter = backgroundLumninance;
      darker = textLumninance;
    }

    return Math.round(((darker + 0.05) / (lighter + 0.05)) * 100) / 100;
  };

  const ratio = getContrastRatio();
  const headingsPass = ratio >= 3.0;
  const bodiesPass = ratio >= 4.5;

  return (
    <div id="page">
      <div id="sidebar">
        <div id="header">
          <h1>textua11y</h1>
          <p>Are my color choices accessible?</p>
        </div>
        <div id="checks">
          <div>
            <p>headings</p>
            <p>
              <Icon
                name={headingsPass ? 'check' : 'times'}
                color={headingsPass ? '#2e7d32' : '#b71c1c'}
              />
            </p>
          </div>
          <div>
            <p>bodies</p>
            <p>
              <Icon
                name={bodiesPass ? 'check' : 'times'}
                color={bodiesPass ? '#2e7d32' : '#b71c1c'}
              />
            </p>
          </div>
        </div>
        <div>
          <ColorPicker title="Text color" onChangeCallback={setTextColor} />
        </div>
        <div>
          <ColorPicker
            title="Background color"
            onChangeCallback={setBackgroundColor}
          />
        </div>
      </div>
      <div id="content" style={{ color: textColor, backgroundColor }}>
        <h1>Cupcake ipsum dolor sit amet</h1>
        <p>
          Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes
          oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer
          jelly soufflé cotton candy gingerbread carrot cake gingerbread topping
          topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie
          liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar
          plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat
          cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans
          jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa
          chups pastry. Liquorice gummies croissant liquorice candy marshmallow
          gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert
          pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.
        </p>
        <h2>Cupcake ipsum dolor sit amet</h2>
        <p>
          Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes
          oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer
          jelly soufflé cotton candy gingerbread carrot cake gingerbread topping
          topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie
          liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar
          plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat
          cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans
          jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa
          chups pastry. Liquorice gummies croissant liquorice candy marshmallow
          gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert
          pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.
        </p>
        <h3>Cupcake ipsum dolor sit amet</h3>
        <p>
          Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes
          oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer
          jelly soufflé cotton candy gingerbread carrot cake gingerbread topping
          topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie
          liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar
          plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat
          cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans
          jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa
          chups pastry. Liquorice gummies croissant liquorice candy marshmallow
          gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert
          pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.
        </p>
      </div>
    </div>
  );
};

export default Index;
