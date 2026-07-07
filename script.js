/*=========================================================
    MemeVerse AI
    Professional Script
    Part 1 - Foundation
=========================================================*/

"use strict";

const MemeVerse = {

    version: "1.0.0",

    elements: {},

    data: {

        prompts: [

            "Shrek becomes Iron Man",

            "Batman opens a tea stall",

            "Gru starts coding",

            "Mr Bean becomes Prime Minister",

            "Thanos works at McDonald's",

            "Tom & Jerry become YouTubers",

            "Spider-Man sells pani puri",

            "Doge starts a company",

            "Breaking Bad in Hogwarts",

            "Among Us in Jurassic Park"

        ],

        favorites: []

    },

    init(){

        this.cacheDOM();

        this.loadStorage();

        this.bindEvents();

        this.start();

    },

    cacheDOM(){

        this.elements.header =
        document.querySelector(".header");

        this.elements.promptBox =
        document.querySelector("#promptBox");

        this.elements.resultArea =
        document.querySelector("#resultArea");

        this.elements.generateBtn =
        document.querySelector("#generateBtn");

        this.elements.randomBtn =
        document.querySelector("#randomPrompt");

        this.elements.searchInput =
        document.querySelector("#searchInput") ||
        document.querySelector(".search-box input");

        this.elements.searchBtn =
        document.querySelector("#searchBtn") ||
        document.querySelector(".search-box button");

        this.elements.templateCards =
        document.querySelectorAll(".template-card");

        this.elements.previewButtons =
        document.querySelectorAll(".preview-btn");

        this.elements.generateButtons =
        document.querySelectorAll(".generate-btn");

    },

    bindEvents(){

        if(this.elements.generateBtn){

            this.elements.generateBtn.addEventListener(

                "click",

                ()=>this.generate()

            );

        }

        if(this.elements.randomBtn){

            this.elements.randomBtn.addEventListener(

                "click",

                ()=>this.randomPrompt()

            );

        }

        this.elements.generateButtons.forEach(button=>{

            button.addEventListener(

                "click",

                ()=>this.generate()

            );

        });

        this.elements.previewButtons.forEach(button=>{

            button.addEventListener(

                "click",

                ()=>this.preview(button)

            );

        });

    },

    start(){

        console.log(

            "🚀 MemeVerse AI Started"

        );

    },

    loadStorage(){

        const data =

        localStorage.getItem(

            "mv_favorites"

        );

        if(data){

            this.data.favorites =

            JSON.parse(data);

        }

    },

    saveStorage(){

        localStorage.setItem(

            "mv_favorites",

            JSON.stringify(

                this.data.favorites

            )

        );

    },

    loading(){

        if(!this.elements.resultArea) return;

        this.elements.resultArea.innerHTML =

        `
        <div class="loading"></div>
        <h3>Generating AI Meme...</h3>
        `;

    }

};

/*=========================================
    START APPLICATION
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        MemeVerse.init();

    }

);
/*=========================================================
    MemeVerse AI
    Professional Script
    Part 2 - Meme Generator
=========================================================*/

Object.assign(MemeVerse,{

    randomPrompt(){

        const list=this.data.prompts;

        const random=list[
            Math.floor(Math.random()*list.length)
        ];

        if(this.elements.promptBox){

            this.elements.promptBox.value=random;

        }

        this.toast("🎲 Random prompt selected");

    },

    generate(){

        if(!this.elements.resultArea) return;

        let prompt="";

        if(
            this.elements.promptBox &&
            this.elements.promptBox.value.trim()!==""
        ){

            prompt=this.elements.promptBox.value.trim();

        }else{

            prompt=this.data.prompts[
                Math.floor(
                    Math.random()*this.data.prompts.length
                )
            ];

        }

        this.loading();

        setTimeout(()=>{

            this.showResult(prompt);

        },1500);

    },

    showResult(prompt){

        const time=new Date().toLocaleTimeString();

        this.elements.resultArea.innerHTML=`

            <div class="generated-card">

                <h2>🤖 AI Meme Generated</h2>

                <p class="generated-text">

                    ${prompt}

                </p>

                <small>

                    Generated at ${time}

                </small>

                <br><br>

                <button id="copyResult">

                    📋 Copy

                </button>

            </div>

        `;

        const copyButton=

        document.querySelector("#copyResult");

        if(copyButton){

            copyButton.addEventListener(

                "click",

                ()=>{

                    navigator.clipboard.writeText(prompt);

                    this.toast("📋 Copied!");

                }

            );

        }

    },

    preview(button){

        const card=

        button.closest(".template-card");

        if(!card){

            this.toast("Preview unavailable");

            return;

        }

        const title=

        card.querySelector("h3") ?

        card.querySelector("h3").innerText :

        "Template";

        this.toast("👀 Preview : "+title);

    },

    toast(message){

        let toast=

        document.querySelector(".mv-toast");

        if(toast){

            toast.remove();

        }

        toast=document.createElement("div");

        toast.className="mv-toast";

        toast.textContent=message;

        document.body.appendChild(toast);

        requestAnimationFrame(()=>{

            toast.classList.add("show");

        });

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },2200);

    }

});
/*=========================================================
    MemeVerse AI
    Professional Script
    Part 3 - Search & Favorites
=========================================================*/

