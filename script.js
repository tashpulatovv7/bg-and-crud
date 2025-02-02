const form = document.getElementById('form');
const usersList = document.getElementById('users-list');
const error = document.getElementById('error');

form.addEventListener('submit', e => {
	e.preventDefault();

	const newUser = {
		id: Date.now(),
		name: form.name.value,
		email: form.email.value,
		age: form.age.value,
	};

	const res = fetch('http://localhost:3000/users', {
		method: 'POST',
		body: JSON.stringify(newUser),
	});

	if (res.ok) {
		alert("Foydalanuvchi qo'shildi!");
		form.reset();
	} else {
		alert("Foydalanuvchi qo'shildi!");
	}
});

async function getUsers() {
	const res = await fetch('http://localhost:3000/users');
	const data = await res.json;

	if (res.status !== 200 || res.ok !== true) {
		throw new Error('Malumot olishda xatolik!');
	}

	return data;
}

getUsers()
	.then(data => {
		renderUsers(data);
	})

	.catch(err => {
		error.innerHTML = err.message;
	});

function renderUsers(users) {
	if (users.length) {
		users.map(user => {
			const div = document.createElement('div');

			div.innerHTML = `<h2>Ismi: ${user.name}</h2>
                <p>Email: ${user.email}</p>
                <h2>Yoshi: ${user.age}</h2>`;

			usersList.appendChild(div);
		});
	}
}
