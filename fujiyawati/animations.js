document.addEventListener('DOMContentLoaded', () => {
    // --- Logika Menu Mobile (Baru & Ditingkatkan) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle class untuk animasi slide down/up
            mobileMenu.classList.toggle('menu-open');

            // Ganti ikon menu dengan ikon close (X)
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // Tutup menu mobile ketika salah satu link di dalamnya diklik
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('menu-open')) {
                mobileMenu.classList.remove('menu-open');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    });

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

    // Animasi untuk bagian "About Me"
    gsap.from('#about .hard-shadow', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out'
    });
    gsap.from('#about .md\\:col-span-3 > *', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

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
