// Buatlah logika if untuk mengevaluasi nilai score dengan ketentuan:
// 1. Jika nilai score lebih atau sama dengan 90
//   - Isi variabel result dengan nilai: 'Selamat! Anda mendapatkan nilai A.'
// 2. Jika nilai score ada di antara 80 hingga 89
//   - Isi variabel result dengan nilai: 'Anda mendapatkan nilai B.'
// 3. Jika nilai score ada di antara 70 hingga 79
//   - Isi variabel result dengan nilai: 'Anda mendapatkan nilai C.'
// 4. Jika nilai score ada di antara 60 hingga 69:
//   - Isi variabel result dengan nilai: 'Anda mendapatkan nilai D.'
// 5. Jika nilai score di bawah 60:
//   - Isi variabel result dengan nilai: 'Anda mendapatkan nilai E.'

let nilaiScore = 55;

if (nilaiScore >= 90) {
    console.log('Selamat! Anda mendapatkan nilai A.');
} 

else if (nilaiScore >= 80 && nilaiScore <= 89) {
    console.log('Anda mendapatkan nilai B.');
}

else if (nilaiScore >= 70 && nilaiScore <= 79) {
    console.log('Anda mendapatkan nilai C.');
}

else if (nilaiScore >= 60 && nilaiScore <= 69) {
    console.log('Anda mendapatkan nilai D.');
}

else {
    console.log('Anda mendapatkan nilai E.');
}