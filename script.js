const WHATSAPP = "919405952367";

const categories = [
  { id:"optical", name:"Optical Frames", label:"Everyday optical", image:"images/products/eyeglass-01.jpg", featured:"Classic Black", price:"₹1,499", intro:"Clean everyday frames for prescription eyewear and personal style." },
  { id:"sunglasses", name:"Sunglasses", label:"Sun protection + style", image:"images/products/sunglasses-01.jpg", featured:"Urban Shadow", price:"₹1,999", intro:"Everyday shades for outdoor comfort and a sharper look." },
  { id:"kids", name:"Kids Eyewear", label:"Comfort for little faces", image:"images/products/kids-01.jpg", featured:"Smart Kids", price:"₹999", intro:"Light, comfortable options designed for younger wearers." },
  { id:"lenses", name:"Lenses", label:"Made for your needs", image:null, featured:"Clear Vision", price:"Ask for options", intro:"Explore clear, anti-glare, blue-light and photochromic lens options based on your prescription and routine." }
];

const products = {
  optical:[
    {name:"Classic Black", price:"₹1,499", image:"images/products/eyeglass-01.jpg", note:"Everyday optical frame"},
    {name:"Modern Silver", price:"₹1,799", image:"images/products/eyeglass-02.jpg", note:"Clean modern optical frame"},
    {name:"Classic Premium", price:"₹1,899", image:"images/products/frame-01.jpg", note:"Premium everyday frame"}
  ],
  sunglasses:[
    {name:"Urban Shadow", price:"₹1,999", image:"images/products/sunglasses-01.jpg", note:"Everyday sunglasses"},
    {name:"Premium Black", price:"₹2,299", image:"images/products/sunglasses-02.jpg", note:"Statement sunglasses"}
  ],
  kids:[
    {name:"Smart Kids", price:"₹999", image:"images/products/kids-01.jpg", note:"Comfortable kids eyewear"}
  ],
  lenses:[
    {name:"Clear Vision", price:"Ask for options", lens:true, note:"Everyday clear lens"},
    {name:"Anti-Glare", price:"Ask for options", lens:true, note:"Reduced reflections for everyday screens and driving"},
    {name:"Blue Light", price:"Ask for options", lens:true, note:"Screen-focused lens option"},
    {name:"Photochromic", price:"Ask for options", lens:true, note:"Light-adaptive lens option"}
  ]
};

const services = [
  {icon:"01", name:"Eye Testing", text:"A simple vision-check experience with guidance on the next step."},
  {icon:"02", name:"Frame Fitting", text:"Find a comfortable fit and make small adjustments when needed."},
  {icon:"03", name:"Lens Guidance", text:"Compare lens types based on prescription, routine and comfort."},
  {icon:"04", name:"Eyewear Guidance", text:"Get practical help choosing frames, sunglasses or kids eyewear."},
  {icon:"05", name:"Sunglasses", text:"Choose everyday sunglasses around comfort, style and use."},
  {icon:"06", name:"Personal Support", text:"Message CLARIO directly for availability, pricing or help."}
];

function wa(text){ return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`; }
function esc(s){ return String(s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m])); }

function renderCategories(){
  const rail=document.getElementById("categoryRail");
  rail.innerHTML=categories.map((c,i)=>`
    <article class="category-card ${c.id==='lenses'?'lens-card':''}">
      <div class="category-media ${c.image?'':'lens-visual'}">${c.image?`<img src="${c.image}" alt="${esc(c.name)}">`:`<span class="lens-orbit"></span><span class="lens-core"></span>`}<span class="category-index">0${i+1}</span></div>
      <div class="category-info"><small>${esc(c.label)}</small><h3>${esc(c.name)}</h3><div class="featured-line"><span>${esc(c.featured)}</span><b>${esc(c.price)}</b></div><button class="explore-btn" type="button" data-category="${c.id}">Explore collection <span>→</span></button></div>
    </article>`).join("");
  rail.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>openCollection(b.dataset.category)));
}

function renderServices(){
  document.getElementById("serviceGrid").innerHTML=services.map(s=>`
    <article class="service-card"><div class="service-number">${s.icon}</div><div><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></div><button class="service-btn" type="button" data-service="${esc(s.name)}" data-text="${esc(s.text)}">Details <span>→</span></button></article>`).join("");
  document.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>openService(b.dataset.service,b.dataset.text)));
}

function openCollection(id){
  const c=categories.find(x=>x.id===id); const list=products[id]||[];
  document.getElementById("collectionKicker").textContent=`COLLECTION / ${c.name.toUpperCase()}`;
  document.getElementById("collectionTitle").textContent=c.name;
  document.getElementById("collectionIntro").textContent=c.intro;
  document.getElementById("modalProductGrid").innerHTML=list.map(p=>`
    <article class="modal-product-card">
      <div class="modal-product-media ${p.lens?'lens-visual':''}">${p.lens?'<span class="lens-orbit"></span><span class="lens-core"></span>':`<img src="${p.image}" alt="${esc(p.name)}">`}</div>
      <div class="modal-product-info"><small>${esc(p.note)}</small><h3>${esc(p.name)}</h3><strong>${esc(p.price)}</strong><a href="${wa(`Hello CLARIO, I am interested in ${p.name} (${c.name}). Please share availability and details.`)}" target="_blank" rel="noopener">Ask about this <span>↗</span></a></div>
    </article>`).join("");
  document.getElementById("collectionWhatsApp").href=wa(`Hello CLARIO, I would like to explore your ${c.name} collection. Please share available options.`);
  showOverlay("collectionModal");
}

function openService(name,text){
  document.getElementById("serviceTitle").textContent=name;
  document.getElementById("serviceText").textContent=text;
  document.getElementById("serviceWhatsApp").href=wa(`Hello CLARIO, I would like to know more about ${name}. ${text}`);
  showOverlay("serviceModal");
}
function showOverlay(id){ const el=document.getElementById(id); el.classList.add("open"); el.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open"); }
function hideOverlay(el){ el.classList.remove("open"); el.setAttribute("aria-hidden","true"); if(!document.querySelector(".overlay.open")) document.body.classList.remove("modal-open"); }

document.addEventListener("DOMContentLoaded",()=>{
  renderCategories(); renderServices();
  const toggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".nav-menu");
  toggle.addEventListener("click",()=>{ const open=nav.classList.toggle("open"); toggle.setAttribute("aria-expanded",open); toggle.textContent=open?"×":"☰"; });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.textContent="☰";toggle.setAttribute("aria-expanded","false");}));
  const sections=[...document.querySelectorAll("main section[id]")]; const links=[...nav.querySelectorAll("a")];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${entry.target.id}`));}}),{rootMargin:"-35% 0px -55% 0px",threshold:0}); sections.forEach(s=>observer.observe(s));
  document.querySelectorAll("[data-close],[data-close-service]").forEach(x=>x.addEventListener("click",()=>hideOverlay(x.closest(".overlay"))));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".overlay.open").forEach(hideOverlay);});
});
