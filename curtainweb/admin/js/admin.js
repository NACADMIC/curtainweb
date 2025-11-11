// 로그인 처리
document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('adminId').value;
    const pw = document.getElementById('adminPw').value;
    
    // 실제 구현시에는 서버와 통신하여 인증
    if(id === 'admin' && pw === '1234') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
});

// 로그인 체크
function checkLogin() {
    if(!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }
}

// 제품 관리
class ProductManager {
    constructor() {
        this.db = firebase.firestore();
        this.productsRef = this.db.collection('products');
        this.imgbbApiKey = 'YOUR_IMGBB_API_KEY';  // imgBB API 키 입력
        this.bindEvents();
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const snapshot = await this.productsRef.get();
            const products = [];
            snapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });
            this.renderProducts(products);
        } catch (error) {
            console.error('제품 로딩 실패:', error);
        }
    }

    async saveProduct(form) {
        const formData = new FormData(form);
        const imageFile = formData.get('image');
        
        try {
            // imgBB로 이미지 업로드
            const imgbbFormData = new FormData();
            imgbbFormData.append('image', imageFile);
            
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.imgbbApiKey}`, {
                method: 'POST',
                body: imgbbFormData
            });
            
            const data = await response.json();
            if (!data.success) throw new Error('이미지 업로드 실패');
            
            const imageUrl = data.data.url;

            // 제품 정보 저장
            const productData = {
                name: formData.get('name'),
                category: formData.get('category'),
                price: Number(formData.get('price')),
                description: formData.get('description'),
                imageUrl: imageUrl,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await this.productsRef.add(productData);
            this.loadProducts();
            this.closeModal();
        } catch (error) {
            console.error('제품 저장 실패:', error);
            alert('제품 저장에 실패했습니다.');
        }
    }

    bindEvents() {
        document.getElementById('addProductBtn')?.addEventListener('click', () => {
            this.openModal();
        });

        document.getElementById('productForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct(e.target);
        });
    }

    openModal(product = null) {
        const modal = document.getElementById('productModal');
        modal.style.display = 'block';
        
        if(product) {
            // 수정 모드
            document.querySelector('[name="name"]').value = product.name;
            document.querySelector('[name="category"]').value = product.category;
            document.querySelector('[name="price"]').value = product.price;
        }
    }

    closeModal() {
        const modal = document.getElementById('productModal');
        modal.style.display = 'none';
    }

    renderProducts(products) {
        const tbody = document.getElementById('productList');
        if(!tbody) return;

        tbody.innerHTML = products.map(product => `
            <tr>
                <td><img src="${product.imageUrl}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}원</td>
                <td>판매중</td>
                <td>
                    <button onclick="productManager.editProduct(${product.id})">수정</button>
                    <button onclick="productManager.deleteProduct(${product.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
} 