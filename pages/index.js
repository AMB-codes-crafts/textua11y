import { useState } from 'react';
import { ColorPicker } from '../components';

const Index = () => {
  const [textColor, setTextColor] = useState('black');
  const [backgroundColor, setBackgroundColor] = useState('white');

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
            <p>icon</p>
          </div>
          <div>
            <p>bodies</p>
            <p>icon</p>
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
