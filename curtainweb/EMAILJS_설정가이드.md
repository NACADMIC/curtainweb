# EmailJS 설정 가이드

이메일 전송 기능을 활성화하려면 EmailJS 서비스 설정이 필요합니다.

## 1단계: EmailJS 계정 생성

1. https://www.emailjs.com/ 접속
2. "Sign Up" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

## 2단계: 이메일 서비스 연결

1. EmailJS 대시보드에서 "Email Services" 클릭
2. "Add New Service" 클릭
3. Gmail을 선택하거나 원하는 이메일 서비스 선택
4. okyoucandoit@hanmail.net를 사용하려면 "Custom SMTP" 선택
   - SMTP Server: smtp.daum.net
   - Port: 465
   - Username: okyoucandoit@hanmail.net
   - Password: 이메일 비밀번호 입력
5. "Create Service" 클릭
6. **Service ID를 복사하여 저장** (예: service_abc123)

## 3단계: 이메일 템플릿 생성

1. EmailJS 대시보드에서 "Email Templates" 클릭
2. "Create New Template" 클릭
3. 템플릿 작성:

```
제목: [유명커튼블라인드] 새로운 상담 신청

내용:
안녕하세요, 새로운 상담 신청이 접수되었습니다.

이름: {{from_name}}
연락처: {{phone}}
주소: {{address}}
문의사항:
{{message}}
```

4. "Save" 클릭
5. **Template ID를 복사하여 저장** (예: template_xyz789)

## 4단계: Public Key 확인

1. EmailJS 대시보드에서 "Account" 클릭
2. "API Keys" 탭 클릭
3. **Public Key를 복사** (예: abcdef123456)

## 5단계: HTML 파일 수정

**index.html**와 **pages/contact.html** 두 파일 모두 수정해야 합니다.

### 1) Public Key 입력

**index.html** (13번째 줄 근처):
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // 여기에 복사한 Public Key 입력
```

**pages/contact.html** (13번째 줄 근처):
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // 여기에 복사한 Public Key 입력
```

### 2) Service ID와 Template ID 입력

**index.html** (266-267번째 줄 근처):
```javascript
await emailjs.send(
    'YOUR_SERVICE_ID',      // 여기에 복사한 Service ID 입력
    'YOUR_TEMPLATE_ID',     // 여기에 복사한 Template ID 입력
    {
        to_email: 'okyoucandoit@hanmail.net',
        ...
    }
);
```

**pages/contact.html** (217-218번째 줄 근처):
```javascript
await emailjs.send(
    'YOUR_SERVICE_ID',      // 여기에 복사한 Service ID 입력
    'YOUR_TEMPLATE_ID',     // 여기에 복사한 Template ID 입력
    {
        to_email: 'okyoucandoit@hanmail.net',
        ...
    }
);
```

## 예시

```javascript
// Public Key 입력 예시
emailjs.init("abcdef123456");

// Service ID와 Template ID 입력 예시
await emailjs.send(
    'service_abc123',
    'template_xyz789',
    {
        to_email: 'okyoucandoit@hanmail.net',
        from_name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        message: formData.get('message')
    }
);
```

## 완료!

설정이 완료되면 웹사이트의 상담신청 양식에서 신청 시 자동으로 okyoucandoit@hanmail.net으로 이메일이 전송됩니다.

## 무료 플랜 제한사항

- 월 200개 이메일까지 무료
- 더 많은 이메일이 필요한 경우 유료 플랜 고려

## 문제 해결

- 이메일이 전송되지 않을 경우 브라우저 콘솔(F12)에서 오류 메시지 확인
- EmailJS 대시보드에서 "Logs" 탭에서 전송 기록 확인

