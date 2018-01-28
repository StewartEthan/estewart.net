(function(document){
  const form = document.querySelector('form#generator');
  const output = document.querySelector('.output-wrapper output');
  const rangeWarning = form.querySelector('.range-warning');
  const rangeWarningCloseBtn = rangeWarning.querySelector('.e-alert__close-btn');
  
  let initOutput = document.querySelector('.output-wrapper > div');

  form.addEventListener('submit', handleFormSubmit);
  rangeWarningCloseBtn.addEventListener('click', handleCloseWarning);

  function addMarkupToNumber(num, index) {
    return isEven(index)
      ? `<strong>${num}</strong>`
      : `<span>${num}</span>`;
  }

  function generateNumbers({ length, min, max }, dupesAllowed) {
    let list = [];
    let addFn = 'push';
    let lenProp = 'length';
    if (!dupesAllowed) {
      list = new Set();
      addFn = 'add';
      lenProp = 'size';
    }

    while (list[lenProp] < length) {
      list[addFn](random(min, max + 1));
    }

    return [ ...list ];
  }

  function handleCloseWarning(e) {
    rangeWarning.classList.add('hide');
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const inputs = {};
    for (const input of [ 'range','min','max' ]) {
      inputs[input] = parseInt(form[input].value, 10);
    }
    const dupesAllowed = form.dupeToggle.checked;

    const maxRange = Math.abs(inputs.max - inputs.min + 1);
    const mostPossible = Math.min(inputs.range, maxRange);
    if (!dupesAllowed && mostPossible < inputs.range) {
      inputs.length = mostPossible;

      rangeWarning.querySelector('.min').textContent = inputs.min;
      rangeWarning.querySelector('.max').textContent = inputs.max;
      rangeWarning.querySelector('.max-range').textContent = maxRange;
      rangeWarning.classList.remove('hide');
    } else {
      inputs.length = inputs.range;
      rangeWarning.classList.add('hide');
    }

    const numbers = generateNumbers(inputs, dupesAllowed);

    if (initOutput) {
      initOutput.remove();
      initOutput = null;
      output.classList.remove('hide');
    }
    output.innerHTML = numbers
      .map(addMarkupToNumber)
      .join(' ');
  }
}(document));