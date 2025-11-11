// 페이지 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js 로드됨');

    // 햄버거 메뉴 토글
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 스크롤 애니메이션
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 제품 카드 클릭 이벤트
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('제품 클릭됨');
            });
        });
    }
});

// Ctrl + Shift + A 키 조합으로 관리자 페이지 이동
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        window.location.href = 'admin/login.html';
    }
});
