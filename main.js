// penjelasannya:
// Toggle Navbar yaitu Membuat navigasi responsif dapat 
// -ditampilkan dan disembunyikan ketika tombol toggler pada navbar ditekan.
// Validasi Form Kritik & Saran: Memastikan semua input (nama, NIM, pesan) diisi
//- sebelum form dikirim. Jika form tidak lengkap, pesan peringatan muncul.
// Smooth Scroll: Menambahkan animasi scroll halus ketika user mengklik link navigasi
// -yang menuju ke bagian lain pada halaman.
// Reset Form Modal adalsh Ketika modal Kritik & Saran ditutup, input form akan direset.




document.addEventListener('DOMContentLoaded', function() {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('#navbarNav');

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        var nameInput = document.querySelector('#name');
        var nimInput = document.querySelector('#nim');
        var messageInput = document.querySelector('#message');

       
        if (!nameInput.value || !nimInput.value || !messageInput.value) {
            alert("Please fill in all fields.");
            event.preventDefault();
        } else {
            alert("Kritik & Saran successfully submitted!");
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('kritikSaranModal');
    var modalInstance = new bootstrap.Modal(modal);
    
    modal.addEventListener('hidden.bs.modal', function() {
        var form = modal.querySelector('form');
        form.reset();
    });
});



// Function to date/display
function displayDate() {
    var today = new Date();
    var dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    var day = dayNames[today.getDay()];
    var date = today.getDate();
    var month = monthNames[today.getMonth()];
    var year = today.getFullYear();

    var fullDate = `${day}, ${date} ${month} ${year}`;
    document.getElementById('currentDate').textContent = fullDate;
}

// (OpenStreetMap Nominatim API)
function displayLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

          
            var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.address) {
                        var city = data.address.city || data.address.town || data.address.village || "Lokasi tidak ditemukan";
                        var country = data.address.country || "Negara tidak ditemukan";
                        document.getElementById('location').textContent = `${city}, ${country}`;
                    } else {
                        document.getElementById('location').textContent = 'Lokasi tidak dapat ditemukan.';
                    }
                })
                .catch(() => {
                    document.getElementById('location').textContent = 'Tidak dapat mengakses lokasi.';
                });
        }, function() {
            document.getElementById('location').textContent = 'Lokasi tidak dapat diakses.';
        });
    } else {
        document.getElementById('location').textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayDate();
    displayLocation();
});




