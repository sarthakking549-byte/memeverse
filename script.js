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
                            
