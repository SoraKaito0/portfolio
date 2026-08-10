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

const caseStudies = {
  celestial: {
    kicker:"FEATURED ENVIRONMENT · VRCHAT",
    title:"The Celestial Church",
    image:"assets/cathedral-hero.png",
    summary:"A large gothic social environment built around symmetry, scale and dramatic warm lighting. The scene was designed to feel ceremonial and memorable while still functioning as a practical VRChat space.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Environment Art · Architectural Composition · Lighting",
    type:"Personal VRChat environment",
    role:"Environment design, scene assembly, lighting, atmosphere and VRChat implementation",
    goals:[
      "Create a strong first impression using a long central sightline and a clear focal point.",
      "Make the interior feel large and ceremonial without losing readability in VR.",
      "Use lighting and repetition to give the architecture depth rather than relying only on detail."
    ],
    process:[
      "Built the composition around the main aisle so the viewer is immediately guided toward the altar and statue.",
      "Used repeated arches, curtains, chandeliers and columns to reinforce scale and rhythm through the hall.",
      "Balanced dark materials with warm candles and strong shafts of light so the environment remains readable.",
      "Tested the environment as a social VR space, keeping movement areas open while preserving the dramatic framing."
    ],
    challenge:"The main challenge was making such a large interior feel grand without becoming visually flat or too dark. The solution was to use lighting hierarchy: strong focal lighting near the altar, softer repeated pools of light down the room, and bright shafts cutting through the darker architecture.",
    learned:"This project improved how I think about composition at large scale. I became more confident using repetition, contrast and lighting to direct attention instead of filling every area with detail.",
    highlights:["Strong central composition","Large-scale interior atmosphere","Warm/cool contrast","VR-ready social space"]
  },
  "city-series": {
    kicker:"ENVIRONMENT EVOLUTION · MULTI-YEAR SERIES",
    title:"City Apartment Series",
    image:"assets/loft.png",
    summary:"A recurring apartment concept that I rebuilt multiple times over several years. It is one of the clearest examples of my progression because the same general idea was revisited as my modelling, lighting, layout and scene-building skills improved.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Iteration · Interior Design · Skill Progression",
    type:"Long-term personal environment series",
    role:"Environment design, modelling, scene layout, lighting and VRChat setup",
    goals:[
      "Revisit the same general apartment idea instead of abandoning older work.",
      "Improve scale, layout and visual flow with each new version.",
      "Use the rebuilds as a way to measure growth in environment art."
    ],
    process:[
      "Compared older versions and identified areas that felt too empty, too flat or poorly proportioned.",
      "Reworked room layouts and furniture placement to make the spaces feel more believable and usable.",
      "Improved material variation and lighting instead of relying mainly on bright flat illumination.",
      "Added stronger architectural structure, focal areas and more deliberate visual framing in later versions."
    ],
    challenge:"The challenge was making each rebuild genuinely better rather than simply adding more props. I focused on composition, scale, material choices and lighting so that the later versions would feel more intentional and professionally presented.",
    learned:"Rebuilding the same idea taught me to critique my own work more clearly. It also showed me that environment quality is not only about modelling detail; layout, lighting, scale and presentation can change the whole result.",
    highlights:["Clear visual progression","Repeated concept rebuilt over time","Improved lighting and material work","Stronger scene composition"]
  },
  "always-home": {
    kicker:"VRCHAT ENVIRONMENT · INDUSTRIAL INTERIOR",
    title:"Always Home",
    image:"assets/industrial.png",
    summary:"A compact industrial-style apartment combining exposed pipework, brick, wood and a city-night backdrop. The aim was to create a detailed social space that still feels comfortable and easy to move around in VR.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Interior Environment Art · Prop Placement · Mood",
    type:"Personal VRChat world",
    role:"Environment design, layout, lighting, prop placement and VRChat implementation",
    goals:[
      "Create a strong industrial identity without making the space feel cold or empty.",
      "Use the city view as part of the composition rather than just as a background.",
      "Keep the layout practical for social VR."
    ],
    process:[
      "Used exposed beams, pipework and brick as repeating visual language across the apartment.",
      "Balanced industrial materials with warm wood and softer furniture to make the space feel lived in.",
      "Placed the city skyline at major sightlines so it contributes to the mood of the interior.",
      "Kept walkable areas and social zones clear while adding detail around the edges of the environment."
    ],
    challenge:"Because the room is relatively compact, too much detail could easily make it feel cluttered. I concentrated detail around architectural edges and feature areas while keeping the main spaces readable.",
    learned:"This project helped me improve believable prop placement and showed me how much the relationship between an interior and its exterior view can affect the mood of a scene.",
    highlights:["Industrial material language","Night-city backdrop","Compact VR-friendly layout","Warm interior contrast"]
  },
  "forever-home": {
    kicker:"INTERACTIVE VRCHAT WORLD · ATMOSPHERE",
    title:"Forever Home",
    image:"assets/cozy-storm.png",
    summary:"A darker comfort-focused environment designed around atmosphere and customisable ambience. The world combines a small living space with weather, lighting and visual controls so the user can change the mood without leaving the environment.",
    tools:"Unity · VRChat SDK · Interactive Systems",
    focus:"Atmosphere · Interaction · Social VR",
    type:"Personal VRChat world",
    role:"Environment design, lighting, ambience, UI/interaction setup and VRChat implementation",
    goals:[
      "Build a world that feels calm and private rather than large or spectacle-driven.",
      "Let users alter ambience without making the controls dominate the visual design.",
      "Combine environmental storytelling with practical social VR features."
    ],
    process:[
      "Kept the room intentionally dark and used small warm light sources to create a sheltered feeling.",
      "Added environmental controls for sound, rain, thunder and visual settings.",
      "Placed controls where they are accessible but not the main focal point of the room.",
      "Used exterior weather and low light to make the interior feel more protected and intimate."
    ],
    challenge:"The biggest balance was between atmosphere and usability. A very dark environment can look good in screenshots but become difficult to use, so I kept important areas readable while preserving the low-light mood.",
    learned:"I developed a better understanding of how interaction can support environment art instead of feeling like a separate system placed on top of it.",
    highlights:["Customisable ambience","Weather and sound controls","Low-light comfort mood","Environment + interaction integration"]
  },
  "soras-home": {
    kicker:"VRCHAT WORLD · MODERN SOCIAL SPACE",
    title:"Sora’s Home",
    image:"assets/soras-home.png",
    summary:"A modern personal home environment focused on clean layout, sunset views and comfortable areas for social VR. It represents an earlier stage of my environment work and is useful for showing how my design approach has developed over time.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Social Space · Lighting · Composition",
    type:"Personal VRChat world",
    role:"Layout, environment design, lighting, prop placement and world setup",
    goals:[
      "Create a simple home world with multiple areas that remain visually connected.",
      "Use the sunset exterior as a recurring visual feature throughout the interior.",
      "Make the environment comfortable to navigate and use with other players."
    ],
    process:[
      "Built the layout around open connections between the bedroom, lounge and exterior areas.",
      "Used large windows and openings so the sunset becomes part of several compositions.",
      "Kept materials simple and readable while focusing on space planning and room flow.",
      "Used furniture placement to define social zones rather than separating every area with walls."
    ],
    challenge:"The challenge was making a relatively simple modern interior feel interesting without relying on heavy decoration. The sunset, open layout and furniture placement became the main visual tools.",
    learned:"This world reinforced the importance of player sightlines and practical scale, and it became a useful reference point for judging the improvements in my newer projects.",
    highlights:["Early environment milestone","Open-plan social layout","Sunset-focused composition","Clear progression reference"]
  },
  pharanoa: {
    kicker:"EXPERIMENTAL ENVIRONMENT · VFX",
    title:"Pharanoa",
    image:"assets/vfx.png",
    summary:"An experimental dark environment centred on a bright green energy effect. Instead of treating VFX as a small addition, the effect is used as the main focal point and the primary source of visual storytelling.",
    tools:"Unity · VFX · Emissive Materials",
    focus:"Experimental Lighting · Effects · Visual Focus",
    type:"Personal visual experiment",
    role:"Scene design, lighting, VFX integration and visual presentation",
    goals:[
      "Create a scene where one strong visual effect carries most of the composition.",
      "Experiment with extreme contrast between darkness and emissive light.",
      "Explore a more abstract environment style than my interior VRChat worlds."
    ],
    process:[
      "Kept the surrounding scene deliberately dark so the energy effect becomes immediately readable.",
      "Used emissive green light and a vertical beam to pull the eye toward the central point.",
      "Added surrounding shapes and reflections carefully so they support the effect without competing with it.",
      "Tested bloom and contrast to find a balance between intensity and visibility."
    ],
    challenge:"The effect had to feel bright and energetic without washing out the entire scene. I adjusted the surrounding darkness and emissive intensity so the visual focus remained strong.",
    learned:"This experiment helped me understand how contrast, emissive materials and VFX can become compositional tools rather than just decoration.",
    highlights:["VFX-led composition","High contrast lighting","Emissive focal point","Experimental visual style"]
  }
};

