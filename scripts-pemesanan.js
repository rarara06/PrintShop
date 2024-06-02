// Fungsi untuk menghitung total harga pemesanan
const calculateOrderTotalPrice = () => {
    const pages = parseInt(document.getElementById('pages').value) || 0;
    const isColor = document.getElementById('color').checked;
    const pricePerPage = isColor ? 1000 : 500;
    const total = pages * pricePerPage;

    // Update tampilan total harga
    document.getElementById('totalOrderPrice').innerText = `Rp ${total.toLocaleString()}`;
};

// Fungsi untuk memperbarui notifikasi status
const updateNotification = (status) => {
    const notifText = document.getElementById('notifText');
    if (status === 'proses') {
        notifText.innerText = 'Pemesanan sedang diproses.';
    } else if (status === 'selesai') {
        notifText.innerText = 'Pemesanan selesai. Terima kasih!';
    }
};

// Fungsi untuk menjalankan notifikasi berurutan
const runSequentialNotification = () => {
    setTimeout(() => updateNotification('proses'), 3000); // 10 detik untuk status "Proses"
    setTimeout(() => updateNotification('selesai'), 6000); // 15 detik untuk status "Selesai"
};

// Event listener untuk form pemesanan
document.getElementById('orderForm').addEventListener('submit', event => {
    event.preventDefault(); // Mencegah form submit

    // Ambil nilai input dari formulir pemesanan
    const formData = new FormData(event.target);
    const orderDetails = {};

    formData.forEach((value, key) => {
        orderDetails[key] = value;
    });

    // Simpan data pemesanan ke localStorage
    localStorage.setItem('copyOrder', JSON.stringify(orderDetails));

    // Tampilkan notifikasi pemesanan
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    document.getElementById('notifText').innerText = 'Pemesanan berhasil! Kami akan menghubungi Anda segera.';

    // Jalankan notifikasi berurutan
    runSequentialNotification();
});

// Event listener untuk menghitung total harga secara otomatis saat nilai input berubah
document.getElementById('pages').addEventListener('input', calculateOrderTotalPrice);
document.getElementById('color').addEventListener('change', calculateOrderTotalPrice);

// Inisialisasi perhitungan awal
calculateOrderTotalPrice();
