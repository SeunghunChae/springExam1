



window.onload = function(){
    const body = document.querySelector('body');
    const modal = document.getElementById("modal");
    const modalbody = document.getElementById("modal_body");
    const btnModal = document.getElementById("btn-modal");


    modal.style.display = "flex";
    
    modal.addEventListener("click", e => {
        console.log("클릭");
        const evTarget = e.target
        if(evTarget.classList.contains("modal")) {
            modal.style.display = "none"
        }
    })
}




// const body = document.querySelector('body');
//       const modal = document.querySelector('.modal');
//       const btnOpenPopup = document.querySelector('.btn-open-popup');

//       btnOpenPopup.addEventListener('click', () => {
//         modal.classList.toggle('show');

//         if (modal.classList.contains('show')) {
//           body.style.overflow = 'hidden';
//         }
//       });

