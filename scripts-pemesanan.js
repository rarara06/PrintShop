// Fungsi untuk mereset formulir pemesanan
const resetOrderForm = () => {
    document.getElementById('orderForm').reset(); // Reset formulir pemesanan
    document.getElementById('totalOrderPrice').innerText = 'Rp 0'; // Mengatur total harga kembali ke 0
    document.getElementById('fileDetails').innerText = ''; // Menghapus detail file yang diunggah
};

// Fungsi untuk menghitung total harga pemesanan
const calculateOrderTotalPrice = () => {
    const fileInput = document.getElementById('file');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function(event) {
            const typedarray = new Uint8Array(event.target.result);
            pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                const pages = pdf.numPages;
                const totalPrice = pages * productPricePerPage;
                document.getElementById('totalOrderPrice').innerText = 'Rp ' + totalPrice.toLocaleString();
            });
        };

        fileReader.readAsArrayBuffer(file);
    } else {
        document.getElementById('totalOrderPrice').innerText = 'Rp 0';
    }
};

// Fungsi untuk menampilkan notifikasi pemesanan berhasil
const showOrderNotification = () => {
    // Menampilkan notifikasi pemesanan berhasil
    document.getElementById('notification').classList.remove('hidden');
    document.getElementById('notifText').innerText = 'Pemesanan berhasil! Kami akan menghubungi Anda segera.';
    
    // Reset formulir pemesanan setelah notifikasi muncul
    resetOrderForm();

    // Menyembunyikan notifikasi setelah beberapa detik
    setTimeout(function() {
        document.getElementById('notification').classList.add('hidden');
        window.location.reload(); // Memuat ulang halaman setelah notifikasi menghilang
    }, 5000); // 5 detik
};

// Event listener untuk saat formulir pemesanan disubmit
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah perilaku bawaan pengiriman formulir

    // Menghitung total harga pemesanan
    calculateOrderTotalPrice();

    // Menampilkan notifikasi pemesanan berhasil
    showOrderNotification();
});

// Event listener untuk saat ada perubahan pada input file
document.getElementById('file').addEventListener('change', calculateOrderTotalPrice);

const productPricePerPage = 500; // Harga per halaman
