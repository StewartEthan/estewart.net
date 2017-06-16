const pokeListElem = document.querySelector('.poke-list');
const pokeSearch = document.querySelector('.poke-search');

let pokeList = localStorage.getItem('pokeList');
if (pokeList) {
  pokeList = JSON.parse(pokeList);
  if (pokeSearch) {
    pokeSearch.addEventListener('keyup', updateSearch);
  }
} else {
  pokeList = [];
  const url = '/pkmn?path=pokemon';
  xhr('GET', url, hdr, null, growList);
}

function displayList(list) {
  pokeListElem.innerHTML = '';
  list.forEach(pkmn => {
    const div = document.createElement('div');
    div.textContent = nameCase(pkmn.name);
    pokeListElem.appendChild(div);
  });
}

function growList(result) {
  let list;
  try {
    list = JSON.parse(result.response);
  } catch(err) {
    console.error(`Could not parse result from ${url}:`, err);
    return;
  }
  pokeList = [...pokeList, ...list.results]
  if (list.next) {
    xhr('GET', list.next, hdr, null, growList);
  } else {
    localStorage.setItem('pokeList', JSON.stringify(pokeList));
    if (pokeSearch) {
      pokeSearch.addEventListener('keyup', updateSearch);
    }
  }
}

function nameCase(name) {
  return name.replace(name[0], name[0].toUpperCase());
}

function updateSearch(e) {
  const query = pokeSearch.value;
  if (query !== '') {
    displayList(pokeList.filter(p => p.name.includes(query)));
  }
}