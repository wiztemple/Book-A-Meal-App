let modal = document.getElementById('simpleModal');

let modalBtn = document.getElementById('modalBtn');

let closeBtn = document.querySelector('.closeBtn');

// listen for open click
modalBtn.addEventListener('click', openModal);

// listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click
window.addEventListener('click', clickOutSide);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutSide(e){
  if(e.target == modal) {
    modal.style.display = 'none';
  }
};

let modalBtn2 = document.getElementById('modalBtn2');
let closeBtn2 = document.querySelector('.closeBtn2');

modalBtn2.addEventListener('click', openModal2);
closeBtn2.addEventListener('click', closeModal2);
let modal2 = document.getElementById('simpleModal2');
function openModal2(){
  modal2.style.display = 'block';
}
function closeModal2(){
  modal2.style.display = 'none';
}
function clickOutSide2(e){
  if(e.target == modal2) {
    modal2.style.display = 'none';
  }
};