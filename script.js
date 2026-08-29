const menuButton=document.getElementById('menuButton');
const mainNav=document.getElementById('mainNav');
menuButton?.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
mainNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));

document.getElementById('year').textContent=new Date().getFullYear();

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const dialog=document.getElementById('bookingDialog');
const closeBooking=document.getElementById('closeBooking');
const bookingFormView=document.getElementById('bookingFormView');
const confirmation=document.getElementById('bookingConfirmation');
const bookingForm=document.getElementById('bookingForm');
const bookingDate=document.getElementById('bookingDate');
const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());bookingDate.min=today.toISOString().split('T')[0];

document.querySelectorAll('[data-open-booking]').forEach(btn=>btn.addEventListener('click',()=>{dialog.showModal();}));
closeBooking.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});

bookingForm.addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(bookingForm));
  document.getElementById('bookingSummary').innerHTML=`<strong>Din forespørgsel</strong><br>Behandling: ${escapeHtml(data.service)}<br>Dato: ${escapeHtml(data.date)}<br>Tid: ${escapeHtml(data.time)}<br>Navn: ${escapeHtml(data.name)}`;
  bookingFormView.hidden=true;confirmation.hidden=false;
});

document.getElementById('newBooking').addEventListener('click',()=>{bookingForm.reset();confirmation.hidden=true;bookingFormView.hidden=false;});

document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('contactMessage').textContent='Tak! Formularen er en demo lige nu. Vi kobler rigtig e-mail på senere.';e.target.reset();});

function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));}
