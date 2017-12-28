/* globals fetch */

(function(document) {
  // Elements
  const addVillagerBtn = document.querySelector('.create-villager');
  const villagerForm = document.querySelector('form.edit-villager');
  const cancelChangesBtn = villagerForm.querySelector('.cancel-changes');
  const createVillagerBtn = villagerForm.querySelector('.create-villager');
  const updateVillagerBtn = villagerForm.querySelector('.update-villager');
  const villagerList = document.querySelector('.villager-list');
  const villagerDelBtns = villagerList.querySelectorAll('.del-btn');
  const villagerEditBtns = villagerList.querySelectorAll('.edit-btn');

  // Variables
  let currentVillager = null;

  // Event listeners
  addVillagerBtn.addEventListener('click', handleAddVillager);
  cancelChangesBtn.addEventListener('click', handleCancelChanges);
  villagerDelBtns.forEach(btn => btn.addEventListener('click', handleDeleteVillager));
  villagerEditBtns.forEach(btn => btn.addEventListener('click', handleEditVillager));
  villagerForm.addEventListener('submit', handleSubmitVillager);

  // Functions
  function handleAddVillager(e) {
    villagerForm.classList.remove('invis');
    updateVillagerBtn.classList.add('hide');
    createVillagerBtn.classList.remove('hide');

    setCurrentVillager(null);
    villagerForm.reset();
  }

  function handleCancelChanges(e) {
    villagerForm.reset();
    villagerForm.classList.add('invis');
  }

  async function handleDeleteVillager(e) {
    const { _id: id } = JSON.parse(e.target.parentElement.dataset.villager);
    const res = await fetch(`/stardew/villager/${id}`, { method: 'DELETE' });
    console.log('res', res);
  }

  function handleEditVillager(e) {
    villagerForm.classList.remove('invis');
    updateVillagerBtn.classList.remove('hide');
    createVillagerBtn.classList.add('hide');

    setCurrentVillager(e.target.parentElement);

    // const { name, birthday, region, address } = villager;
    [ 'name','birthday','region','address' ].forEach(field => {
      villagerForm[field].value = currentVillager[field];
    });
    villagerForm.single.checked = currentVillager.single;
  }
  
  function handleSubmitVillager(e) {
    e.preventDefault();
    const {
      name: { value: name },
      birthday: { value: birthday },
      region: { value: region },
      address: { value: address },
      single: { checked: single }
    } = e.target;
    const url = currentVillager
      ? `/stardew/villager/${currentVillager._id}`
      : '/stardew/villager';
    const method = currentVillager ? 'PUT' : 'POST';
    const body = JSON.stringify({ name, birthday, region, address, single });
    const headers = { 'Content-Type': 'application/json' };
  
    fetch(url, { method, body, headers });
  }

  function setCurrentVillager(element) {
    currentVillager = element
      ? JSON.parse(element.dataset.villager)
      : element;
  }
}(document));