/* === main-script.js ===18-05-2025=== */
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


// دالة لجلب آخر 3 بطاقات من صفحات المشاريع (ai-students, quran-students, eng-day-students) وصور الشطرنج والطبق الخيري
async function loadLatestContent() {
  if (!document.querySelector('body.index-page')) return;

  const contentSections = [
    {
      page: 'ai-students.html',
      selector: '.project-card',
      targetId: 'latest-ai-videos',
      sectionTitle: '🤖 آخر مشاريع الذكاء الاصطناعي'
    },
    {
      page: 'quran-students.html',
      selector: 'iframe',
      targetId: 'latest-quran-videos',
      sectionTitle: '📖 آخر فيديوهات مسابقة القرآن الكريم'
    },
    {
      page: 'eng-day-students.html',
      selector: 'iframe',
      targetId: 'latest-eng-day-videos',
      sectionTitle: '📚 آخر فيديوهات English Day'
    }
  ];

  // تحميل الفيديوهات والبطاقات
  for (let section of contentSections) {
    const response = await fetch(section.page);
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const elements = doc.querySelectorAll(section.selector);
    const targetSection = document.getElementById(section.targetId);

    let htmlContent = `<h2>${section.sectionTitle}</h2><div class="projects-grid">`;

    elements.forEach((el, index) => {
      if (index < 3) {
        htmlContent += el.outerHTML;
      }
    });

    htmlContent += '</div>';
    targetSection.innerHTML = htmlContent;
  }

  // تحميل الصور من الشطرنج والطبق الخيري
  const photoPages = [
    { page: 'chess-students.html', selector: '.gallery img' },
    { page: 'atabaq-students.html', selector: '.gallery img' }
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
      if (index < 3) {
        photosContent += img.outerHTML;
      }
    });
  }

  photosContent += '</div>';
  photoSection.innerHTML = photosContent;
}

// تفعيل جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  enableProjectSearch();
  enableReadMoreToggle();
  enableImageZoom();
  enableVideoModal();
  enableScrollTopButton();
  loadLatestContent();
});


// وظيفة لتكبير الصور عند الضغط عليها
function enableBrochureZoom() {
  const brochures = document.querySelectorAll('.brochure');
  
  // إنشاء خلفية لتعتيم الشاشة
  const background = document.createElement('div');
  background.classList.add('expanded-background');
  document.body.appendChild(background);

  brochures.forEach(brochure => {
    brochure.addEventListener('click', () => {
      brochure.classList.toggle('expanded');
      background.style.display = brochure.classList.contains('expanded') ? 'block' : 'none';
    });
  });

  // إغلاق الصورة عند الضغط على الخلفية
  background.addEventListener('click', () => {
    brochures.forEach(brochure => brochure.classList.remove('expanded'));
    background.style.display = 'none';
  });
}


// تفعيل الوظيفة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  enableBrochureZoom();
});
