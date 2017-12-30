/* globals CustomEvent */

import { h, Component } from 'preact';

export class VillagerForm extends Component {
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
    document.dispatchEvent(new CustomEvent('hide-villager-form'));
  }

  render(props, state) {
    const {
      currentVillager = null,
      formClass = '',
      isNewVillager = true
    } = props;
    const {
      name = '',
      birthday = '',
      region = '',
      address = '',
      single = false
    } = currentVillager || {};
    const handleSubmitVillager = this.handleSubmitVillager.bind(this);
    const { hideForm } = this;
    // const inputFields = ['name','birthday','region','address'];

    return (
      <form class={ formClass } onSubmit={ handleSubmitVillager }>
        {/* { inputFields.map(field => {
          return (
            <input
              type="text"
              name={ field }
              placeholder={ field.replace(/^./, field[0].toUpperCase()) }
              value={ (currentVillager || {})[field] || '' }
            />
          );
        }) } */}
        <input type="text" name="name" placeholder="Name" value={ name } />
        <input type="text" name="birthday" placeholder="Birthday" value={ birthday } />
        <input type="text" name="region" placeholder="Region" value={ region } />
        <input type="text" name="address" placeholder="Address" value={ address } />
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