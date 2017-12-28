/* globals fetch */

(function(document) {
  // Elements
  const addVillagerBtn = document.querySelector('.create-villager');
  const villagerForm = document.querySelector('form.edit-villager');
  const createVillagerBtn = villagerForm.querySelector('.create-villager');
  const updateVillagerBtn = villagerForm.querySelector('.update-villager');
  const villagerList = document.querySelector('.villager-list');
  const villagerDelBtns = villagerList.querySelectorAll('.del-btn');
  const villagerEditBtns = villagerList.querySelectorAll('.edit-btn');

  // Variables
  let currentVillagerId = '';

  // Event listeners
  addVillagerBtn.addEventListener('click', handleAddVillager);
  villagerDelBtns.forEach(btn => btn.addEventListener('click', handleDeleteVillager));
  villagerEditBtns.forEach(btn => btn.addEventListener('click', handleEditVillager));
  villagerForm.addEventListener('submit', handleSubmitVillager);

  // Functions
  function handleAddVillager(e) {
    villagerForm.classList.remove('invis');
    updateVillagerBtn.classList.add('hide');
    createVillagerBtn.classList.remove('hide');

    currentVillagerId = '';
    villagerForm.reset();
  }

  function handleDeleteVillager(e) {}

  function handleEditVillager(e) {
    villagerForm.classList.remove('invis');
    updateVillagerBtn.classList.remove('hide');
    createVillagerBtn.classList.add('hide');

    const villager = JSON.parse(e.target.parentElement.dataset.villager);
    currentVillagerId = villager._id;

    // const { name, birthday, region, address } = villager;
    [ 'name','birthday','region','address' ].forEach(field => {
      villagerForm[field].value = villager[field];
    });
  }
  
  function handleSubmitVillager(e) {
    e.preventDefault();
    const {
      name: { value: name },
      birthday: { value: birthday },
      region: { value: region },
      address: { value: address }
    } = e.target;
    const method = currentVillagerId.length > 0 ? 'PUT' : 'POST';
    const body = JSON.stringify({ name, birthday, region, address });
    const headers = { 'Content-Type': 'application/json' };
    
    fetch('/stardew/villager', { method, body, headers });
  }
}(document));