// ================================
// 배너 슬라이더
// ================================
class BannerSlider {
    constructor() {
        this.bannerLink = document.querySelector('.Banner-Link');
        this.slides = [
            'https://www.figma.com/api/mcp/asset/7c35b3b1-23af-4fe5-a598-ebddd749acb4'
        ];
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupIndicators();
        this.autoPlay();
    }
    
    setupIndicators() {
        const indicators = document.querySelectorAll('.Banner-circle, .Banner-slide');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateIndicators();
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.Banner-circle, .Banner-slide');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
                indicator.style.opacity = '1';
            } else {
                indicator.classList.remove('active');
                indicator.style.opacity = '0.5';
            }
        });
    }
    
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateIndicators();
        }, 5000);
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// ================================
// 메뉴 스크롤러
// ================================
class MenuScroller {
    constructor(containerSelector, leftButtonSelector, rightButtonSelector) {
        this.container = document.querySelector(containerSelector);
        this.leftButton = document.querySelector(leftButtonSelector);
        this.rightButton = document.querySelector(rightButtonSelector);
        
        if (this.container && this.leftButton && this.rightButton) {
            this.init();
        }
    }
    
    init() {
        this.leftButton.addEventListener('click', () => this.scroll(-340));
        this.rightButton.addEventListener('click', () => this.scroll(340));
        this.container.addEventListener('scroll', () => this.updateButtons());
        this.updateButtons();
    }
    
    scroll(distance) {
        this.container.scrollBy({
            left: distance,
            behavior: 'smooth'
        });
    }
    
    updateButtons() {
        const scrollLeft = this.container.scrollLeft;
        const scrollWidth = this.container.scrollWidth;
        const clientWidth = this.container.clientWidth;
        
        // 왼쪽 버튼 활성화/비활성화
        this.leftButton.disabled = scrollLeft === 0;
        this.leftButton.style.opacity = scrollLeft === 0 ? '0.5' : '1';
        
        // 오른쪽 버튼 활성화/비활성화
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        this.rightButton.disabled = isAtEnd;
        this.rightButton.style.opacity = isAtEnd ? '0.5' : '1';
    }
}

// ================================
// 헤더 스티키 효과
// ================================
class StickyHeader {
    constructor() {
        this.header = document.querySelector('.Header');
        this.lastScrollTop = 0;
        
        if (this.header) {
            this.init();
        }
    }
    
    init() {
        window.addEventListener('scroll', () => this.onScroll());
    }
    
    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            this.header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.boxShadow = 'none';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// ================================
// 부드러운 스크롤 앵커
// ================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// ================================
// 교차 관찰 API (Intersection Observer)
// ================================
class LazyObserver {
    constructor() {
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideIn 0.5s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        document.querySelectorAll('.NewMenu-Link, .BestMenu-Link').forEach(el => {
            observer.observe(el);
        });
    }
}

// ================================
// 페이지 로드 시 초기화
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // 배너 슬라이더 초기화
    const banner = new BannerSlider();
    
    // 메뉴 스크롤러 초기화
    const newMenuScroller = new MenuScroller(
        '.NewMenu-items',
        '.NewMenu-buttonLeft',
        '.NewMenu-buttonRight'
    );
    
    const bestMenuScroller = new MenuScroller(
        '.BestMenu-items',
        '.BestMenu-buttonLeft',
        '.BestMenu-buttonRight'
    );
    
    // 헤더 스티키 효과
    const stickyHeader = new StickyHeader();
    
    // 부드러운 스크롤
    const smoothScroll = new SmoothScroll();
    
    // Lazy Observer
    const lazyObserver = new LazyObserver();
    
    // 반응형 조정 시 스크롤러 업데이트
    window.addEventListener('resize', () => {
        if (newMenuScroller) newMenuScroller.updateButtons();
        if (bestMenuScroller) bestMenuScroller.updateButtons();
    });
});

// ================================
// 모바일 메뉴 토글 (선택 사항)
// ================================
class MobileMenu {
    constructor() {
        this.menuButton = document.querySelector('.menu-toggle');
        this.menu = document.querySelector('.Header-MainMenu');
        
        if (this.menuButton && this.menu) {
            this.init();
        }
    }
    
    init() {
        this.menuButton.addEventListener('click', () => this.toggle());
    }
    
    toggle() {
        this.menu.classList.toggle('active');
        this.menuButton.classList.toggle('active');
    }
}

// 모바일 메뉴 초기화
if (window.innerWidth < 768) {
    // const mobileMenu = new MobileMenu();
}