const caseModal=document.getElementById("caseModal"),caseContent=document.getElementById("caseContent");
function openCase(id){
  const c=caseStudies[id];
  if(!c)return;
  const goals=(c.goals||[]).map(x=>`<li>${x}</li>`).join("");
  const process=(c.process||[]).map(x=>`<li>${x}</li>`).join("");
  const highlights=(c.highlights||[]).map(x=>`<span>${x}</span>`).join("");
  caseContent.innerHTML=`
    <p class="case-kicker">${c.kicker}</p>
    <h2>${c.title}</h2>
    <p class="case-summary">${c.summary}</p>
    <img class="case-hero" src="${c.image}" alt="${c.title}">
    <div class="case-grid">
      <div class="case-block"><span>Tools</span><strong>${c.tools}</strong></div>
      <div class="case-block"><span>Focus</span><strong>${c.focus}</strong></div>
      <div class="case-block"><span>Project</span><strong>${c.type}</strong></div>
    </div>
    <div class="case-role"><span>My role</span><p>${c.role}</p></div>
    <div class="case-highlights">${highlights}</div>
    <div class="case-body case-body-rich">
      <section>
        <h3>Project goals</h3>
        <ul>${goals}</ul>
      </section>
      <section>
        <h3>Process & decisions</h3>
        <ul>${process}</ul>
      </section>
      <section>
        <h3>Challenge & approach</h3>
        <p>${c.challenge}</p>
      </section>
      <section>
        <h3>What I learned</h3>
        <p>${c.learned}</p>
      </section>
    </div>`;
  caseModal.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeCase(){caseModal?.classList.remove("open");document.body.style.overflow=""}
document.querySelectorAll(".case-study-btn").forEach(b=>b.addEventListener("click",()=>openCase(b.dataset.case)));document.getElementById("caseClose")?.addEventListener("click",closeCase);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeLightbox();closeCase();closeChat()}if(lightbox?.classList.contains("open")&&e.key==="ArrowLeft")showLightbox(lightboxIndex-1);if(lightbox?.classList.contains("open")&&e.key==="ArrowRight")showLightbox(lightboxIndex+1)});
