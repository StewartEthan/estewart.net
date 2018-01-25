/* globals fetch CustomEvent */

import { h, Component } from 'preact';

function titleCase(str) {
  return str
    .split(/\s+/)
    .map(word => word.replace(/^./, word[0].toUpperCase()))
    .join(' ');
}

export class VillagerForm extends Component {
  getCurrentValue(field) {
    const { currentVillager = {} } = this.props;
    return currentVillager[field] || '';
  }

  handleSubmitVillager(evt) {
    const { currentVillager } = this.props;
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
        const detail = { newVillager };
        document.dispatchEvent(new CustomEvent('villager-form-submitted', { detail }));
      });
  }
  
  hideForm() {
    document.dispatchEvent(new CustomEvent('villager-form-hide'));
  }

  render(props, state) {
    const {
      currentVillager = null,
      isNewVillager = true,
      isVisible = false
    } = props;
    const handleSubmitVillager = this.handleSubmitVillager.bind(this);
    const { hideForm } = this;
    const formClass = `edit-villager ${isVisible ? '' : 'invis'}`;
    const inputFields = [ 'name','birthday','region','address' ];
    const { single = false } = currentVillager || {};

    return (
      <form class={ formClass } onSubmit={ handleSubmitVillager }>
        { inputFields.map(field => {
          return (
            <input
              type="text"
              name={ field }
              placeholder={ titleCase(field) }
              value={ this.getCurrentValue(field) }
            />
          );
        }) }
        <div class="marriage">
          <input type="checkbox" name="single" id="single" checked={ single } />
          <label for="single">Single and ready to mingle</label>
        </div>
        <div class="controls">
          <input type="submit" class={ `e-btn e-btn--cta create-villager ${isNewVillager ? '' : 'hide'}` } value="Create Villager" />
          <input type="submit" class={ `e-btn e-btn--cta update-villager ${isNewVillager ? 'hide' : ''}` } value="Save Changes" />
          <button type="button" class="e-btn cancel-changes" onClick={ hideForm }>Cancel</button>
        </div>
      </form>
    );
  }
}