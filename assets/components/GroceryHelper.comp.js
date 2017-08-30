import {h, render, Component} from 'preact';
import linkState from 'linkstate';

class GroceryHelper extends Component {
  render() {
    return (
      <h1>Grocery Helper</h1>
    );
  }
}

render(<GroceryHelper />, document.querySelector('#app'));