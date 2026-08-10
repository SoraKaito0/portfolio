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
    date:"03 October 2025", stats:{Objects:"19",Vertices:"227,739",Edges:"509,252",Faces:"282,781",Triangles:"432,351"}, contribution:"Modelled roughly 90% of the environment. The curtains and tall aisle candle stands were not modelled by me. I created the textures and materials, lighting, post-processing, Unity setup and VRChat setup for PC and Quest.", story:"I made the chapel for me and my girlfriend after she wanted to get married within VRChat. I designed the environment to fulfil that idea and turn it into a personal space built around love and ceremony.", gallery:["assets/cathedral-hero.png","assets/cathedral-angle-3.png","assets/cathedral-angle-2.png","assets/celestial-vrchat-aisle.jpg","assets/celestial-blender-altar.jpg","assets/celestial-blender-wide.png","assets/celestial-topdown-solid.png"], development:[{n:"Wireframe elevation",i:"assets/celestial-wireframe-elevation.png"},{n:"Solid elevation",i:"assets/celestial-solid-elevation.png"},{n:"Top-down wireframe",i:"assets/celestial-topdown-wireframe.png"},{n:"Top-down solid view",i:"assets/celestial-topdown-solid.png"}], breakdown:[{n:"Bench · Base Colour",i:"assets/celestial-bench-basecolor.png"},{n:"Bench · Roughness",i:"assets/celestial-bench-roughness.png"},{n:"Bench · Normal",i:"assets/celestial-bench-normal.png"},{n:"Statue · Base Colour",i:"assets/celestial-statue-basecolor.png"},{n:"Statue · Roughness",i:"assets/celestial-statue-roughness.png"},{n:"Statue · Secondary Material",i:"assets/celestial-statue-secondary-basecolor.png"},{n:"Door · Base Colour",i:"assets/celestial-door-basecolor.png"},{n:"Door · Roughness",i:"assets/celestial-door-roughness.png"},{n:"Door · Normal",i:"assets/celestial-door-normal.png"}], highlights:["Strong central composition","Large-scale interior atmosphere","Warm/cool contrast","VR-ready social space"]
  },
  "city-2021": {
    kicker:"CITY APARTMENT · VERSION 01 · VRCHAT",
    title:"City Apartment Classic",
    image:"assets/city-2021-1.jpg",
    summary:"The original City Apartment environment and the starting point of the three-version series. This first build established the industrial loft idea, large windows, exposed brick, dark structural framing and a warm sunset atmosphere.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Early Environment Design · Interior Layout · Lighting",
    type:"Personal VRChat environment",
    role:"Environment design, modelling, scene assembly, lighting and VRChat setup",
    goals:[
      "Create a multi-level apartment environment with a strong industrial identity.",
      "Use large windows and a warm exterior sky to give the interior a clear atmosphere.",
      "Build a comfortable social space with bedroom and lounge areas connected vertically."
    ],
    process:[
      "Built the apartment around an open mezzanine layout and central staircase.",
      "Used brick, dark metal and wood as the main material language.",
      "Placed large window openings around the main living areas so the exterior lighting became part of the composition.",
      "Used this first version as the foundation for the later 2022 and 2023 rebuilds."
    ],
    challenge:"This was an early environment project, so the main challenge was learning how to balance a large interior, furniture placement and lighting while keeping the space usable in VR.",
    learned:"The project became an important baseline for my later work. Looking back at it made it easier to identify what I wanted to improve in scale, material quality, lighting and composition.",
    date:"23 August 2021",
    contribution:"This is the first City Apartment version. The original Blender and Unity project files are no longer available, so this page uses the surviving finished screenshots rather than technical breakdowns.",
    story:"City Apartment Classic was created on 23 August 2021 and became the first version of a concept I later rebuilt twice as my environment-art skills developed.",
    gallery:["assets/city-2021-1.jpg","assets/city-2021-2.jpg","assets/city-2021-3.png"],
    highlights:["First City Apartment","Industrial loft layout","Warm sunset lighting","2021 environment work"]
  },
  "city-2022": {
    kicker:"CITY APARTMENT · VERSION 02 · VRCHAT",
    title:"City Apartment",
    image:"assets/city-2022-2.png",
    summary:"The second City Apartment rebuild, created several months after the original. It kept the industrial apartment concept but pushed the environment toward a darker, more developed interior with stronger lighting accents and more detailed room dressing.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Interior Rebuild · Mood Lighting · Environment Detail",
    type:"Personal VRChat environment",
    role:"Environment design, modelling, scene assembly, lighting and VRChat setup",
    goals:[
      "Rebuild the first apartment idea rather than simply adding onto the old version.",
      "Create a darker and more atmospheric interior with stronger light contrast.",
      "Improve the amount of environmental detail and give different areas more identity."
    ],
    process:[
      "Reworked the apartment while retaining the loft-style concept and exposed structural elements.",
      "Introduced brighter practical and decorative lighting against a darker overall environment.",
      "Expanded the visual language with illuminated wall pieces, shelving and more developed room dressing.",
      "Used the rebuild to test how much the same core idea could improve through lighting and presentation."
    ],
    challenge:"The second version needed to feel recognisably related to the original while still being a genuine step forward. I focused on atmosphere, contrast and environmental detail instead of only increasing the number of objects.",
    learned:"This version showed me how strongly lighting can change the character of an environment and helped move my work away from flatter presentation toward more deliberate mood.",
    date:"14 February 2022",
    contribution:"This is the second City Apartment version. The original Blender and Unity project files are no longer available, so the surviving finished screenshots are used to document it.",
    story:"I returned to the City Apartment idea on 14 February 2022. This became the second generation of the environment and a darker, more developed interpretation of the original concept.",
    gallery:["assets/city-2022-1.jpg","assets/city-2022-2.png","assets/city-2022-3.png","assets/city-2022-4.jpg"],
    highlights:["Second generation","Darker atmosphere","Stronger lighting accents","2022 environment work"]
  },
  "city-2023": {
    kicker:"CITY APARTMENT · VERSION 03 · FINAL",
    title:"City Apartment · Final",
    image:"assets/city-2023-4.jpg",
    summary:"The third and final City Apartment rebuild. This version revisited the same loft-apartment idea with a warmer material palette, more coherent room layout and a more mature approach to lighting, architecture and environmental composition.",
    tools:"Unity · Blender · VRChat SDK",
    focus:"Environment Rebuild · Composition · Lighting",
    type:"Personal VRChat environment",
    role:"Environment design, modelling, scene assembly, lighting and VRChat setup",
    goals:[
      "Create a final rebuild that clearly demonstrates the progression from the 2021 and 2022 versions.",
      "Make the apartment feel more cohesive as a complete living space rather than a collection of individual areas.",
      "Use warmer materials and controlled lighting to create a more believable, comfortable interior."
    ],
    process:[
      "Reworked the layout around the kitchen, lounge, stairs and upper areas so the environment reads more clearly as one connected space.",
      "Used warmer wood, brick and dark structural materials to create a consistent visual language.",
      "Placed practical lighting throughout the apartment and used the city-night exterior as part of the scene composition.",
      "Treated this rebuild as the final version of the concept rather than continuing to modify the older projects."
    ],
    challenge:"The final version needed to show meaningful growth over two earlier attempts while still preserving the identity of the City Apartment idea. The focus became cohesion, layout and presentation rather than simply making the environment larger.",
    learned:"Finishing the third version made the progression across the series much clearer and reinforced how useful it can be to revisit an old idea with better skills instead of only starting completely new projects.",
    date:"22 August 2023",
    contribution:"This is the third and final City Apartment version. The original Blender and Unity project files are no longer available, so the page focuses on the surviving finished screenshots and visible environment work.",
    story:"The final City Apartment was created on 22 August 2023. It was the third and last rebuild of the concept, completing a progression that started with City Apartment Classic in 2021.",
    gallery:["assets/city-2023-1.png","assets/city-2023-2.jpg","assets/city-2023-3.jpg","assets/city-2023-4.jpg"],
    highlights:["Third and final version","Warmer material palette","More cohesive layout","2023 environment work"]
  },
  "city-series": {
    kicker:"ENVIRONMENT EVOLUTION · MULTI-YEAR SERIES",
    title:"City Apartment Series",
    image:"assets/city-2021-2.jpg",
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
    date:"23 Aug 2021 → 14 Feb 2022 → 22 Aug 2023", contribution:"A three-generation environment series. The original Blender and Unity project files are no longer available, so this case study focuses on the surviving finished screenshots and the visible progression between each rebuild.", story:"City Apartment Classic began on 23 August 2021. I revisited the idea on 14 February 2022, then created the third and final version on 22 August 2023.", gallery:["assets/city-2021-1.jpg","assets/city-2021-2.jpg","assets/city-2021-3.png","assets/city-2022-1.jpg","assets/city-2022-2.png","assets/city-2022-3.png","assets/city-2022-4.jpg","assets/city-2023-1.png","assets/city-2023-2.jpg","assets/city-2023-3.jpg","assets/city-2023-4.jpg"], highlights:["2021 Classic","2022 Second generation","2023 Final generation","Visible multi-year progression"]
  },
  "always-home": {
    kicker:"VRCHAT ENVIRONMENT · INDUSTRIAL INTERIOR",
    title:"Always Home",
    image:"assets/always-home-2.jpg",
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
    date:"23 April 2026", stats:{Objects:"137",Vertices:"595,071",Edges:"1,291,766",Faces:"698,782",Triangles:"1,114,851"}, contribution:"Modelled roughly 90% of the environment; the plants were not modelled by me. I created the textures and materials, lighting, post-processing, Unity setup and VRChat setup for PC and Quest.", story:"I created Always Home as a world for me and my girlfriend: a small shared environment where we could reside and feel at home in our own space.", gallery:["assets/always-home-2.jpg","assets/always-home-gallery.jpg","assets/always-home-scotland.jpg","assets/always-unity-view-2.png","assets/always-unity-view-3.jpg"], development:[{n:"Blender wireframe · full environment",i:"assets/always-wireframe-top.png"},{n:"Blender wireframe · side elevation",i:"assets/always-wireframe-side.png"},{n:"Blender wireframe · plan view",i:"assets/always-wireframe-plan.png"},{n:"Blender solid/material viewport",i:"assets/always-blender-solid.png"},{n:"Unity lighting setup",i:"assets/always-unity-lighting.png"}], breakdown:[{n:"Kitchen Hanging Light · Base Colour",i:"assets/hanginglight-basecolor.png"},{n:"Kitchen Hanging Light · Normal",i:"assets/hanginglight-normal.png"},{n:"Kitchen Hanging Light · Roughness",i:"assets/hanginglight-roughness.png"},{n:"Kitchen Hanging Light · Metallic",i:"assets/hanginglight-metallic.png"},{n:"Kitchen Hanging Light · Height",i:"assets/hanginglight-height.png"},{n:"Kitchen Hanging Light · AO",i:"assets/hanginglight-ao.png"},{n:"TV Stand · Base Colour",i:"assets/tvstand-basecolor.png"},{n:"TV Stand · Normal",i:"assets/tvstand-normal.png"},{n:"TV Stand · Roughness",i:"assets/tvstand-roughness.png"},{n:"TV Stand · Metallic",i:"assets/tvstand-metallic.png"},{n:"TV Stand · Height",i:"assets/tvstand-height.png"},{n:"TV Stand · AO",i:"assets/tvstand-ao.png"},{n:"Pipework · Base Colour",i:"assets/pipes-basecolor.png"},{n:"Pipework · Normal",i:"assets/pipes-normal.png"},{n:"Pipework · Roughness",i:"assets/pipes-roughness.png"},{n:"Pipework · Metallic",i:"assets/pipes-metallic.png"},{n:"Pipework · Displacement",i:"assets/pipes-displacement.png"},{n:"Pipework · Emission",i:"assets/pipes-emission.png"},{n:"Bed · Base Colour",i:"assets/bed-basecolor.png"},{n:"Bed · Normal",i:"assets/bed-normal.png"},{n:"Bed · Roughness",i:"assets/bed-roughness.png"},{n:"Bed · Metallic",i:"assets/bed-metallic.png"},{n:"Bed · AO",i:"assets/bed-ao.png"}], highlights:["Industrial material language","Night-city backdrop","Compact VR-friendly layout","Warm interior contrast"]
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
    image:"assets/soras-home-3.png",
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
    image:"assets/pharanoa.png",
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
  const gallery=(c.gallery||[]).map(x=>`<img src="${x}" alt="${c.title} project image">`).join("");
  const developmentItems=(c.development||[]);
  const constructionDevelopment=developmentItems.filter(x=>!x.n.toLowerCase().includes("lighting"));
  const lightingDevelopment=developmentItems.filter(x=>x.n.toLowerCase().includes("lighting"));
  const development=constructionDevelopment.map(x=>`<figure class="dev-card"><button class="breakdown-zoom" type="button" aria-label="Open ${x.n}"><img src="${x.i}" alt="${x.n}"></button><figcaption>${x.n}<small>Click image to enlarge</small></figcaption></figure>`).join("");
  const lightingViews=lightingDevelopment.map(x=>`<figure class="dev-card lighting-card"><button class="breakdown-zoom" type="button" aria-label="Open ${x.n}"><img src="${x.i}" alt="${x.n}"></button><figcaption>${x.n}<small>Click image to enlarge</small></figcaption></figure>`).join("");
  const stats=c.stats?Object.entries(c.stats).map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join(""):"";
  const breakdown=(c.breakdown||[]).map(x=>`<figure class="breakdown-card"><button class="breakdown-zoom" type="button" aria-label="Open ${x.n}"><img src="${x.i}" alt="${x.n}"></button><figcaption>${x.n}<small>Click image to enlarge</small></figcaption></figure>`).join("");
  caseContent.innerHTML=`
    <p class="case-kicker">${c.kicker}</p>
    <h2>${c.title}</h2>
    <p class="case-summary">${c.summary}</p>
    ${c.date?`<p class="case-kicker">PROJECT DATE · ${c.date}</p>`:""}
    <img class="case-hero" src="${c.image}" alt="${c.title}">
    ${gallery?`<div class="case-gallery">${gallery}</div>`:""}
    ${development?`<div class="case-breakdown case-development"><div class="case-breakdown-head"><div><p class="case-kicker">DEVELOPMENT VIEWS</p><h3>Wireframe & viewport</h3></div><p>These views show the underlying scene construction and modelling work behind the finished environment.</p></div><div class="case-development-grid">${development}</div></div>`:""}
    ${lightingViews?`<div class="case-breakdown case-development case-lighting"><div class="case-breakdown-head"><div><p class="case-kicker">LIGHTING DEVELOPMENT</p><h3>Unity lighting setup</h3></div><p>The lighting setup is shown separately so it reads as lighting work rather than a modelling or wireframe view.</p></div><div class="case-lighting-grid">${lightingViews}</div></div>`:""}
    ${stats?`<div class="case-stats">${stats}</div>`:""}
    <div class="case-grid">
      <div class="case-block"><span>Tools</span><strong>${c.tools}</strong></div>
      <div class="case-block"><span>Focus</span><strong>${c.focus}</strong></div>
      <div class="case-block"><span>Project</span><strong>${c.type}</strong></div>
    </div>
    <div class="case-role"><span>My role</span><p>${c.role}</p></div>
    ${c.contribution?`<div class="case-role"><span>What I made</span><p>${c.contribution}</p></div>`:""}
    ${c.story?`<div class="case-role"><span>Project story</span><p>${c.story}</p></div>`:""}
    ${breakdown?`<div class="case-breakdown"><div class="case-breakdown-head"><div><p class="case-kicker">TECHNICAL BREAKDOWN</p><h3>Materials & texture maps</h3></div><p>Open any map to inspect the UV layout and material work at full size.</p></div><div class="case-breakdown-grid">${breakdown}</div></div>`:""}
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
  caseContent.querySelectorAll(".breakdown-zoom").forEach(btn=>btn.addEventListener("click",()=>{const img=btn.querySelector("img");lightboxImage.src=img.src;lightboxImage.alt=img.alt;lightboxCaption.textContent=img.alt;lightbox.classList.add("open")}));
  caseContent.querySelectorAll(".case-gallery img").forEach(img=>img.addEventListener("click",()=>{lightboxImage.src=img.src;lightboxImage.alt=img.alt;lightboxCaption.textContent=img.alt;lightbox.classList.add("open")}));
  caseModal.classList.add("open");
  document.body.style.overflow="hidden";
}
function closeCase(){caseModal?.classList.remove("open");document.body.style.overflow=""}
document.querySelectorAll(".case-study-btn").forEach(b=>b.addEventListener("click",()=>openCase(b.dataset.case)));document.getElementById("caseClose")?.addEventListener("click",closeCase);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeLightbox();closeCase();closeChat()}if(lightbox?.classList.contains("open")&&e.key==="ArrowLeft")showLightbox(lightboxIndex-1);if(lightbox?.classList.contains("open")&&e.key==="ArrowRight")showLightbox(lightboxIndex+1)});

document.querySelectorAll(".v10-case-hero[role=button]").forEach(el=>el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCase(el.dataset.case)}}));
