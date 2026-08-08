const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// Contact form: build a mailto draft without sending anything automatically.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subjectInput = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const subject = subjectInput || `Portfolio enquiry from ${name}`;
    const body = `Hi Reece,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:rmartin@stephen-martin.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
