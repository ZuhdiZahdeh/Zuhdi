// سكريبت تضمين header
async function includeHTML() {
  const elements = document.querySelectorAll('[include-html]');
  for (const el of elements) {
    const file = el.getAttribute('include-html');
    if (file) {
      const res = await fetch(file);
      const data = await res.text();
      el.innerHTML = data;
      el.classList.add("loaded"); // نظهر العنصر بعد التضمين
      el.removeAttribute("include-html");
      await includeHTML(); // استدعاء متكرر بعد التضمين للتأكد من تضمين العناصر الداخلية أيضًا
    }
  }
}

document.addEventListener("DOMContentLoaded", includeHTML);
