document.addEventListener('DOMContentLoaded', () => {
    // --- Global Logic (All Pages) ---
    
    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Determine relative path based on location
            const isInsideView = window.location.pathname.includes('/view/');
            window.location.href = isInsideView ? 'login.html' : 'assets/view/login.html';
        });
    }

    // Product Card Redirection
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const isInsideView = window.location.pathname.includes('/view/');
            window.location.href = isInsideView ? 'produto.html' : 'assets/view/produto.html';
        });
    });

    // --- Home Page Specific (Carousel) ---
    const slidesContainer = document.getElementById('carousel-slides');
    if (slidesContainer) {
        const slides = document.querySelectorAll('#carousel-slides figure');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        const updateCarousel = () => {
            const offset = -currentIndex * 100;
            slidesContainer.style.transform = `translateX(${offset}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        };

        let autoPlay = setInterval(nextSlide, 5000);

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                nextSlide();
                autoPlay = setInterval(nextSlide, 5000);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(autoPlay);
                prevSlide();
                autoPlay = setInterval(nextSlide, 5000);
            });
        }
    }

    // --- Product Detail Specific (Image Gallery) ---
    const thumbs = document.querySelectorAll('.produto-imagem aside img');
    const mainImg = document.getElementById('imgPrincipal');
    if (thumbs.length > 0 && mainImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImg.src = thumb.src;
                // Update active class
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // Size selection display
    const sizeButtons = document.querySelectorAll('.produto-info .produto-button li a');
    const sizeDisplay = document.getElementById('tamanho-selecionado');
    if (sizeButtons.length > 0 && sizeDisplay) {
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Only if parent text is "Tamanhos:" or logically the size section
                if (btn.closest('.produto-button').previousElementSibling.innerText.includes('Tamanhos')) {
                    e.preventDefault();
                    sizeDisplay.innerText = `Tamanho Selecionado: ${btn.innerText}`;
                }
            });
        });
    }

    // --- Product List Generation (Ver Produtos Page) ---
    const grid = document.getElementById('products-grid');
    // Only run if grid is empty (to avoid duplication if called multiple times)
    if (grid && grid.children.length === 0) {
        for (let i = 1; i <= 10; i++) {
            const article = document.createElement('article');
            article.className = `product-card`;
            article.innerHTML = `
                <img src="../imagem/produto1.png" alt="Camisa Front-End CSS">
                <h3>Camisa Desenvolvedor Front-End CSS</h3>
                <p class="brand"><b>Fabricante:</b> Eletiva Uniformes</p>
                <p class="description"><b>Descrição:</b> Uma Camisa Ideal para programar por mais de 12 horas</p>
                <footer>
                    <span class="price">R$ 59,90</span>
                    <span class="stock">171 disponíveis</span>
                </footer>
            `;
            article.addEventListener('click', () => {
                window.location.href = 'produto.html';
            });
            grid.appendChild(article);
        }
    }
});
