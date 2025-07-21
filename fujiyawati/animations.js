document.addEventListener('DOMContentLoaded', () => {
    // --- Logika Menu Mobile (dipindahkan dari index.html) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Inisialisasi Ikon Lucide ---
    lucide.createIcons();

    // --- Animasi GSAP ---
    // Daftarkan plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animasi saat halaman pertama kali dimuat
    const timeline = gsap.timeline({ defaults: { duration: 0.7, ease: 'power2.out' } });

    timeline
        .from('header', { y: -100, opacity: 0 })
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