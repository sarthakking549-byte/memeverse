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
