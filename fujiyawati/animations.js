document.addEventListener('DOMContentLoaded', () => {
    // --- Logika Menu Mobile (Ditingkatkan untuk UI/UX) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    // Fungsi untuk membuka menu
    const openMenu = () => {
        mobileMenu.classList.add('menu-open');
        menuOverlay.classList.add('overlay-active');
        document.body.classList.add('body-no-scroll');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');

        // Animasi link menu muncul satu per satu dengan GSAP
        gsap.from(mobileMenuLinks, {
            duration: 0.5,
            opacity: 0,
            y: 20,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.2 // Sedikit jeda agar transisi slide menu selesai
        });
    };

    // Fungsi untuk menutup menu
    const closeMenu = () => {
        mobileMenu.classList.remove('menu-open');
        menuOverlay.classList.remove('overlay-active');
        document.body.classList.remove('body-no-scroll');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    };

    if (mobileMenuButton && mobileMenu && menuOverlay) {
        mobileMenuButton.addEventListener('click', () => {
            if (mobileMenu.classList.contains('menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
 
        // Tutup menu saat klik di luar (overlay) atau pada link
        menuOverlay.addEventListener('click', closeMenu);
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- Smooth Scroll untuk semua anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Inisialisasi Ikon Lucide ---
    lucide.createIcons();

    // --- Animasi GSAP ---
    // Daftarkan plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animasi saat halaman pertama kali dimuat
    const timeline = gsap.timeline({ defaults: { duration: 0.7, ease: 'power2.out' } });

    timeline
        .from('header', { y: -100, autoAlpha: 0 }) // Gunakan autoAlpha untuk mengatasi FOUC (Flash of Unstyled Content)
        .from('#home h1', { y: 50, opacity: 0 }, "-=0.4")
        .from('#home p', { y: 50, opacity: 0 }, "-=0.4")
        .from('#home a', { y: 50, opacity: 0, scale: 0.9 }, "-=0.4");

    // Fungsi untuk membuat animasi scroll-triggered
    const createScrollAnimation = (triggerSelector, elementSelector, options = {}) => {
        gsap.from(elementSelector, {
            scrollTrigger: {
                trigger: triggerSelector,
                start: 'top 80%', // Mulai animasi saat 80% bagian atas elemen masuk viewport
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            ...options,
        });
    };

    // Animasi untuk bagian "About Me" (Ditingkatkan dengan Timeline)
    const aboutTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
    });

    aboutTimeline
        .from('#about .md\\:col-span-2', { // Menargetkan kolom gambar untuk konsistensi
            opacity: 0,
            y: 50, // Mengubah animasi dari horizontal (x) menjadi vertikal (y)
            duration: 1,
            ease: 'power3.out'
        })
        .from('#about .md\\:col-span-3 > *', { // Animasi untuk teks
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, "-=0.7"); // <-- Memulai animasi teks 0.7 detik sebelum animasi gambar selesai

    // Animasi untuk "Resume" (Ditingkatkan dengan Timeline)
    const resumeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#resume',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
    });

    resumeTimeline
        .from('#resume h2', { // 1. Animasi untuk judul "My Experience"
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('#resume .hard-shadow > *', { // 2. Animasi untuk setiap item di dalam kotak (pengalaman 1, garis, pengalaman 2)
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.2, // Memberi jeda antar animasi item
            ease: 'power3.out'
        }, "-=0.5"); // <-- Memulai animasi ini 0.5 detik sebelum animasi judul selesai agar lebih mulus

    // Animasi untuk "Selected Projects"
    createScrollAnimation('#work', '#work .hard-shadow');

    // Animasi untuk "Design Process"
    createScrollAnimation('#process', '#process .hard-shadow');

    // Animasi untuk "Tools I Use"
    createScrollAnimation('#tools', '#tools .hard-shadow');

    // Animasi untuk "Client Testimonials"
    createScrollAnimation('#testimonial', '#testimonial .hard-shadow');

    // Animasi untuk "Call to Action"
    createScrollAnimation('#contact', '#contact > div > *');

    // Animasi untuk Footer
    gsap.from('footer > div > div', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 95%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
});