Object.assign(MemeVerse,{

    search(query){

        query=query.toLowerCase().trim();

        this.elements.templateCards.forEach(card=>{

            const text=card.innerText.toLowerCase();

            card.style.display=text.includes(query)?"":"none";

        });

    },

    addFavorite(title){

        if(this.data.favorites.includes(title)){

            this.toast("❤️ Already in Favorites");

            return;

        }

        this.data.favorites.push(title);

        this.saveStorage();

        this.toast("❤️ Added to Favorites");

    },

    removeFavorite(title){

        this.data.favorites=

        this.data.favorites.filter(

            item=>item!==title

        );

        this.saveStorage();

        this.toast("🗑️ Removed from Favorites");

    },

    clearFavorites(){

        this.data.favorites=[];

        this.saveStorage();

        this.toast("🧹 Favorites Cleared");

    },

    bindSearch(){

        if(this.elements.searchInput){

            this.elements.searchInput.addEventListener(

                "input",

                (e)=>{

                    this.search(e.target.value);

                }

            );

        }

        if(this.elements.searchBtn){

            this.elements.searchBtn.addEventListener(

                "click",

                ()=>{

                    const value=

                    this.elements.searchInput ?

                    this.elements.searchInput.value :

                    "";

                    this.search(value);

                }

            );

        }

    },

    bindFavorites(){

        this.elements.generateButtons.forEach(button=>{

            button.addEventListener(

                "contextmenu",

                (e)=>{

                    e.preventDefault();

                    const card=

                    button.closest(".template-card");

                    if(!card) return;

                    const title=

                    card.querySelector("h3") ?

                    card.querySelector("h3").innerText :

                    "Unknown";

                    this.addFavorite(title);

                }

            );

        });

    }

});

/*=========================================
    EXTEND STARTUP
=========================================*/

const oldStart=MemeVerse.start.bind(MemeVerse);

MemeVerse.start=function(){

    oldStart();

    this.bindSearch();

    this.bindFavorites();

    console.log("✅ Search Ready");

    console.log("✅ Favorites Ready");

};
/*=========================================================
    MemeVerse AI
    Professional Script
    Part 4 - Navigation & UI
=========================================================*/

