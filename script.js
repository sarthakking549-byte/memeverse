/* =====================================================
   MemeVerse AI
   script.js - Part 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       Sticky Navbar
    -------------------------------- */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 50){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

    /* -------------------------------
       Smooth Scrolling
    -------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /* -------------------------------
       Search Templates
    -------------------------------- */

    const searchInput=document.querySelector("#searchInput");
    const memeCards=document.querySelectorAll(".template-card");

    if(searchInput){

        searchInput.addEventListener("keyup",()=>{

            const value=searchInput.value.toLowerCase();

            memeCards.forEach(card=>{

                const text=card.innerText.toLowerCase();

                if(text.includes(value)){

                    card.style.display="block";

                }else{

                    card.style.display="none";

                }

            });

        });

    }

    /* -------------------------------
       Random Prompt Generator
    -------------------------------- */

    const prompts=[

        "A sleepy panda attending online class",

        "Cat becoming CEO overnight",

        "Robot trying to cook noodles",

        "Alien discovering pizza",

        "Grandma playing battle royale",

        "Dog giving coding interview",

        "Monkey using smartphone",

        "Student before and after exams",

        "AI arguing with calculator",

        "Penguin on summer vacation",

        "Shark scared of tiny fish",

        "Programmer fixing one bug and creating ten more"

    ];

    const promptBox=document.querySelector("#promptBox");

    const randomBtn=document.querySelector("#randomPrompt");

    if(randomBtn){

        randomBtn.addEventListener("click",()=>{

            const random=Math.floor(Math.random()*prompts.length);

            promptBox.value=prompts[random];

        });

    }

    /* -------------------------------
       Fake AI Generator
    -------------------------------- */

    const generateBtn=document.querySelector("#generateBtn");

    const resultArea=document.querySelector("#resultArea");

    if(generateBtn){

        generateBtn.addEventListener("click",()=>{

            if(promptBox.value.trim()==""){

                alert("Please enter a prompt.");

                return;

            }

            resultArea.innerHTML=`

            <div class="loading"></div>

            <p style="margin-top:20px">

            AI is generating your meme...

            </p>

            `;

            setTimeout(()=>{

                resultArea.innerHTML=`

                <h3>😂 AI Meme Idea</h3>

                <p>

                ${promptBox.value}

                </p>

                <br>

                <p>

                Caption:

                "Expectation vs Reality... again!"

                </p>

                `;

            },2000);

        });

    }

});
/* =====================================================
   MemeVerse AI
   script.js - Part 2
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       Fade Animation on Scroll
    -------------------------------- */

    const fadeElements=document.querySelectorAll(

        ".template-card,.category-card,.feature-card,.trend-card,.faq-item,.about-box,.stat-box"

    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.2

    });

    fadeElements.forEach(el=>{

        el.classList.add("fade-up");

        observer.observe(el);

    });

    /* -------------------------------
       Like Button
    -------------------------------- */

    document.querySelectorAll(".generate-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            btn.innerHTML="❤️ Liked";

            btn.style.background="#ef4444";

        });

    });

    /* -------------------------------
       Preview Buttons
    -------------------------------- */

    document.querySelectorAll(".preview-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            alert("Preview feature will be available in the next version.");

        });

    });

    /* -------------------------------
       Join Community
    -------------------------------- */

    const joinBtn=document.querySelector(".join-btn");

    if(joinBtn){

        joinBtn.addEventListener("click",()=>{

            alert("🎉 Thanks for joining MemeVerse AI!");

        });

    }

    /* -------------------------------
       Newsletter
    -------------------------------- */

    document.querySelectorAll(".newsletter-box button,.footer-btn")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            alert("✅ Subscription successful!");

        });

    });

    /* -------------------------------
       Contact Form
    -------------------------------- */

    const form=document.querySelector(".contact-form form");

    if(form){

        form.addEventListener("submit",(e)=>{

            e.preventDefault();

            alert("📩 Message sent successfully!");

            form.reset();

        });

    }

    /* -------------------------------
       Copy AI Result
    -------------------------------- */

    resultArea.addEventListener("dblclick",()=>{

        const text=resultArea.innerText;

        navigator.clipboard.writeText(text);

        alert("📋 Copied!");

    });

    /* -------------------------------
       Hero Button Animation
    -------------------------------- */

    document.querySelectorAll(

        ".primary-btn,.secondary-btn"

    ).forEach(btn=>{

        btn.addEventListener("mouseenter",()=>{

            btn.style.transform="scale(1.05)";

        });

        btn.addEventListener("mouseleave",()=>{

            btn.style.transform="scale(1)";

        });

    });

});
/* =====================================================
   MemeVerse AI
   script.js - Part 3
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       Back To Top Button
    -------------------------------- */

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "⬆";

    topBtn.className = "back-to-top";

    document.body.appendChild(topBtn);

    topBtn.style.cssText = `
        position:fixed;
        bottom:30px;
        right:30px;
        width:55px;
        height:55px;
        border-radius:50%;
        border:none;
        background:linear-gradient(135deg,#6C63FF,#00E5FF);
        color:white;
        font-size:22px;
        cursor:pointer;
        display:none;
        z-index:9999;
        box-shadow:0 15px 35px rgba(0,0,0,.3);
        transition:.3s;
    `;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            topBtn.style.display="block";

        }else{

            topBtn.style.display="none";

        }

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    /* -------------------------------
       Animated Counters
    -------------------------------- */

    const counters=document.querySelectorAll(".stat-box h2");

    counters.forEach(counter=>{

        const target=parseInt(counter.innerText.replace(/\D/g,''))||100;

        let count=0;

        const update=()=>{

            count+=Math.ceil(target/60);

            if(count<target){

                counter.innerText=count+"+";

                requestAnimationFrame(update);

            }else{

                counter.innerText=target+"+";

            }

        };

        update();

    });

    /* -------------------------------
       Share Meme Result
    -------------------------------- */

    const shareBtn=document.createElement("button");

    shareBtn.textContent="📤 Share";

    shareBtn.style.marginTop="20px";

    shareBtn.style.padding="12px 24px";

    shareBtn.style.borderRadius="40px";

    shareBtn.style.background="linear-gradient(135deg,#6C63FF,#00E5FF)";

    shareBtn.style.color="white";

    if(resultArea){

        resultArea.appendChild(shareBtn);

    }

    shareBtn.addEventListener("click",()=>{

        if(navigator.share){

            navigator.share({

                title:"MemeVerse AI",

                text:resultArea.innerText,

                url:window.location.href

            });

        }else{

            alert("Sharing is not supported on this browser.");

        }

    });

    /* -------------------------------
       Keyboard Shortcut
    -------------------------------- */

    document.addEventListener("keydown",(e)=>{

        if(e.ctrlKey && e.key==="Enter"){

            if(generateBtn){

                generateBtn.click();

            }

        }

    });

    /* -------------------------------
       Welcome Message
    -------------------------------- */

    setTimeout(()=>{

        console.log("🚀 Welcome to MemeVerse AI!");

    },1000);
