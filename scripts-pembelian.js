// Harga produk
const productPrices = {
    'karton': 5000,
    'rafia': 3000,
    'kardus': 5000,
    'sepatu': 2000,
    'pita': 3000,
    'peniti': 1000
};

// Fungsi untuk mereset formulir pembelian
const resetPurchaseForm = () => {
    document.getElementById('purchaseForm').reset(); // Reset formulir pembelian
    document.querySelectorAll('.quantity').forEach(input => {
        input.value = ''; // Mengatur semua input jumlah barang kembali kosong
    });
    document.getElementById('totalPurchasePrice').innerText = 'Rp 0'; // Mengatur total harga kembali ke 0
};

// Fungsi untuk menghitung total harga pembelian
const calculatePurchaseTotalPrice = () => {
    let total = 0;

    // Loop melalui setiap produk pada form pembelian
    document.querySelectorAll('.product').forEach(product => {
        const quantity = parseInt(product.querySelector('.quantity').value) || 0; // Mendapatkan jumlah barang
        const id = product.dataset.id;
        const price = productPrices[id]; // Harga produk
        total += quantity * price; // Menambahkan harga produk yang sudah dihitung ke total
    });

    // Menampilkan total harga pembelian
    document.getElementById('totalPurchasePrice').innerText = 'Rp ' + total.toLocaleString();
};

// Fungsi untuk menampilkan notifikasi pembelian berhasil dan mereset formulir pembelian
const showPurchaseNotification = () => {
    // Menghitung total harga pembelian sebelum menampilkan notifikasi
    calculatePurchaseTotalPrice();

    // Menampilkan notifikasi pembelian berhasil
    const notification = document.getElementById('purchaseNotification');
    notification.classList.remove('hidden');
    notification.innerText = 'Pembelian berhasil! Kami akan menghubungi Anda segera.';

    // Reset formulir pembelian dan sembunyikan notifikasi setelah beberapa detik
    setTimeout(function() {
        notification.classList.add('hidden');
        resetPurchaseForm();
    }, 5000); // 5 detik
};

// Event listener untuk form pembelian
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah perilaku bawaan pengiriman formulir

    // Menampilkan notifikasi pembelian berhasil
    showPurchaseNotification();
});

// Event listener untuk setiap input jumlah barang pada pembelian
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', calculatePurchaseTotalPrice);
});
