let items = [];

const itemNameInput = document.getElementById('itemName');
const itemForm = document.getElementById('itemForm');
const itemsTable = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];

itemForm.addEventListener('submit', event => {
	event.preventDefault();
	const itemName = itemNameInput.value.trim();

	if (itemName) {
		const newItem = {
			id: Date.now(),
			name: itemName,
		};
		items.push(newItem);
		renderItems();
		itemNameInput.value = '';
	}
});

function renderItems() {
	itemsTable.innerHTML = '';

	items.forEach(item => {
		const row = itemsTable.insertRow();
		const nameCell = row.insertCell(0);
		const actionsCell = row.insertCell(1);

		nameCell.textContent = item.name;

		const updateButton = document.createElement('button');
		updateButton.textContent = 'Update';
		updateButton.onclick = () => updateItem(item.id);

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.onclick = () => deleteItem(item.id);

		actionsCell.appendChild(updateButton);
		actionsCell.appendChild(deleteButton);
	});
}

function updateItem(id) {
	const newName = prompt('Enter new item name:');

	if (newName) {
		const item = items.find(i => i.id === id);
		item.name = newName;
		renderItems();
	}
}

function deleteItem(id) {
	items = items.filter(item => item.id !== id);
	renderItems();
}

renderItems();
