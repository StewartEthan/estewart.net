/* globals fetch */

(function(document) {
  const createForm = document.querySelector('form.add-villager');

  createForm.addEventListener('submit', handleCreateVillager);

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
}(document));