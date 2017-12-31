import { h, Component } from 'preact';

export class VillagerList extends Component {
  createVillagerDiv(villager) {
    return (
      <div class="villager" data-villager={ JSON.stringify(villager) }>
        <span>{ villager.name }{ villager.single ? ' 💍' : '' }</span>
        <button class="e-btn edit-btn" onClick={ e => this.dispatchEdit(villager) }>Edit</button>
        <button class="e-btn del-btn">Delete</button>
      </div>
    );
  }

  dispatchAdd() {
    document.dispatchEvent(new CustomEvent('villager-add'));
  }

  dispatchEdit(villager) {
    const detail = { villager };
    document.dispatchEvent(new CustomEvent('villager-edit', { detail }));
  }

  render({ villagers }, state) {
    const dispatchAdd = this.dispatchAdd.bind(this);
    return (
      <div class="villager-list">
        <button class="e-btn e-btn--cta create-villager" onClick={ dispatchAdd }>Add Villager</button>
        { villagers.map(this.createVillagerDiv.bind(this)) }
      </div>
    );
  }
}