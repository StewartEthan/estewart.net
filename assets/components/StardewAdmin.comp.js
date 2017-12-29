/* globals CustomEvent */

// eslint-disable-next-line no-unused-vars
import { h, render, Component } from 'preact';
// import linkState from 'linkstate';

function createVillagerDiv(villager) {
  return (
    <div class="villager" data-villager={ JSON.stringify(villager) }>
      <span>{ villager.name }</span>
      <button class="e-btn edit-btn">Edit</button>
      <button class="e-btn del-btn">Delete</button>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
class StardewAdmin extends Component {
  componentDidMount() {
    document.addEventListener('stardew-villager-data', ({ detail }) => this.setState({ villagers: detail }));
    document.dispatchEvent(new CustomEvent('stardew-admin-mounted'));
  }

  render(props, { villagers = [] }) {
    console.log('props', props);
    console.log('villagers', villagers);
    return (
      <div class="villager-admin">
        <h2>Villagers</h2>
        <div class="villagers-wrapper">
          <div class="villager-list">
            <button class="e-btn e-btn--cta create-villager">Add Villager</button>
            { villagers.map(createVillagerDiv) }
          </div>
          <form class="edit-villager invis">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="birthday" placeholder="Birthday" />
            <input type="text" name="region" placeholder="Region" />
            <input type="text" name="address" placeholder="Address" />
            <div class="marriage e-card e-card--small">
              <input type="checkbox" name="single" id="single" />
              <label for="single">Single and ready to mingle</label>
            </div>
            <div class="controls">
              <input type="submit" class="e-btn e-btn--cta create-villager" value="Create Villager" />
              <input type="submit" class="e-btn e-btn--cta update-villager hide" value="Save Changes" />
              <button type="button" class="e-btn cancel-changes">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<StardewAdmin />, document.querySelector('#app'));