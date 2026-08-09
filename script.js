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

const FORM_ENDPOINT = "https://formsubmit.co/ajax/rmartin@stephen-martin.com";
async function submitLiveForm(form,statusEl){
  const button=form.querySelector('button[type="submit"]'), old=button.textContent;
  statusEl.textContent="Sending…"; statusEl.classList.remove("success","error"); button.disabled=true; button.textContent="Sending…";
  try{
    const response=await fetch(FORM_ENDPOINT,{method:"POST",body:new FormData(form),headers:{"Accept":"application/json"}});
    const result=await response.json().catch(()=>({}));
    if(!response.ok||result.success===false||result.success==="false") throw new Error();
    statusEl.textContent="Message sent — thank you."; statusEl.classList.add("success"); form.reset(); return true;
  }catch(e){statusEl.textContent="Couldn’t send. Please email rmartin@stephen-martin.com instead.";statusEl.classList.add("error");return false}
  finally{button.disabled=false;button.textContent=old}
}
document.getElementById("contactForm")?.addEventListener("submit",async e=>{e.preventDefault();await submitLiveForm(e.currentTarget,document.getElementById("contactStatus"))});
document.getElementById("quickMessageForm")?.addEventListener("submit",async e=>{e.preventDefault();const ok=await submitLiveForm(e.currentTarget,document.getElementById("quickMessageStatus"));if(ok)setTimeout(closeChat,1400)});

const chatLauncher=document.getElementById("chatLauncher"),chatPanel=document.getElementById("chatPanel");
function openChat(){chatPanel.classList.add("open");chatPanel.setAttribute("aria-hidden","false");chatLauncher.setAttribute("aria-expanded","true")}
function closeChat(){chatPanel?.classList.remove("open");chatPanel?.setAttribute("aria-hidden","true");chatLauncher?.setAttribute("aria-expanded","false")}
chatLauncher?.addEventListener("click",()=>chatPanel.classList.contains("open")?closeChat():openChat());document.getElementById("chatClose")?.addEventListener("click",closeChat);

document.querySelectorAll(".copy-email").forEach(btn=>btn.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(btn.dataset.email);const old=btn.textContent;btn.textContent="Copied";setTimeout(()=>btn.textContent=old,1200)}catch{location.href=`mailto:${btn.dataset.email}`}}));
const backToTop=document.getElementById("backToTop");addEventListener("scroll",()=>backToTop?.classList.toggle("show",scrollY>900),{passive:true});backToTop?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
const compareSlider=document.getElementById("compareSlider"),compareOverlay=document.getElementById("compareOverlay"),compareLine=document.getElementById("compareLine");if(compareSlider){const u=()=>{compareOverlay.style.width=`${compareSlider.value}%`;compareLine.style.left=`${compareSlider.value}%`};compareSlider.addEventListener("input",u);u()}

const lightboxItems=[...document.querySelectorAll(".lightbox-item")],lightbox=document.getElementById("lightbox"),lightboxImage=document.getElementById("lightboxImage"),lightboxCaption=document.getElementById("lightboxCaption");let lightboxIndex=0;
function showLightbox(i){lightboxIndex=(i+lightboxItems.length)%lightboxItems.length;const item=lightboxItems[lightboxIndex],img=item.querySelector("img"),cap=item.querySelector("figcaption");lightboxImage.src=img.src;lightboxImage.alt=img.alt;lightboxCaption.textContent=cap?cap.innerText.replace(/\n+/g," · "):img.alt;lightbox.classList.add("open");document.body.style.overflow="hidden"}
function closeLightbox(){lightbox?.classList.remove("open");document.body.style.overflow=""}
lightboxItems.forEach((item,i)=>item.addEventListener("click",()=>showLightbox(i)));document.getElementById("lightboxClose")?.addEventListener("click",closeLightbox);document.getElementById("lightboxPrev")?.addEventListener("click",()=>showLightbox(lightboxIndex-1));document.getElementById("lightboxNext")?.addEventListener("click",()=>showLightbox(lightboxIndex+1));

