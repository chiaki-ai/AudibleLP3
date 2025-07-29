// Audible Landing Page JavaScript

// カウントダウンタイマー
(function() {
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  const psEl = document.getElementById('ps-days-left'); // 追伸の残り日数要素
  const heroEl = document.getElementById('hero-days-left'); // ヒーローセクションの残り日数要素
  const ctaEl = document.getElementById('cta-days-left'); // CTAバーの残り日数要素
  
  // メインカウントダウン要素がない場合は警告を出すが、他の要素は更新を続行
  if (!dEl || !hEl || !mEl || !sEl) {
    console.warn('Main countdown elements not found, but continuing with other elements');
  }
  
  const end = new Date('2025-07-31T23:59:59+09:00').getTime();
  
  function tick() {
    const now = Date.now();
    const diff = end - now;
    
    if (diff <= 0) {
      // メインカウントダウン要素が存在する場合のみ更新
      if (dEl) dEl.textContent = '00';
      if (hEl) hEl.textContent = '00';
      if (mEl) mEl.textContent = '00';
      if (sEl) sEl.textContent = '00';
      
      // 残り日数要素を0に設定
      if (psEl) psEl.textContent = '0';
      if (heroEl) heroEl.textContent = '0';
      if (ctaEl) ctaEl.textContent = '0';
      
      clearInterval(timer);
      return;
    }
    
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    
    // メインカウントダウン要素が存在する場合のみ更新
    if (dEl) dEl.textContent = String(d).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
    
    // 追伸セクションの残り日数も更新
    if (psEl) {
      psEl.textContent = String(d);
    }
    
    // ヒーローセクションの残り日数も更新
    if (heroEl) {
      heroEl.textContent = String(d);
    }
    
    // CTAバーの残り日数も更新
    if (ctaEl) {
      ctaEl.textContent = String(d);
    }
  }
  
  const timer = setInterval(tick, 1000);
  tick(); // 初回実行
})();

// スムーススクロール
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// CTA Bar の表示/非表示制御（オプション）
document.addEventListener('DOMContentLoaded', function() {
  const ctaBar = document.querySelector('.cta-bar');
  if (!ctaBar) return;
  
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール方向を検出
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 下にスクロール中かつ100px以上スクロールした場合、CTA Barを非表示
      ctaBar.style.transform = 'translateY(100%)';
    } else {
      // 上にスクロール中またはページ上部の場合、CTA Barを表示
      ctaBar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
});

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
  console.log('Audible LP loaded successfully');
  
  // カウントダウン要素の存在確認
  const countdownElements = [
    'hero-days-left',
    'cta-days-left', 
    'ps-days-left'
  ];
  
  countdownElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`✓ Countdown element found: ${id}`);
    } else {
      console.warn(`⚠ Countdown element not found: ${id}`);
    }
  });
});
