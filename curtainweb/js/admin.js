// 로그인 처리
document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('adminId').value;
    const pw = document.getElementById('adminPw').value;
    
    // 기본 관리자 계정 (실제 서비스에서는 서버에서 처리해야 함)
    if(id === 'admin' && pw === '1234') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
});

// 로그인 상태 체크
function checkLogin() {
    if(!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }
} 