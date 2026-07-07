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