Object.assign(MemeVerse,{

    initNavbar(){

        const header=this.elements.header;

        if(!header) return;

        window.addEventListener("scroll",()=>{

            if(window.scrollY>80){

                header.classList.add("scrolled");

            }else{

                header.classList.remove("scrolled");

            }

        });

    },

    initMobileMenu(){

        const menu=document.querySelector(".menu-toggle");

        const nav=document.querySelector(".nav-menu");

        if(!menu || !nav) return;

        menu.addEventListener("click",()=>{

            nav.classList.toggle("active");

            menu.classList.toggle("active");

        });

    },

    smoothScroll(){

        document.querySelectorAll('a[href^="#"]').forEach(link=>{

            link.addEventListener("click",(e)=>{

                const id=link.getAttribute("href");

                if(id==="#") return;

                const target=document.querySelector(id);

                if(!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            });

        });

    },

    createBackToTop(){

        const button=document.createElement("button");

        button.id="backToTop";

        button.innerHTML="⬆";

        document.body.appendChild(button);

        window.addEventListener("scroll",()=>{

            if(window.scrollY>500){

                button.classList.add("show");

            }else{

                button.classList.remove("show");

            }

        });

        button.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    },

    rippleEffect(){

        document.querySelectorAll("button").forEach(btn=>{

            btn.addEventListener("click",(e)=>{

                const ripple=document.createElement("span");

                ripple.className="mv-ripple";

                const rect=btn.getBoundingClientRect();

                const size=Math.max(rect.width,rect.height);

                ripple.style.width=size+"px";

                ripple.style.height=size+"px";

                ripple.style.left=(e.clientX-rect.left-size/2)+"px";

                ripple.style.top=(e.clientY-rect.top-size/2)+"px";

                btn.appendChild(ripple);

                setTimeout(()=>{

                    ripple.remove();

                },600);

            });

        });

    }

});

/*=========================================
    EXTEND STARTUP AGAIN
=========================================*/

const previousStart=MemeVerse.start.bind(MemeVerse);

MemeVerse.start=function(){

    previousStart();

    this.initNavbar();

    this.initMobileMenu();

    this.smoothScroll();

    this.createBackToTop();

    this.rippleEffect();

    console.log("✅ Navigation Ready");

};
/*=========================================================
    MemeVerse AI
    Professional Script
    Part 5 - Dark Mode & Animations
=========================================================*/

Object.assign(MemeVerse,{

    initDarkMode(){

        let darkButton=document.querySelector("#darkModeBtn");

        if(!darkButton){

            darkButton=document.createElement("button");

            darkButton.id="darkModeBtn";

            darkButton.innerHTML="🌙";

            document.body.appendChild(darkButton);

        }

        const saved=localStorage.getItem("mv_theme");

        if(saved==="dark"){

            document.body.classList.add("dark-mode");

            darkButton.innerHTML="☀️";

        }

        darkButton.addEventListener("click",()=>{

            document.body.classList.toggle("dark-mode");

            const dark=document.body.classList.contains("dark-mode");

            localStorage.setItem(

                "mv_theme",

                dark?"dark":"light"

            );

            darkButton.innerHTML=

            dark?"☀️":"🌙";

            this.toast(

                dark?

                "🌙 Dark Mode Enabled":

                "☀️ Light Mode Enabled"

            );

        });

    },

    revealOnScroll(){

        const items=document.querySelectorAll(

            ".template-card,.category-card,.feature-card,.trend-card,.about-box,.faq-item,.contact-wrapper,.community-content"

        );

        const observer=new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        entry.target.classList.add("reveal");

                    }

                });

            },

            {

                threshold:0.15

            }

        );

        items.forEach(item=>{

            observer.observe(item);

        });

    },

    keyboardShortcuts(){

        document.addEventListener("keydown",(e)=>{

            if(e.ctrlKey && e.key==="Enter"){

                this.generate();

            }

            if(e.key==="Escape"){

                if(this.elements.promptBox){

                    this.elements.promptBox.value="";

                }

            }

        });

    },

    sessionCounter(){

        let visits=

        Number(

            localStorage.getItem("mv_visits")||0

        );

        visits++;

        localStorage.setItem(

            "mv_visits",

            visits

        );

        console.log(

            "Visits:",

            visits

        );

    }

});

/*=========================================
    EXTEND STARTUP
=========================================*/

const startV5=MemeVerse.start.bind(MemeVerse);

MemeVerse.start=function(){

    startV5();

    this.initDarkMode();

    this.revealOnScroll();

    this.keyboardShortcuts();

    this.sessionCounter();

    console.log("✅ UI Enhancements Ready");

};
/*=========================================================
    MemeVerse AI
    Professional Script
    Part 6 - Performance & Utilities
=========================================================*/

Object.assign(MemeVerse,{

    initUtilities(){

        this.lazyImages();

        this.autoPrompt();

        this.initShare();

        this.preloadImages();

    },

    /*=====================================
      Lazy Image Loading
    =====================================*/

    lazyImages(){

        const images=document.querySelectorAll("img[data-src]");

        if(images.length===0) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const img=entry.target;

                img.src=img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            });

        });

        images.forEach(img=>observer.observe(img));

    },

    /*=====================================
      Auto Prompt
    =====================================*/

    autoPrompt(){

        if(!this.elements.promptBox) return;

        setInterval(()=>{

            if(this.elements.promptBox.value.trim()!=="") return;

            const random=

            this.data.prompts[

                Math.floor(

                    Math.random()*this.data.prompts.length

                )

            ];

            this.elements.promptBox.placeholder=

            "Example: "+random;

        },5000);

    },

    /*=====================================
      Share Result
    =====================================*/

    initShare(){

        document.addEventListener("click",(e)=>{

            if(e.target.id!=="shareResult") return;

            const text=

            this.elements.resultArea?

            this.elements.resultArea.innerText:

            "";

            if(navigator.share){

                navigator.share({

                    title:"MemeVerse AI",

                    text:text

                });

            }else{

                navigator.clipboard.writeText(text);

                this.toast(

                    "📋 Share not supported. Copied instead."

                );

            }

        });

    },

    /*=====================================
      Preload Images
    =====================================*/

    preloadImages(){

        document.querySelectorAll("img").forEach(img=>{

            if(img.complete) return;

            img.loading="lazy";

            img.decoding="async";

        });

    }

});
