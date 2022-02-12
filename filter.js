window.addEventListener("DOMContentLoaded", function () {
    makeColourFilter(kitchens);
    colourFilter(kitchens)
    searchOption();
});



const colour = document.querySelector("#COLOUR");
const colour_dropdown = document.querySelector(".colour-dropdown");

const btn_container = document.querySelector(".btn-container");
const content_section = document.querySelector(".content-section");





colour.addEventListener("click", function (e) {
    colour_dropdown.classList.toggle("open-dropdown");
    if (colour_dropdown.classList.contains("open-dropdown")) {
        btn_container.classList.add("btn-front");
    } else { btn_container.classList.remove("btn-front");}

})

const typeSearch = document.getElementById("type-search");
const search = document.getElementById("search");



typeSearch.addEventListener("change", function () {

    let searchValue = new RegExp(typeSearch.value,"i");

    let searched = kitchens.filter(function (kitchen) {

        if (searchValue.test(kitchen.door) || searchValue.test(kitchen.colour))
            return kitchen;
    })
    if (!searchValue)
    { displayKitchen(kitchens); }
    else {
        displayKitchen(searched);
    }

});

search.addEventListener("click", function () {

    let searchValue = new RegExp(typeSearch.value, "i");

    let searched = kitchens.filter(function (kitchen) {

        if (searchValue.test(kitchen.door) || searchValue.test(kitchen.colour))
            return kitchen;
    })
    if (!searchValue) { displayKitchen(kitchens); }
    else {
        displayKitchen(searched);
    }

});


function makeColourFilter(kitchens) {

    kitchens.forEach(function (kitchen) {
    
        var label = elt("label", {for:`${kitchen.colour}`});
        var span = elt("span");
        var input = elt("input", { type: "radio" });
        input.setAttribute("id", `${kitchen.colour}`);
        input.setAttribute("name", "colourFilter");
        var br = elt("br");
        
        label.appendChild(span);
        span.innerText = `${kitchen.colour}`;
        label.appendChild(input);
        colour_dropdown.appendChild(label);
        colour_dropdown.appendChild(br);
    })
}




function colourFilter(kitchens) {
    const colourChecked = colour_dropdown.querySelectorAll("label>input");

    colourChecked.forEach(function (element) {
        element.addEventListener("click", function (e) {

            let checkedValue = e.currentTarget.id;
            if (checkedValue == "All") {
                displayKitchen(kitchens);
            } else {
                let filtered = kitchens.filter(function (kitchen) {
                    if (kitchen.colour == checkedValue) {
                        return kitchen;
                    }
                })
                displayKitchen(filtered);
            }
       })
    })
}



function searchOption() {
    let search = document.querySelector(".btn-container>input");

    var datalist = elt("datalist", { id: "search-options" })
    search.appendChild(datalist);

    kitchens.forEach(function (v) {
        let dooroptions = elt("option", { value: `${v.door}` })
        dooroptions.innerText = `${v.door}`;
        datalist.appendChild(dooroptions);

                
    })
};


