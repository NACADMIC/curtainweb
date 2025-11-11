# Firebase 설정 가이드

## 1. Firebase 콘솔 설정

### Firestore 데이터베이스 활성화
1. https://console.firebase.google.com/project/curtainweb/firestore 접속
2. **데이터베이스 만들기** 클릭
3. **테스트 모드로 시작** 선택
4. 위치: `asia-northeast3 (Seoul)` 선택
5. **사용 설정** 클릭

### Firestore 보안 규칙 설정
**규칙** 탭에서 다음과 같이 설정:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 문의사항: 누구나 작성 가능, 관리자만 읽기/수정/삭제
    match /inquiries/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // 제품: 누구나 읽기 가능, 관리자만 쓰기
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Firebase Authentication 활성화
1. https://console.firebase.google.com/project/curtainweb/authentication 접속
2. **시작하기** 클릭
3. **이메일/비밀번호** 선택 → **사용 설정** → **저장**
4. **사용자** 탭 → **사용자 추가** 클릭
   - 이메일: `admin@curtainweb.com`
   - 비밀번호: 원하는 비밀번호 입력 (예: `admin1234`)
   - **사용자 추가** 클릭

## 2. imgBB API 키 발급 (이미지 업로드용)

1. https://api.imgbb.com/ 접속
2. **Get API Key** 클릭
3. 로그인 (또는 무료 회원가입)
4. API 키 복사
5. `admin/products.html` 파일 열기
6. 122번째 줄에서 `YOUR_IMGBB_API_KEY`를 복사한 API 키로 교체

```javascript
const IMGBB_API_KEY = '여기에_발급받은_API_키_입력';
```

## 3. 관리자 로그인

### 로컬 테스트:
```
http://localhost:8000/admin/login.html
```

### GitHub Pages:
```
https://nacadmic.github.io/curtainweb/admin/login.html
```

**로그인 정보:**
- 이메일: `admin@curtainweb.com`
- 비밀번호: Firebase에서 설정한 비밀번호

## 4. 완료된 기능

✅ **Firestore 데이터베이스** - 제품 및 문의사항 저장  
✅ **Firebase Authentication** - 관리자 로그인  
✅ **imgBB 이미지 호스팅** - 무료 이미지 업로드  
✅ **실시간 문의 관리** - 고객 문의 실시간 확인  
✅ **제품 관리** - 등록/수정/삭제  

## 5. 무료 플랜 한도

### Firestore (무료)
- 저장 공간: 1GB
- 읽기: 50,000회/일
- 쓰기: 20,000회/일

### imgBB (무료)
- 무제한 이미지 업로드
- 무료 영구 호스팅

### Firebase Authentication (무료)
- 무제한 사용자

**소규모 커튼 사이트는 100% 무료로 운영 가능합니다.**

