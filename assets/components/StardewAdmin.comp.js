import { h, render, Component } from 'preact';
import { VillagerAdmin } from './VillagerAdmin.comp.js';

// eslint-disable-next-line no-unused-vars
class StardewAdmin extends Component {
  render() {
    return (
      <VillagerAdmin></VillagerAdmin>
    );
  }
}

render(<StardewAdmin />, document.querySelector('#app'));