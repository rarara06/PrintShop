// Harga produk
const productPrices = {
    'karton': 5000,
    'rafia': 3000,
    'kardus': 5000,
    'sepatu': 2000,
    'pita': 3000,
    'peniti': 1000
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

// Fungsi untuk menampilkan notifikasi pembelian berhasil
const showPurchaseNotification = () => {
    document.getElementById('purchaseNotification').classList.remove('hidden');
    
    // Simulasikan pelacakan pesanan
    setTimeout(function() {
        document.getElementById('purchaseTracking').classList.remove('hidden');
        document.getElementById('purchaseOrderStatus').innerText = 'Diproses';
        
        // Ubah status menjadi 'Selesai' setelah beberapa detik
        setTimeout(function() {
            document.getElementById('purchaseOrderStatus').innerText = 'Selesai';
        }, 5000); // 15 detik
    }, 2000); // 10 detik
};

// Event listener untuk form pembelian
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah perilaku bawaan pengiriman formulir

    // Menghitung total harga pembelian
    calculatePurchaseTotalPrice();

    // Menampilkan notifikasi pembelian berhasil
    showPurchaseNotification();
});


// Event listener untuk setiap input jumlah barang pada pembelian
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', calculatePurchaseTotalPrice);
});
