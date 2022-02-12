
window.addEventListener("DOMContentLoaded", function () {
    displayKitchen(kitchens);
    
  });


var counter = [];

function slider(num, left, right, counter) {
    let slides = document.querySelectorAll(".slide");
    let targetSlide = [];

    slides.forEach(function (slide) {
        if (num == slide.getAttribute("data-number") && slide.parentNode == right.parentNode) {
            slide.style.transform = `translateX(-${counter * 100}%)`;
            targetSlide.push(slide);
        } 
        
    });

    if (counter < 0) {
        counter = 0;
    }
    if(counter < targetSlide.length-1) {
        right.style.display = "block";
    } else {
        right.style.display = "none";

    }
    if (counter > 0) {
        left.style.display = "block";
    } else {
        left.style.display = "none";
    }
 }


function modalSlider(num, left, right, counter) {
    const slides = document.querySelectorAll(".slide");
    const modalTargetSlide = [];
    const allright = document.querySelectorAll(".fa-angle-right");

    slides.forEach(function (slide) {
        if (num == slide.getAttribute("data-number")) {
            slide.style.transform = `translateX(-${counter * 100}%)`;
            modalTargetSlide.push(slide);
        }
    })

    if (counter < 0) {
        counter = 0;
    }
    if (counter <(modalTargetSlide.length/2)-1) {
        right.style.display = "block";
    } else {
        right.style.display = "none";
        allright.forEach(function (i) {
            if (i.getAttribute("data-number") == right.getAttribute("data-number")) {
                i.style.display = "none";
            }
        });

    }
    if (counter > 0) {
        left.style.display = "block";
    } else {
        left.style.display = "none";
    }
}




const content = document.querySelector(".content-section");


function displayKitchen(kitchens) {

    let displaykitchens = kitchens.map(function (kitchen, index) {
        return `<div class="content">
                   <div class="slide-area">
                  </div>
                  <div class="description">
                    <header class="door">${kitchen.door}</header> 
                        <h5>${kitchen.colour}</h5>
                        <svg width="190" height="15">
                        <rect width="190" height="1" style="fill: rgb(255, 218, 26, 1); stroke-width:10; stroke: rgb(255, 218, 26, 1)" />
                        </svg>
                        <h4 class="character">${kitchen.character}</h4>
                        
                 </div>
                </div>`

    });
    displaykitchens = displaykitchens.join("");
    content.innerHTML = displaykitchens;
    modalWindow();




    /**to slide pictures */

    const slideArea = document.querySelectorAll(".slide-area");
    

    slideArea.forEach(function (slide, index) {

        if (Array.isArray(kitchens[index].picture)) {
            for (i in kitchens[index].picture) {
                let div = elt("div", { class: "slide" });
                let imgs = elt("img", { src: `${kitchens[index].picture[i]}` });
                div.setAttribute("data-number", index);
                slide.appendChild(div);
                div.setAttribute('left', `${i * 100}%`)
                div.appendChild(imgs);
            } index++;
        } else {
            let div = elt("div", { class: "slide" });
            let imgs = elt("img", { src: `${kitchens[index].picture}` });
            div.setAttribute("data-number", index);
            slide.appendChild(div);
            div.appendChild(imgs);
        } index++;
    });

    slideArea.forEach(function (slide, index) {
        let left = elt("i", { class: "fas fa-angle-left fa-4x" });
        let right = elt("i", { class: "fas fa-angle-right fa-4x" });
        left.setAttribute("data-number", index);
        right.setAttribute("data-number", index);
        slide.appendChild(left);
        slide.appendChild(right);
        counter.push(0);
      

        right.addEventListener("click", function(e) {
            let num = right.getAttribute("data-number");
            counter[index]++;
            slider(num, left, right, counter[index]);
            e.stopPropagation();
     
        });
      

        left.addEventListener("click", function(e) {
            let num = left.getAttribute("data-number");
            counter[index]--;
            slider(num, left, right,counter[index]);
            e.stopPropagation();
         
        });
    })
};


/*modal popup*/


function modalWindow() {
    const slideArea = document.querySelectorAll(".slide-area");
    const modal = document.querySelector(".modal-overlay");
    const closeBtn = document.querySelector(".close-btn");
    const slideContainer = document.querySelector(".slide-container");
    

    for (i = 0; i < slideArea.length; i++) {
        slideArea[i].addEventListener("click", function (e) {

            modal.classList.add("open-modal");

            slideContainer.innerHTML = e.currentTarget.innerHTML;

            let right = slideContainer.querySelector(".fa-angle-right");
            let left = slideContainer.querySelector(".fa-angle-left");

                right.addEventListener("click", function (e) {
                    let num = right.getAttribute("data-number");
                    counter[num]++;
                    modalSlider(num, left, right, counter[num]);
                    
                })


                left.addEventListener("click", function (e) {
                    let num = left.getAttribute("data-number");
                    counter[num]--;
                    modalSlider(num, left, right, counter[num]);
                    
                })
         
        })
    }
    closeBtn.addEventListener("click", function (e) {
        modal.classList.remove("open-modal");
    });

}

