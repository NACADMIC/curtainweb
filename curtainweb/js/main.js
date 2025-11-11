// 햄버거 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 스크롤 애니메이션
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 상담 폼 제출
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('상담신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    contactForm.reset();
});

// 제품 이미지 클릭 이벤트
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        // 제품 상세 정보 모달 표시 로직
        console.log('제품 클릭됨');
    });
});

// main.js 파일에 추가
document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + A 를 동시에 누르면 관리자 페이지로 이동
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        window.location.href = '/admin/login.html';
    }
}); 