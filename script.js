let bugs = [];

function addBug() {
  const input = document.getElementById('bugInput');
  const text = input.value.trim();
  if (text === '') return;

  bugs.push({ text, resolved: false });
  input.value = '';
  renderBugs();
}

function renderBugs(filter = 'all') {
  const list = document.getElementById('bugList');
  list.innerHTML = '';

  let filteredBugs = bugs;
  if (filter === 'resolved') filteredBugs = bugs.filter(b => b.resolved);
  if (filter === 'open') filteredBugs = bugs.filter(b => !b.resolved);

  filteredBugs.forEach((bug, index) => {
    const li = document.createElement('li');
    li.className = 'bug-item';

    const bugText = document.createElement('span');
    bugText.className = 'bug-text';
    bugText.textContent = bug.text;
    if (bug.resolved) bugText.classList.add('bug-resolved');

    const actions = document.createElement('div');
    actions.className = 'bug-actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = bug.resolved ? 'Reopen' : 'Resolve';
    toggleBtn.onclick = () => toggleBug(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => deleteBug(index);

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(bugText);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

function toggleBug(index) {
  bugs[index].resolved = !bugs[index].resolved;
  renderBugs();
}

function deleteBug(index) {
  bugs.splice(index, 1);
  renderBugs();
}

function filterBugs(type) {
  renderBugs(type);
}
