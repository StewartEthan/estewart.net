/* globals CustomEvent fetch */

// eslint-disable-next-line no-unused-vars
import { h, render, Component } from 'preact';
import { VillagerForm } from './VillagerForm.comp.js';
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
      isNewVillager: true,
      shouldShowForm: false,
      villagers: []
    });
  }

  componentDidMount() {
    document.addEventListener('stardew-villager-data', ({ detail }) => this.setState({ villagers: detail }));
    document.addEventListener('hide-villager-form', e => this.setState({ shouldShowForm: false }));
    document.addEventListener('villager-form-submitted', ({ detail }) => {
      const { newVillager } = detail;
      const { currentVillager } = this.state;
      const villagers = currentVillager
        ? this.state.villagers.map(villager => this.replaceVillager(villager, newVillager))
        : [ ...this.state.villagers, newVillager ].sort(this.sortVillagers);
      this.setState({ currentVillager: null, villagers });
    });
    document.dispatchEvent(new CustomEvent('stardew-admin-mounted'));
  }

  handleAddVillager() {
    this.showForm();
    this.setState({ currentVillager: null, isNewVillager: true });
  }

  handleEditVillager(currentVillager) {
    this.showForm();
    this.setState({ currentVillager, isNewVillager: false });
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

  replaceVillager(oldVillager, newVillager) {
    return oldVillager._id === newVillager._id ? newVillager : oldVillager;
  }

  showForm() {
    this.setState({ shouldShowForm: true });
  }

  sortVillagers(a, b) {
    return a.name > b.name;
  }

  render(props, { villagers, shouldShowForm, currentVillager, isNewVillager }) {
    const handleAddVillager = this.handleAddVillager.bind(this);
    const handleSubmitVillager = this.handleSubmitVillager.bind(this);
    const formClass = `edit-villager ${ shouldShowForm ? '' : 'invis' }`;

    console.log('VillagerForm', VillagerForm);

    return (
      <div class="villager-admin">
        <h2>Villagers</h2>
        <div class="villagers-wrapper">
          <div class="villager-list">
            <button class="e-btn e-btn--cta create-villager" onClick={ handleAddVillager }>Add Villager</button>
            { villagers.map(createVillagerDiv.bind(this)) }
          </div>
          <VillagerForm
            currentVillager={ currentVillager }
            formClass={ formClass }
            isNewVillager={ isNewVillager }
          ></VillagerForm>
        </div>
      </div>
    );
  }
}

render(<StardewAdmin />, document.querySelector('#app'));