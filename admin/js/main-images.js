class MainImageManager {
    constructor() {
        this.db = firebase.firestore();
        this.mainImagesRef = this.db.collection('main-images');
        this.imgbbApiKey = '21059e54f28fd9c7e352c5643697d5be';  // imgBB API 키
        this.bindEvents();
        this.loadImages();
    }

    bindEvents() {
        document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.uploadImage(e.target);
        });

        // 이미지 목록의 버튼 이벤트 위임
        document.querySelector('.image-list')?.addEventListener('click', async (e) => {
            const target = e.target;
            if (!(target instanceof HTMLButtonElement)) return;

            const imageItem = target.closest('.image-item');
            if (!imageItem) return;
            
            const imageId = imageItem.dataset.id;
            
            if (target.textContent.includes('↑')) {
                await this.moveImage(imageId, 'up');
            } else if (target.textContent.includes('↓')) {
                await this.moveImage(imageId, 'down');
            } else if (target.classList.contains('btn-delete')) {
                await this.deleteImage(imageId);
            }
        });
    }

    async uploadImage(form) {
        const imageFile = document.getElementById('imageUpload').files[0];
        const title = document.querySelector('input[placeholder="이미지 제목"]').value;
        const description = document.querySelector('input[placeholder="이미지 설명"]').value;
        
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
            
            // Firestore에 이미지 정보 저장
            await this.mainImagesRef.add({
                imageUrl: data.data.url,
                title: title,
                description: description,
                order: Date.now(),  // 정렬을 위한 타임스탬프
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('이미지가 업로드되었습니다.');
            form.reset();
            this.loadImages();  // 목록 새로고침
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    }

    async loadImages() {
        try {
            const snapshot = await this.mainImagesRef.orderBy('order', 'asc').get();
            const images = [];
            snapshot.forEach(doc => {
                images.push({ id: doc.id, ...doc.data() });
            });
            this.renderImages(images);
        } catch (error) {
            console.error('이미지 로딩 실패:', error);
        }
    }

    renderImages(images) {
        const container = document.querySelector('.image-list');
        if (!container) return;

        container.innerHTML = images.map(image => `
            <div class="image-item" data-id="${image.id}">
                <img src="${image.imageUrl}" alt="${image.title}">
                <h4>${image.title}</h4>
                <p>${image.description}</p>
                <div class="image-controls">
                    <button class="btn btn-order">↑ 위로</button>
                    <button class="btn btn-order">↓ 아래로</button>
                    <button class="btn btn-delete">삭제</button>
                </div>
            </div>
        `).join('');
    }

    async moveImage(imageId, direction) {
        try {
            const snapshot = await this.mainImagesRef.orderBy('order', 'asc').get();
            const images = [];
            snapshot.forEach(doc => {
                images.push({ id: doc.id, ...doc.data() });
            });

            const currentIndex = images.findIndex(img => img.id === imageId);
            if (currentIndex === -1) return;

            const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
            if (newIndex < 0 || newIndex >= images.length) return;

            // 순서 교체
            const batch = this.db.batch();
            const currentOrder = images[currentIndex].order;
            const targetOrder = images[newIndex].order;

            batch.update(this.mainImagesRef.doc(imageId), { order: targetOrder });
            batch.update(this.mainImagesRef.doc(images[newIndex].id), { order: currentOrder });

            await batch.commit();

            this.loadImages();
        } catch (error) {
            console.error('이미지 순서 변경 실패:', error);
            alert('이미지 순서 변경에 실패했습니다.');
        }
    }

    async deleteImage(imageId) {
        try {
            await this.mainImagesRef.doc(imageId).delete();
            this.loadImages();
        } catch (error) {
            console.error('이미지 삭제 실패:', error);
            alert('이미지 삭제에 실패했습니다.');
        }
    }
} 