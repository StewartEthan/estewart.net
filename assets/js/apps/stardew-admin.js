/* globals fetch */

(function(document) {
  const createForm = document.querySelector('form.add-villager');
  const villagerList = document.querySelector('.villager-list');

  createForm.addEventListener('submit', handleCreateVillager);

  loadPage();

  function handleCreateVillager(e) {
    e.preventDefault();
    
    const {
      name: { value: name },
      birthday: { value: birthday },
      region: { value: region },
      address: { value: address }
    } = e.target;
    const method = 'POST';
    const body = JSON.stringify({ name, birthday, region, address });
    const headers = { 'Content-Type': 'application/json' };

    fetch('/stardew/villager', { method, body, headers });
  }

  async function loadPage() {
    const villagers = await fetch('/stardew/villager/all').then(res => res.json());
    villagers.forEach(villager => {
      const div = document.createElement('div');
      div.classList.add('villager');
      div.innerHTML = `
        <span>${villager.name}</span>
        <button data-id="${villager._id}">Edit</button>
      `;
      villagerList.appendChild(div);
    });
  }
}(document));