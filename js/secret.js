const PASSWORD='MM';
const gate=document.querySelector('#secret-gate');
const room=document.querySelector('#secret-room');
const form=document.querySelector('#password-form');
const input=document.querySelector('#secret-password');
const error=document.querySelector('#password-error');
const lockButton=document.querySelector('#lock-room');
const checkboxes=[...document.querySelectorAll('[data-dream]')];
const progress=document.querySelector('#dream-progress');

function openRoom(){gate.hidden=true;room.hidden=false;sessionStorage.setItem('secret-room-open','yes')}
function closeRoom(){sessionStorage.removeItem('secret-room-open');room.hidden=true;gate.hidden=false;input.value='';input.focus()}
function updateProgress(){progress.textContent=`${checkboxes.filter(box=>box.checked).length} / ${checkboxes.length}`}

form.addEventListener('submit',event=>{event.preventDefault();if(input.value===PASSWORD){error.textContent='';openRoom()}else{error.textContent='合言葉が違います。扉はまだ閉じています。';input.select()}});
lockButton.addEventListener('click',closeRoom);
checkboxes.forEach(box=>{const key=`ocha-dream-${box.dataset.dream}`;box.checked=localStorage.getItem(key)==='done';box.addEventListener('change',()=>{localStorage.setItem(key,box.checked?'done':'');updateProgress()})});
updateProgress();
if(sessionStorage.getItem('secret-room-open')==='yes') openRoom();
