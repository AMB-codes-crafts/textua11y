import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ColorPicker from './components/color-picker'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: '#000000',
      backgroundColor: '#ffffff',
    };
  }

  render() {
    return (
      <div>
        <div id="sidebar">
          <h1>a11y Color Contrast Helper</h1>
          <p>Are my color choices accessible?</p>

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
          <h1>This is some stuff</h1>
          <p>Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer jelly soufflé cotton candy gingerbread carrot cake gingerbread topping topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa chups pastry. Liquorice gummies croissant liquorice candy marshmallow gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.</p>
          <h2>This is some stuff</h2>
          <p>Cupcake ipsum dolor sit amet caramels. Cake tootsie roll candy canes oat cake dragée chocolate bar. Danish pudding chocolate cake. Wafer jelly soufflé cotton candy gingerbread carrot cake gingerbread topping topping. Dragée jelly-o biscuit pie jelly-o chocolate. Jelly-o brownie liquorice croissant dessert oat cake brownie cake sweet. Toffee sugar plum soufflé chocolate chocolate cake sweet carrot cake candy. Oat cake gummi bears macaroon jelly-o tootsie roll fruitcake jelly beans jelly-o toffee. Candy canes soufflé cheesecake croissant sweet chupa chups pastry. Liquorice gummies croissant liquorice candy marshmallow gummi bears bonbon jelly-o. Muffin sugar plum donut biscuit dessert pie carrot cake croissant. Fruitcake chocolate cake halvah muffin.</p>
          <h3>This is some stuff</h3>
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
