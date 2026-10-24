// Fungsi memuat modul
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal memuat ${url}`);
        const text = await response.text();
        document.getElementById(id).innerHTML = text;
    } catch (error) {
        console.error("Pastikan Anda menjalankan aplikasi via Web Server (XAMPP/Live Server).", error);
    }
}

// Inisialisasi Utama
document.addEventListener("DOMContentLoaded", async () => {
    // Tunggu hingga header dan footer selesai di-load
    await Promise.all([
        loadComponent("header-placeholder", "components/header.html"),
        loadComponent("footer-placeholder", "components/footer.html")
    ]);
    
    // Aktifkan logika interaktif setelah komponen tersedia
    initUI();
});

function initUI() {
    // 1. Logika Navbar Scroll
    const navbar = document.getElementById('main-navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white', 'shadow-md', 'text-slate-800');
                navbar.classList.remove('bg-transparent', 'text-white');
            } else {
                navbar.classList.add('bg-transparent', 'text-white');
                navbar.classList.remove('bg-white', 'shadow-md', 'text-slate-800');
            }
        });
    }

    // 2. Logika Animasi Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // 3. Simulasi Pengiriman Form Kontak
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah reload halaman
            const btn = document.getElementById('submitBtn');
            const originalText = btn.innerHTML;
            
            // State loading
            btn.innerHTML = 'Memproses Proposal...';
            btn.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Simulasi proses API ke backend (2 detik)
            setTimeout(() => {
                alert('Berhasil! Proposal Kemitraan Anda telah terkirim ke sistem kami. Tim B2B kami akan segera menghubungi Anda.');
                
                // Reset form & tombol
                form.reset();
                btn.innerHTML = originalText;
                btn.classList.remove('opacity-75', 'cursor-not-allowed');
            }, 2000);
        });
    }
}