import { h, Component } from 'preact';
import { Villager } from './Villager.comp';

export class VillagerList extends Component {
  dispatchAdd() {
    document.dispatchEvent(new CustomEvent('villager-add'));
  }

  render({ villagers }, state) {
    const dispatchAdd = this.dispatchAdd.bind(this);
    return (
      <div class="villager-list">
        <button class="e-btn e-btn--cta create-villager" onClick={ dispatchAdd }>Add Villager</button>
        { villagers.map(v => <Villager villager={ v }></Villager>) }
      </div>
    );
  }
}