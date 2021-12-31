
// check the localStorage

let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);

    // remove class active
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if(element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}



// Toggle setting box
document.querySelector(".toggle .icon").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}


// switch colors
const colorsList = document.querySelectorAll(".colors-list li");

colorsList.forEach(li => {
    li.addEventListener("click", e => {
        // set property on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // set localStorage
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActive(e);
    });
});

// create random background 
let randomBackGround = true;

// create inteval variable

let backgroundInt;


// switch backgrounds options
const randomBg = document.querySelectorAll(".backgrounds span");

// check local storage if has a backgorund 
let bgLocalItem = localStorage.getItem("background_option");

if(bgLocalItem !== null) {
    
    if(bgLocalItem === "true") {
        background_option = true;
    }else {
        background_option = false
    }
    randomBg.forEach(ele => {
        ele.addEventListener("click", (e) => {
            handleActive(e);
        });
    });
    if (bgLocalItem === "true") {
        document.querySelector(".backgrounds .yes").classList.add("active");
    }else {
        document.querySelector(".backgrounds .no").classList.add("active");
    }
}
randomBg.forEach(ele => {
    ele.addEventListener("click", e => {

        
        if (e.target.dataset.background === "yes") {
            randomBackGround = true;
            backgroundInterval();
            localStorage.setItem("background_option", true);
        }else {
            randomBackGround = false;
            clearInterval(backgroundInt);
            localStorage.setItem("background_option", false);
        }
    });
});

// get landing element
let landingPage = document.querySelector(".landing");
// get array 
let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];



function backgroundInterval () {
    backgroundInt = setInterval(() => {
        // create random number
        let randNum = Math.floor(Math.random() * imgs.length);
        landingPage.style.backgroundImage = `url('imgs/${imgs[randNum]}')`;
    }, 10000);
}

backgroundInterval();

// select skills selector
let skills = document.querySelector(".skills");

window.onscroll = function() {
    // get the offsetTop
    let skillOffsetTop = skills.offsetTop;
    // skill outer offset
    let skillOuteroffset = skills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // window scroll top
    let windowScrollTop = this.scrollY;

    if(windowScrollTop > (skillOffsetTop + skillOuteroffset - windowHeight)) {
        let allSkills = document.querySelectorAll(".skills .box .progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// popup box
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach(ele => {
    ele.addEventListener("click", (e) => {

        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        // create heading
        if (ele.alt !== null) {
            // create heading
            let imageHeading = document.createElement("h3");
            // ceate text
            let imageText = document.createTextNode(ele.alt);
            // append text to image head
            imageHeading.appendChild(imageText);
            // append image heading to popup box
            popupBox.appendChild(imageHeading);
        }

        // create the image
        let popupImg = document.createElement("img");
        popupImg.src = ele.src;
        // add image to popup box
        popupBox.appendChild(popupImg);
        // add popup box to body
        document.body.appendChild(popupBox);
        // create close button
        let closeBtn = document.createElement("span");
        // create text to close
        let closeText = document.createTextNode("x");
        // append text to close
        closeBtn.appendChild(closeText);
        // add class to close button
        closeBtn.className = "close-btn";
        // append closeBtn to popup box
        popupBox.appendChild(closeBtn);
    });
});
document.addEventListener("click", (e) => {
    if(e.target.className == "close-btn") {
        // remove the button
        e.target.parentNode.remove();
        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links

const allLinks = document.querySelectorAll(".landing .header .links");

function scrollToData(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};

scrollToData(allBullets);
scrollToData(allLinks);

// create handle active

function handleActive(ev) {
    // remove class active
    let active = ev.target.parentElement.querySelectorAll(".active");
    active.forEach(element => {
        element.classList.remove("active");
    });
    // add class active
    ev.target.classList.add("active");
};

// show bullets
let bulletsShow = document.querySelectorAll(".bullets-option span");
let buletsContainer = document.querySelector(".nav-bullets");
let bulletLocalStorage = localStorage.getItem("bullets-option");
if(bulletLocalStorage !== null) {
    bulletsShow.forEach(ele => {
        ele.classList.remove("active")
    });
    if(bulletLocalStorage === "block") {
        buletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else {
        buletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsShow.forEach(ele => {
    ele.addEventListener("click", (e) => {
        if(ele.dataset.display === "yes") {
            buletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block")
        }else {
            buletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none")
        }
        handleActive(e);
    });
});

// reset option
let resetBtn = document.querySelector(".setting-box .reset");

resetBtn.onclick = function () {
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");

    // reload window
    window.location.reload();
}

// toggle menu
let toggleBtn = document.querySelector(".toggle-btn");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function(e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open")
};

// click outside and toggle menu
document.addEventListener("click", (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open")
        }
    }


});
// stop propagation on menu
tLinks.onclick = function(e) {
    e.stopPropagation()
}