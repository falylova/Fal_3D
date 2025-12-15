document.addEventListener('DOMContentLoaded', function() {
var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },
    mousewheel: true, // pour PC
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    allowTouchMove: true, // ✅ autorise le swipe tactile sur mobile
});


    swiper.on('slideChange', function () {
        const activeIndex = swiper.activeIndex;
        document.querySelectorAll(".Links li").forEach(li => li.classList.remove("activeLink"));
        if (activeIndex === 0) document.querySelectorAll(".Links li")[0].classList.add("activeLink");
        else if (activeIndex === 1) document.querySelectorAll(".Links li")[1].classList.add("activeLink");
        else if (activeIndex === 2) document.querySelectorAll(".Links li")[2].classList.add("activeLink");
        else if (activeIndex >= 3 && activeIndex <= 8) document.querySelectorAll(".Links li")[3].classList.add("activeLink");
        else if (activeIndex === 9) document.querySelectorAll(".Links li")[4].classList.add("activeLink");
    });

    window.Navigate = function(indx) {
        document.querySelectorAll(".Links li").forEach(li => li.classList.remove("activeLink"));
        document.querySelectorAll(".Links li")[indx === 9 ? 4 : indx].classList.add("activeLink");
        swiper.slideTo(indx, 1000, true);
    };

    // Tableau des projets : images ou vidéos
    const thumbs = [
        ["sary/vao.png","sary/1vao.png","sary/vaoframe.png"],
        ["sary/tsisran1.png","sary/tsisran.png","sary/MIAL.png","sary/parfunframe.png"],
        ["sary/untitled.png","sary/1.png","sary/lunetteframe.png"],
        ["sary/essay1.png","sary/essay.png","sary/chocoframe.png"],
        ["sary/sum.png","sary/face.png","sary/sisin.png","sary/frame.png"]
    ];

    // Fonction pour changer l'image principale ou vidéo
    window.changeMain = function(projectIndex, thumbIndex) {
        const projectSlide = document.querySelectorAll(".project-slide")[projectIndex];
        const mainContainer = projectSlide.querySelector(".main-photo");
        const src = thumbs[projectIndex][thumbIndex].trim();

        // Supprimer l'ancien contenu
        mainContainer.innerHTML = "";

        // Vérifier si c'est une vidéo ou une image
        if (src.endsWith(".mp4") || src.endsWith(".webm")) {
            const video = document.createElement("video");
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            mainContainer.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = src;
            mainContainer.appendChild(img);
        }
    };

    // Création dynamique des miniatures
    document.querySelectorAll(".project-slide").forEach((slide, pIndex) => {
        const thumbsContainer = slide.querySelector(".thumbs");
        if (!thumbsContainer || !thumbs[pIndex]) return;

        thumbsContainer.innerHTML = ""; // clear old thumbs

        thumbs[pIndex].forEach((src, tIndex) => {
            const thumb = document.createElement("img");
            thumb.src = src.trim();
            thumb.addEventListener("click", () => changeMain(pIndex, tIndex));
            thumbsContainer.appendChild(thumb);
        });
    });
});
