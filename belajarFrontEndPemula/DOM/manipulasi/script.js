let gambar = document.getElementById('gambar'); // menangkap elemen gambar
gambar.setAttribute('width', 300);
gambar.setAttribute('height', 215);

let button = document.querySelectorAll('.button'); // menangkap seluruh elemen div class button
let playbtn = button[3]; // mengambil elemen button bernama play button dalam div
let tagPlayBtn = playbtn.children[0]; // mengambil child dari div yaitu button
tagPlayBtn.setAttribute('type', 'submit');

const dicoding = document.getElementById('dicodingLink');
dicoding.innerHTML = 'Belajar Programming di Dicoding';

for (const btn of button) {
    btn.children[0].style.borderRadius = '6px';
}
