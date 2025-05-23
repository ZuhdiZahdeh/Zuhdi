 /* === main-script.js بعد التعديلات  === */
// وظيفة البحث في صفحة أعمال الطلاب
function enableProjectSearch() {
  const searchInput = document.getElementById('search');
  const noResults = document.getElementById('no-results');
  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase();
    const projects = document.querySelectorAll('.project');
    let visibleCount = 0;

    projects.forEach(function (project) {
      const title = project.textContent.toLowerCase();
      const isVisible = title.includes(filter);
      project.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  });
}

// وظيفة إظهار / إخفاء تفاصيل "اقرأ المزيد"
function enableReadMoreToggle() {
  const content = document.getElementById('more-content');
  const button = document.querySelector('.read-more-button');
  if (!content || !button) return;

  button.addEventListener('click', () => {
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
}

// وظيفة تكبير الصور (zoomable-image)
function enableImageZoom() {
  const images = document.querySelectorAll('.zoomable-image');
  images.forEach(image => {
    image.addEventListener('click', function () {
      image.classList.toggle('full-size');
    });
  });
}

// وظيفة فتح الفيديو داخل نافذة منبثقة
function enableVideoModal() {
  const openButtons = document.querySelectorAll('.open-video');
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-frame');
  const closeBtn = document.querySelector('.close-video');

  if (!modal || !iframe || !openButtons.length) return;

  openButtons.forEach(button => {
    button.addEventListener('click', function () {
      const videoUrl = this.getAttribute('data-video');
      iframe.src = videoUrl;
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    iframe.src = '';
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      iframe.src = '';
    }
  });
}

// زر العودة للأعلى
function enableScrollTopButton() {
  const topBtn = document.getElementById("topBtn");

  window.onscroll = function() { scrollFunction(); };

  function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  }

  topBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
}


// جلب وعرض آخر ثلاث بطاقات مشاريع من صفحات ai-students و quran-students، وبطاقات الفائزين في الشطرنج
async function loadLatestProjectsAndWinners() {
  if (!document.querySelector('body.index-page')) return;

  const pages = ['ai-students.html', 'quran-students.html'];
  const chessPage = 'chess-students.html';
  const container = document.querySelector('.projects-grid');

  container.innerHTML = '';

  for (let page of pages) {
    const response = await fetch(page);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const projects = doc.querySelectorAll('.project-card');

    projects.forEach((project, index) => {
      if (index < 3) {
        container.appendChild(project.cloneNode(true));
      }
    });
  }

  const chessResponse = await fetch(chessPage);
  const chessHtml = await chessResponse.text();
  const chessDoc = new DOMParser().parseFromString(chessHtml, 'text/html');
  const winners = chessDoc.querySelectorAll('.winner-card');

  winners.forEach(winner => {
    container.appendChild(winner.cloneNode(true));
  });
}

// تشغيل جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  enableProjectSearch();
  enableReadMoreToggle();
  enableImageZoom();
  enableVideoModal();
  enableScrollTopButton();
  loadLatestProjectsAndWinners();
});
