// スムーズスクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションリンクのスムーズスクロール
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20; // 少し余白を追加
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQのアコーディオン機能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // 初期状態で最初のFAQを開く
        if (item === faqItems[0]) {
            item.classList.add('active');
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // 他のFAQを閉じる
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.display = 'none';
            });
            
            // クリックされたFAQを開く/閉じる
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });

    // ヘッダーのスクロール効果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // アニメーション要素の表示制御
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('.feature-card, .teacher-card, .testimonial-card, .pricing-row');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CTAボタンのホバーエフェクト強化
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 料金表の行ホバーエフェクト
    const pricingRows = document.querySelectorAll('.pricing-row');
    pricingRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
    });

    // カウントダウンタイマー（キャンペーン終了日）
    function updateCountdown() {
        const campaignEnd = new Date('2025-08-31T23:59:59').getTime();
        const now = new Date().getTime();
        const distance = campaignEnd - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // カウントダウン表示要素があれば更新
            const countdownElements = document.querySelectorAll('.countdown');
            countdownElements.forEach(element => {
                element.innerHTML = `${days}日 ${hours}時間 ${minutes}分`;
            });
        }
    }

    // カウントダウンを1分ごとに更新
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // フォーム送信のシミュレーション
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 送信中の表示
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '送信中...';
            submitButton.disabled = true;
            
            // 送信完了のシミュレーション
            setTimeout(() => {
                alert('お申し込みありがとうございます！\n担当者よりご連絡いたします。');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                form.reset();
            }, 2000);
        });
    });

    // スクロール進捗バー
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // パフォーマンス最適化：画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ユーティリティ関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// リサイズ時の処理
window.addEventListener('resize', debounce(function() {
    // レスポンシブ対応の追加処理があればここに記述
}, 250));

// ページの読み込み完了時の処理
window.addEventListener('load', function() {
    // ページ読み込み完了後の処理
    document.body.classList.add('loaded');
    
    // ローディングアニメーションがあれば非表示
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
}); 

// ヘッダー高さに応じて.heroのpadding-topを動的に調整
function adjustHeroPadding() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (header && hero) {
        // より正確な高さ取得
        const headerHeight = header.getBoundingClientRect().height;
        // !importantで強制上書き
        hero.style.setProperty('padding-top', (headerHeight + 40) + 'px', 'important');
    }
}
window.addEventListener('DOMContentLoaded', adjustHeroPadding);
window.addEventListener('resize', adjustHeroPadding); 