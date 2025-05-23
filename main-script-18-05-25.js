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
async function loadLatestVideosAndPhotos() {
  const sections = [
    { id: 'latest-ai-videos', page: 'ai-students.html', selector: 'iframe' },
    { id: 'latest-quran-videos', page: 'quran-students.html', selector: 'iframe' },
    { id: 'latest-eng-day-videos', page: 'eng-day-students.html', selector: 'iframe' },
  ];

  for (let section of sections) {
    const response = await fetch(section.page);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const videos = doc.querySelectorAll(section.selector);
    const targetSection = document.getElementById(section.id);
    
    let htmlContent = `<h2>${targetSection.classList.contains('ai-section') ? '🤖 آخر فيديوهات الذكاء الاصطناعي' : 
    targetSection.classList.contains('quran-section') ? '📖 آخر فيديوهات مسابقة القرآن الكريم' : 
    '📚 آخر فيديوهات English Day'}</h2><div class="videos-grid">`;

    videos.forEach((video, index) => {
      if (index < 3) {
        htmlContent += video.outerHTML;
      }
    });
    htmlContent += '</div>';
    
    targetSection.innerHTML = htmlContent;
  }

  // لجلب آخر صور من صفحات الشطرنج والطبق الخيري
  const photoPages = [
    { page: 'chess-students.html', selector: '.gallery img' },
    { page: 'atabaq-students.html', selector: '.gallery img' },
  ];

  const photoSection = document.getElementById('latest-event-photos');
  let photosContent = '<h2>📸 أحدث الصور من الفعاليات</h2><div class="gallery">';

  for (let source of photoPages) {
    const response = await fetch(source.page);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const images = doc.querySelectorAll(source.selector);
    images.forEach((img, index) => {
      if (index < 2) {
        photosContent += img.outerHTML;
      }
    });
  }

  photosContent += '</div>';
  photoSection.innerHTML = photosContent;
}

// استدعاء الوظيفة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  loadLatestVideosAndPhotos();
});
