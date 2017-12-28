import { h, render, Component } from 'preact';
// import linkState from 'linkstate';

class StardewAdmin extends Component {
  render() {
    return (
      <h1>Stardew Valley API Admin</h1>
    );
  }
}

render(<StardewAdmin />, document.querySelector('#app'));