/* =====================================================
   MemeVerse AI
   script.js - Part 4 (Final)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       Dark / Light Mode
    -------------------------------- */

    const modeBtn = document.createElement("button");

    modeBtn.innerHTML = "🌙";

    modeBtn.className = "theme-toggle";

    document.body.appendChild(modeBtn);

    modeBtn.style.cssText = `
        position:fixed;
        bottom:100px;
        right:30px;
        width:55px;
        height:55px;
        border-radius:50%;
        border:none;
        background:linear-gradient(135deg,#6C63FF,#00E5FF);
        color:white;
        font-size:22px;
        cursor:pointer;
        z-index:9999;
        box-shadow:0 15px 35px rgba(0,0,0,.3);
    `;

    let darkMode = true;

    modeBtn.addEventListener("click",()=>{

        if(darkMode){

            document.body.style.background="#F5F7FA";
            document.body.style.color="#111827";
            modeBtn.innerHTML="☀️";

        }else{

            document.body.style.background="";
            document.body.style.color="white";
            modeBtn.innerHTML="🌙";

        }

        darkMode=!darkMode;

    });

    /* -------------------------------
       Local Visitor Counter
    -------------------------------- */

    let visits = localStorage.getItem("memeverse_visits");

    if(!visits){

        visits = 1;

    }else{

        visits = Number(visits)+1;

    }

    localStorage.setItem("memeverse_visits",visits);

    console.log("Visitor Count:",visits);

    /* -------------------------------
       Random Featured Card
    -------------------------------- */

    const cards=document.querySelectorAll(".template-card");

    if(cards.length){

        const random=Math.floor(Math.random()*cards.length);

        cards[random].style.border="2px solid #00E5FF";

        cards[random].style.boxShadow="0 0 35px rgba(0,229,255,.4)";

    }

    /* -------------------------------
       Ripple Effect
    -------------------------------- */

    document.querySelectorAll("button").forEach(btn=>{

        btn.addEventListener("click",function(e){

            const circle=document.createElement("span");

            const d=Math.max(this.clientWidth,this.clientHeight);

            circle.style.width=d+"px";
            circle.style.height=d+"px";

            circle.style.position="absolute";
            circle.style.borderRadius="50%";
            circle.style.background="rgba(255,255,255,.35)";
            circle.style.left=(e.offsetX-d/2)+"px";
            circle.style.top=(e.offsetY-d/2)+"px";
            circle.style.pointerEvents="none";
            circle.style.animation="ripple .6s linear";

            this.style.position="relative";
            this.style.overflow="hidden";

            this.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        });

    });

    const style=document.createElement("style");

    style.innerHTML=`
    @keyframes ripple{
        from{
            transform:scale(0);
            opacity:.8;
        }
        to{
            transform:scale(4);
            opacity:0;
        }
    }
    `;

    document.head.appendChild(style);

    /* -------------------------------
       Greeting Based on Time
    -------------------------------- */

    const hour=new Date().getHours();

    let greeting="Welcome to MemeVerse AI!";

    if(hour<12){

        greeting="🌅 Good Morning!";

    }else if(hour<18){

        greeting="☀️ Good Afternoon!";

    }else{

        greeting="🌙 Good Evening!";

    }

    console.log(greeting);

    /* -------------------------------
       Finish
    -------------------------------- */

    console.log("✅ MemeVerse AI Loaded Successfully");

});

