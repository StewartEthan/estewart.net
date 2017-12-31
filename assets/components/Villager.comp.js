import { h, Component } from 'preact';

export class Villager extends Component {
  dispatchDelete(villager) {
    document.dispatchEvent(new CustomEvent('villager-delete', { detail: villager }));
  }

  dispatchEdit(villager) {
    document.dispatchEvent(new CustomEvent('villager-edit', { detail: villager }));
  }

  render({ villager }) {
    return (
      <div class="villager" data-villager={ JSON.stringify(villager) }>
        <span>{ villager.name }</span>
        <span class="single">{ villager.single ? '💍' : '' }</span>
        <button class="e-btn edit-btn" onClick={ e => this.dispatchEdit(villager) }>Edit</button>
        <button class="e-btn del-btn" onClick={ e => this.dispatchDelete(villager) }>Delete</button>
      </div>
    );
  }
}