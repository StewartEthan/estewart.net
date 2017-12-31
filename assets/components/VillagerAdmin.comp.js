import { h, Component } from 'preact';
import { VillagerForm } from './VillagerForm.comp.js';
import { VillagerList } from './VillagerList.comp.js';

export class VillagerAdmin extends Component {
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
    document.addEventListener('villager-form-hide', e => this.setState({ shouldShowForm: false }));
    document.addEventListener('villager-form-submitted', ({ detail }) => {
      const { newVillager } = detail;
      const { currentVillager } = this.state;
      const villagers = currentVillager
        ? this.state.villagers.map(villager => this.replaceVillager(villager, newVillager))
        : [ ...this.state.villagers, newVillager ].sort(this.sortVillagers);
      this.setState({ currentVillager: null, villagers });
    });
    document.addEventListener('villager-add', this.handleAddVillager.bind(this));
    document.addEventListener('villager-edit', ({ detail: villager }) => this.handleEditVillager(villager));
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

  replaceVillager(oldVillager, newVillager) {
    return oldVillager._id === newVillager._id ? newVillager : oldVillager;
  }

  showForm() {
    this.setState({ shouldShowForm: true });
  }

  sortVillagers(a, b) {
    return a.name > b.name;
  }

  render(props, { villagers, isVisible, currentVillager, isNewVillager }) {
    return (
      <div class="villager-admin">
        <h2>Villagers</h2>
        <div class="villagers-wrapper">
          <VillagerList villagers={ villagers }></VillagerList>
          <VillagerForm
            currentVillager={ currentVillager }
            formClass={ formClass }
            isNewVillager={ isNewVillager }
            isVisible={ isVisible }
          ></VillagerForm>
        </div>
      </div>
    );
  }
}