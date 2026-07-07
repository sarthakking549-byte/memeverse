/*=========================================================
  MemeVerse AI
  JavaScript Part 1
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

console.log("🚀 MemeVerse AI Loaded");

/*=========================================
  SELECT ELEMENTS
=========================================*/

const navbar = document.querySelector(".header");

const searchInput =
document.querySelector("#searchInput") ||
document.querySelector(".search-box input");

const searchButton =
document.querySelector("#searchBtn") ||
document.querySelector(".search-box button");

const generateButton =
document.querySelector("#generateBtn");

const promptBox =
document.querySelector("#promptBox");

const resultArea =
document.querySelector("#resultArea");

const previewButtons =
document.querySelectorAll(".preview-btn");

const generateButtons =
document.querySelectorAll(".generate-btn");

/*=========================================
  RANDOM PROMPTS
=========================================*/

const prompts = [

"Shrek becomes Iron Man",

"Batman joins an Indian wedding",

"Doge starts a space company",

"Drake opens a tea stall",

"Among Us in Jurassic Park",

"Tom & Jerry become YouTubers",

"Elon Musk driving a tractor",

"Minions become IAS officers",

"Spider-Man sells pani puri",

"AI takes over meme culture",

"Gru starts coding",

"Penguins become hackers",

"Breaking Bad but in Hogwarts",

"Mr Bean becomes Prime Minister",

"Thanos works at McDonald's",

"SpongeBob becomes a scientist",

"Squid Game in school",

"GigaChad becomes a monk",

"Naruto becomes a chef",

"Deadpool teaches maths"

];

/*=========================================
  LOADING EFFECT
=========================================*/

function loadingAnimation(){

if(!resultArea) return;

resultArea.innerHTML=`

<div class="loading"></div>

<p style="margin-top:20px;">
Generating AI Meme...
</p>

`;

}

/*=========================================
  GENERATE MEME
=========================================*/

function generateMeme(){

if(!resultArea) return;

loadingAnimation();

const prompt =
promptBox && promptBox.value.trim()!=="" ?
promptBox.value :
prompts[Math.floor(Math.random()*prompts.length)];

setTimeout(()=>{

resultArea.innerHTML=`

<h2>🎉 AI Meme Ready</h2>

<p style="margin-top:20px;">
${prompt}
</p>

`;

},1800);

}

/*=========================================
  BUTTON EVENTS
=========================================*/

if(generateButton){

generateButton.addEventListener(

"click",

generateMeme

);

}

generateButtons.forEach(button=>{

button.addEventListener("click",generateMeme);

});

previewButtons.forEach(button=>{

button.addEventListener("click",()=>{

alert("Preview feature coming in Part 2 🚀");

});

});

});
                            
/*=========================================================
  MemeVerse AI
  JavaScript Part 2
=========================================================*/

/*=========================================
  TOAST NOTIFICATION
=========================================*/

function showToast(message){

let toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},400);

},2500);

}

/*=========================================
  RANDOM PROMPT BUTTON
=========================================*/

const randomPromptButton=document.querySelector("#randomPrompt");

if(randomPromptButton){

randomPromptButton.addEventListener("click",()=>{

const random=

prompts[Math.floor(Math.random()*prompts.length)];

if(promptBox){

promptBox.value=random;

}

showToast("🎲 Random prompt generated!");

});

}

/*=========================================
  COPY RESULT
=========================================*/

if(resultArea){

resultArea.addEventListener("dblclick",()=>{

const text=resultArea.innerText;

navigator.clipboard.writeText(text);

showToast("📋 Copied to clipboard!");

});

}

/*=========================================
  SEARCH
=========================================*/

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value=

searchInput.value.toLowerCase();

const cards=

document.querySelectorAll(".template-card");

cards.forEach(card=>{

const text=

card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

if(searchButton){

searchButton.addEventListener("click",()=>{

showToast("🔍 Search completed");

});

}

/*=========================================
  FAVORITES
=========================================*/

let favorites=[];

generateButtons.forEach(button=>{

button.addEventListener("contextmenu",(e)=>{

e.preventDefault();

const card=

button.closest(".template-card");

if(!card) return;

const title=

card.querySelector("h3").innerText;

favorites.push(title);

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);

showToast("❤️ Added to Favorites");

});

});

/*=========================================
  LOAD FAVORITES
=========================================*/

const saved=

localStorage.getItem("favorites");

if(saved){

favorites=

JSON.parse(saved);

console.log(favorites);

}

/*=========================================
  KEYBOARD SHORTCUT
=========================================*/

document.addEventListener("keydown",(e)=>{

if(

e.ctrlKey &&

e.key==="Enter"

){

generateMeme();

}

});