const caseStudies={
celestial:{kicker:"FEATURED ENVIRONMENT · VRCHAT",title:"The Celestial Church",image:"assets/cathedral-hero.png",summary:"A large gothic interior built around strong symmetry, ceremonial scale and dramatic lighting.",tools:"Unity · Blender · VRChat SDK",focus:"Architecture · Lighting · Atmosphere",type:"Personal environment project",challenge:"The scene needed to feel grand without becoming visually flat. I used the long central aisle, repeated architectural forms, candlelight and directional shafts of light to build depth.",learned:"This project strengthened how I think about focal points, scale, contrast and lighting hierarchy."},
"city-series":{kicker:"ENVIRONMENT EVOLUTION",title:"City Apartment Series",image:"assets/loft.png",summary:"A recurring apartment concept rebuilt across several years to show progression in modelling, composition, lighting and materials.",tools:"Unity · Blender · VRChat SDK",focus:"Iteration · Interior Design · Progression",type:"Long-term personal series",challenge:"Each version had to improve rather than simply add more objects, so I revisited layout, scale, material choices and lighting.",learned:"Rebuilding the same type of space taught me to judge my own work more critically."},
"always-home":{kicker:"VRCHAT ENVIRONMENT",title:"Always Home",image:"assets/industrial.png",summary:"A compact industrial-style apartment using exposed pipework, brick, timber and a city-night backdrop.",tools:"Unity · Blender · VRChat SDK",focus:"Interior Design · Prop Placement · Mood",type:"Personal VRChat world",challenge:"The goal was to make a compact layout feel detailed without becoming cluttered.",learned:"The project helped develop my approach to believable prop placement and comfortable VR navigation."},
"forever-home":{kicker:"INTERACTIVE VRCHAT WORLD",title:"Forever Home",image:"assets/cozy-storm.png",summary:"A darker comfort-focused world combining atmosphere with interactive controls for ambience, weather and visual settings.",tools:"Unity · VRChat SDK · Interactive Systems",focus:"Mood · Interaction · Social VR",type:"Personal VRChat world",challenge:"I wanted the environment controls to add flexibility without distracting from the space itself.",learned:"This world developed my understanding of how environmental art and small interactive systems can work together."},
"soras-home":{kicker:"VRCHAT WORLD",title:"Sora’s Home",image:"assets/soras-home.png",summary:"A modern personal home environment focused on comfortable social spaces, sunset views and a clean, readable interior.",tools:"Unity · Blender · VRChat SDK",focus:"Social Space · Lighting · Composition",type:"Personal VRChat world",challenge:"The space needed to work as both a visual environment and somewhere people could spend time comfortably in VR.",learned:"It reinforced the importance of player sightlines, practical scale and exterior views."},
pharanoa:{kicker:"EXPERIMENTAL VFX",title:"Pharanoa",image:"assets/vfx.png",summary:"An abstract environment experiment built around a concentrated green energy beam, emissive surfaces and high-contrast effects.",tools:"Unity · VFX · Emissive Materials",focus:"Experimentation · Lighting · Effects",type:"Personal visual experiment",challenge:"The main challenge was making the effect readable in a very dark scene while retaining energy and depth.",learned:"This experiment helped me explore how emissive colour, contrast and effects can become the main visual storytelling element."}
};
const caseModal=document.getElementById("caseModal"),caseContent=document.getElementById("caseContent");
function openCase(id){const c=caseStudies[id];if(!c)return;caseContent.innerHTML=`<p class="case-kicker">${c.kicker}</p><h2>${c.title}</h2><p class="case-summary">${c.summary}</p><img class="case-hero" src="${c.image}" alt="${c.title}"><div class="case-grid"><div class="case-block"><span>Tools</span><strong>${c.tools}</strong></div><div class="case-block"><span>Focus</span><strong>${c.focus}</strong></div><div class="case-block"><span>Project</span><strong>${c.type}</strong></div></div><div class="case-body"><div><h3>Challenge & approach</h3><p>${c.challenge}</p></div><div><h3>What I learned</h3><p>${c.learned}</p></div></div>`;caseModal.classList.add("open");document.body.style.overflow="hidden"}
function closeCase(){caseModal?.classList.remove("open");document.body.style.overflow=""}
document.querySelectorAll(".case-study-btn").forEach(b=>b.addEventListener("click",()=>openCase(b.dataset.case)));document.getElementById("caseClose")?.addEventListener("click",closeCase);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeLightbox();closeCase();closeChat()}if(lightbox?.classList.contains("open")&&e.key==="ArrowLeft")showLightbox(lightboxIndex-1);if(lightbox?.classList.contains("open")&&e.key==="ArrowRight")showLightbox(lightboxIndex+1)});
