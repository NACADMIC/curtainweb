/**
 * 보안 유틸리티 함수
 */

// XSS 공격 방어: HTML 이스케이프
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        '/': '&#x2F;'
    };
    return text.replace(/[&<>"'/]/g, (m) => map[m]);
}

// 입력값 검증
function validateInput(input, maxLength = 1000) {
    if (!input || typeof input !== 'string') {
        return false;
    }
    
    // 길이 제한
    if (input.length > maxLength) {
        return false;
    }
    
    // 위험한 스크립트 태그 차단
    const dangerousPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi, // onclick, onerror 등
        /<iframe/gi,
        /<embed/gi,
        /<object/gi
    ];
    
    for (const pattern of dangerousPatterns) {
        if (pattern.test(input)) {
            return false;
        }
    }
    
    return true;
}

// 이메일 검증
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length < 255;
}

// 전화번호 검증 (한국 번호)
function validatePhone(phone) {
    const phoneRegex = /^[0-9-+() ]{8,20}$/;
    return phoneRegex.test(phone);
}

// 파일 확장자 검증 (이미지만)
function validateImageFile(filename) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const extension = filename.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
}

// Rate Limiting (간단한 클라이언트 측 제한)
const rateLimiter = {
    requests: {},
    
    check: function(key, maxRequests = 5, timeWindow = 60000) {
        const now = Date.now();
        
        if (!this.requests[key]) {
            this.requests[key] = [];
        }
        
        // 시간 윈도우 밖의 요청 제거
        this.requests[key] = this.requests[key].filter(
            time => now - time < timeWindow
        );
        
        // 요청 횟수 확인
        if (this.requests[key].length >= maxRequests) {
            return false; // 제한 초과
        }
        
        // 새 요청 기록
        this.requests[key].push(now);
        return true; // 허용
    }
};

// 안전한 데이터 표시 (XSS 방어)
function safeDisplay(text) {
    if (!text) return '';
    return escapeHtml(String(text));
}

// Export (전역 사용)
if (typeof window !== 'undefined') {
    window.SecurityUtils = {
        escapeHtml,
        validateInput,
        validateEmail,
        validatePhone,
        validateImageFile,
        rateLimiter,
        safeDisplay
    };
}

