/* globals CustomEvent fetch */

// eslint-disable-next-line no-unused-vars
import { h, render, Component } from 'preact';
// import linkState from 'linkstate';

function createVillagerDiv(villager) {
  return (
    <div class="villager" data-villager={ JSON.stringify(villager) }>
      <span>{ villager.name }{ villager.single ? ' 💍' : '' }</span>
      <button class="e-btn edit-btn" onClick={ e => this.handleEditVillager(villager) }>Edit</button>
      <button class="e-btn del-btn">Delete</button>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
class StardewAdmin extends Component {
  componentWillMount() {
    this.setState({
      currentVillager: null,
      shouldShowForm: false,
      villagers: []
    });
  }

  componentDidMount() {
    document.addEventListener('stardew-villager-data', ({ detail }) => this.setState({ villagers: detail }));
    document.dispatchEvent(new CustomEvent('stardew-admin-mounted'));
  }

  handleAddVillager() {
    this.showForm();
    this.setState({ currentVillager: null });
  }

  handleEditVillager(currentVillager) {
    this.showForm();
    this.setState({ currentVillager });
  }

  handleSubmitVillager(evt) {
    const { currentVillager } = this.state;
    evt.preventDefault();
    const {
      name: { value: name },
      birthday: { value: birthday },
      region: { value: region },
      address: { value: address },
      single: { checked: single }
    } = evt.target;
    const data = { name, birthday, region, address, single };
    if (currentVillager) data._id = currentVillager._id;
    const url = currentVillager
      ? `/stardew/villager/${currentVillager._id}`
      : '/stardew/villager';
    const method = currentVillager ? 'PUT' : 'POST';
    const body = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/json' };
  
    fetch(url, { method, body, headers })
      .then(res => res.json())
      .then(newVillager => {
        const villagers = currentVillager
          ? this.state.villagers.map(villager => this.replaceVillager(villager, newVillager))
          : [ ...this.state.villagers, newVillager ].sort(this.sortVillagers);
        this.setState({ villagers, currentVillager: null });
      });
  }

  hideForm() {
    this.setState({ shouldShowForm: false });
  }

  replaceVillager(oldVillager, newVillager) {
    return oldVillager._id === newVillager._id ? newVillager : oldVillager;
  }

  showForm() {
    this.setState({ shouldShowForm: true });
  }

  sortVillagers(a, b) {
    return a.name > b.name;
  }

  render(props, { villagers, shouldShowForm, currentVillager }) {
    const handleAddVillager = this.handleAddVillager.bind(this);
    const handleSubmitVillager = this.handleSubmitVillager.bind(this);
    const hideForm = this.hideForm.bind(this);
    const formClass = `edit-villager ${ shouldShowForm ? '' : 'invis' }`;
    const {
      name = '',
      birthday = '',
      region = '',
      address = '',
      single = false
    } = currentVillager || {};
    return (
      <div class="villager-admin">
        <h2>Villagers</h2>
        <div class="villagers-wrapper">
          <div class="villager-list">
            <button class="e-btn e-btn--cta create-villager" onClick={ handleAddVillager }>Add Villager</button>
            { villagers.map(createVillagerDiv.bind(this)) }
          </div>
          <form class={ formClass } onSubmit={ handleSubmitVillager }>
            <input type="text" name="name" placeholder="Name" value={ name } />
            <input type="text" name="birthday" placeholder="Birthday" value={ birthday } />
            <input type="text" name="region" placeholder="Region" value={ region } />
            <input type="text" name="address" placeholder="Address" value={ address } />
            <div class="marriage e-card e-card--small">
              <input type="checkbox" name="single" id="single" checked={ single } />
              <label for="single">Single and ready to mingle</label>
            </div>
            <div class="controls">
              <input type="submit" class="e-btn e-btn--cta create-villager" value="Create Villager" />
              <input type="submit" class="e-btn e-btn--cta update-villager hide" value="Save Changes" />
              <button type="button" class="e-btn cancel-changes" onClick={ hideForm }>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

render(<StardewAdmin />, document.querySelector('#app'));