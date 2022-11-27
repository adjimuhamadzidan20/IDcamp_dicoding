// membuat storage
let STORAGE_KEY = "BOOKSHELF_STORAGE";

// event custom
let RENDEREVENT = "RENDER";
let SAVINGEVENT = "SAVED";
let BOOKSHELF = [];

// membangkitkan elemen dengan DOM
document.addEventListener('DOMContentLoaded', function() {
	let submitBook = document.getElementById('inputBook');
	submitBook.addEventListener('submit', function(e) {
		e.preventDefault();
		tangkapData();
	});

	// check web storage 
	if (typeof(Storage) !== 'undefined') {
		if (localStorage.getItem(STORAGE_KEY) !== null) {
			ambilData();
		}
	} else {
		console.log('Browser anda belum support web storage');
	}
});

// aksi render
document.addEventListener(RENDEREVENT, function() {
	// belum selesai membaca
	const belumSelesaiBaca = document.getElementById('incompleteBookshelfList');
	belumSelesaiBaca.innerHTML = '';

	// sudah selesai membaca
	const sudahSelesaiBaca = document.getElementById('completeBookshelfList');
	sudahSelesaiBaca.innerHTML = '';

	for (listData of BOOKSHELF) {
		let dataElemen = outputListLayout(listData);
		if (!listData.isCompleted) {
			belumSelesaiBaca.append(dataElemen);
		} else {
			sudahSelesaiBaca.append(dataElemen);
		}
	}
});

// fungsi generate data objek
function objekGenerate(id, title, author, year, isCompleted) {
	return {
		id, title, author, year, isCompleted
	}
}

// mengambil data dari localstorage
function ambilData() {
	let getData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(getData);

	if (data !== null) {
		for (const buku of data) {
			BOOKSHELF.push(buku);
		}
	}

	document.dispatchEvent(new Event(RENDEREVENT));
}	

// fungsi meng generate kode id
function generateID() {
	return +new Date();
}

// fungsi menangkap inputan user
function tangkapData() {
	let inputID = generateID();
	let masukanJudul = document.getElementById('inputBookTitle').value;
	let masukanPenulis = document.getElementById('inputBookAuthor').value;
	let masukanTahun = document.getElementById('inputBookYear').value;
	let selesaiDibaca = document.getElementById('inputBookIsComplete').checked;

	let objek = objekGenerate(inputID, masukanJudul, masukanPenulis, masukanTahun, selesaiDibaca);
	BOOKSHELF.push(objek);

	document.dispatchEvent(new Event(RENDEREVENT));
	simpanData();

	document.getElementById('inputBookTitle').value = '';
	document.getElementById('inputBookAuthor').value = '';
	document.getElementById('inputBookYear').value = '';
	document.getElementById('inputBookIsComplete').checked = '';
}

// menyimpan data buku ke local storage
function simpanData() {
	if (typeof(Storage) !== 'undefined') {
		const parseString = JSON.stringify(BOOKSHELF);
		localStorage.setItem(STORAGE_KEY, parseString);
		document.dispatchEvent(new Event(SAVINGEVENT)); 
	}
}

// menampilkan output list data
function outputListLayout(data) {
	const judulTitle = document.createElement('h3');
	judulTitle.innerText = data.title;

	const namaPenulis = document.createElement('p');
	namaPenulis.innerText = data.author;

	const tahunTerbit = document.createElement('p');
	tahunTerbit.innerText = data.year; 

	const isiContainer = document.createElement('div');
	isiContainer.classList.add('action');
	isiContainer.append(judulTitle, namaPenulis, tahunTerbit);

	const divContainer = document.createElement('div');
	divContainer.classList.add('book_item');
	divContainer.append(isiContainer);
	divContainer.setAttribute('id', `book${data.id}`);

	if (data.isCompleted) {
		let greenBtn = document.createElement('button');
		greenBtn.classList.add('green');
		greenBtn.innerText = 'Belum Selesai dibaca';
		greenBtn.addEventListener('click', function() {
			undoSelesai(data.id);
		});

		let redBtn = document.createElement('button');
		redBtn.classList.add('red');
		redBtn.innerText = 'Sudah Selesai dibaca';
		redBtn.addEventListener('click', function() {
			hapusBuku(data.id);
		});

		isiContainer.append(greenBtn, redBtn);
	} else {
		let btnSelesai = document.createElement('button');
		btnSelesai.classList.add('green');
		btnSelesai.innerText = 'Selesai dibaca';
		btnSelesai.addEventListener('click', function() {
			Selesai(data.id);
		});

		let btnHapus = document.createElement('button');
		btnHapus.classList.add('red');
		btnHapus.innerText = 'Hapus';
		btnHapus.addEventListener('click', function() {
			hapusBuku(data.id);
		});

		isiContainer.append(btnSelesai, btnHapus);
	}

	return divContainer;
}		

function index(IDbook) {
	for (const index in BOOKSHELF) {
		if (BOOKSHELF[index].id == IDbook) {
			return index;
		}
	}

	return -1;
}

function undoSelesai(IDbook) {
	const targetBuku = index(IDbook);

	if (targetBuku == null) return;
	BOOKSHELF[targetBuku].isCompleted = false;
	document.dispatchEvent(new Event(RENDEREVENT));
	simpanData();
}

function hapusBuku(IDbook) {
	const targetBuku = index(IDbook);

	if (targetBuku === -1) return;
	BOOKSHELF.splice(targetBuku, 1);
	document.dispatchEvent(new Event(RENDEREVENT));
	simpanData();
}

function Selesai(IDbook) {
	const targetBuku = index(IDbook);

	if (targetBuku == null) return;
	BOOKSHELF[targetBuku].isCompleted = true;
	document.dispatchEvent(new Event(RENDEREVENT));
	simpanData();
}