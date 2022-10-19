const update = document.querySelector('#update-button');

update.addEventListener('click', (_) => {
  fetch('/notes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'another author',
      note: 'another note',
    }),
  });
});
