/**
 * ============================================================================
 * MemeVerse AI - Premium Enterprise Application Core Script
 * Module 1: Architecture, Adaptive Navigation Framework & Theme Engine
 * System Clock Reference: 2026
 * ============================================================================
 */

(function (global) {
    'use strict';

    // Global App Workspace Registration
    const MV_APP = {
        VERSION: '2.1.0-Release',
        AUTHOR: 'MemeVerse AI Development Group',
        CREATION_YEAR: 2026,
        STATUS: 'Production_Active',
        
        // Internal State Sub-registries
        State: {
            isMobileMenuOpen: false,
            activeFilters: new Set(),
            currentCanvasTemplate: null,
            studioHistory: [],
            historyIndex: -1,
            userPreferences: {
                animationsEnabled: true,
                highContrastMode: false,
                recentSearches: []
            }
        },
        
        // Component Module Registries
        UI: {},
        Engine: {},
        Storage: {},
        Analytics: {},
        Utils: {}
    };

    /**
     * ------------------------------------------------------------------------
     * UTILITY FUNCTIONS & DOM SAFEGUARDS
     * ------------------------------------------------------------------------
     */
    MV_APP.Utils = {
        /**
         * Safely registers event listeners even if element injection is delayed
         */
        addEventListenerSafe: function (selector, event, callback, useCapture = false) {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                this.logDebug(`Selector target missing for binding: ${selector}`, 'warn');
                return false;
            }
            elements.forEach(element => {
                element.addEventListener(event, callback, useCapture);
            });
            return true;
        },

        /**
         * Debounce utility to optimize scroll/resize structural performance
         */
        debounce: function (func, wait, immediate = false) {
            let timeout;
            return function () {
                const context = this, args = arguments;
                const later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        /**
         * Throttling utility to manage animation frame rendering calculations
         */
        throttle: function (func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Application Console logger abstraction layer
         */
        logDebug: function (message, type = 'log') {
            const prefix = `[MemeVerse Core Application Suite - 2026] :: `;
            switch (type) {
                case 'error':
                    console.error(`${prefix}ERROR: ${message}`);
                    break;
                case 'warn':
                    console.warn(`${prefix}WARNING: ${message}`);
                    break;
                case 'info':
                    console.info(`${prefix}INFO: ${message}`);
                    break;
                default:
                    console.log(`${prefix}LOG: ${message}`);
            }
        },

        /**
         * Custom sanitization processing for programmatic content injections
         */
        sanitizeHTML: function (string) {
            const temp = document.createElement('div');
            temp.textContent = string;
            return temp.innerHTML;
        },

        /**
         * Evaluates cross-browser passive event listener capability availability
         */
        getPassiveEventSupport: function () {
            let supportsPassive = false;
            try {
                const opts = Object.defineProperty({}, 'passive', {
                    get: function () {
                        supportsPassive = true;
                        return true;
                    }
                });
                window.addEventListener("testPassive", null, opts);
                window.removeEventListener("testPassive", null, opts);
            } catch (e) {
                supportsPassive = false;
            }
            return supportsPassive ? { passive: true } : false;
        }
    };

    /**
     * ------------------------------------------------------------------------
     * PREMIUM CORE NAVIGATION & HEADER CONTROLLER MODULE
     * ------------------------------------------------------------------------
     */
    MV_APP.UI.NavigationController = {
        config: {
            headerSelector: '.header',
            navbarSelector: '.navbar',
            menuToggleClass: 'menu-toggle',
            navMenuSelector: '.nav-menu',
            scrolledClass: 'scrolled',
            scrollThreshold: 45,
            activeLinkClass: 'current-active'
        },

        init: function () {
            MV_APP.Utils.logDebug('Initializing Navigation Event Framework System...', 'info');
            this.headerElement = document.querySelector(this.config.headerSelector);
            this.navMenuElement = document.querySelector(this.config.navMenuSelector);
            
            if (!this.headerElement) {
                MV_APP.Utils.logDebug('Critical Failure: Header DOM element was not located.', 'error');
                return;
            }

            this.verifyAndInjectMobileToggle();
            this.bindWindowScrollEvents();
            this.bindNavigationLinkInteractions();
            this.evaluateInitialScrollState();
            this.initViewportResizeAdaptation();
        },

        /**
         * Programmatically guarantees mobile toggles exist within your header structures
         */
        verifyAndInjectMobileToggle: function () {
            let toggleButton = document.querySelector(`.${this.config.menuToggleClass}`);
            const navbar = document.querySelector(this.config.navbarSelector);

            if (!toggleButton && navbar) {
                MV_APP.Utils.logDebug('Notice: Injecting specialized navigation action toggle structure target.', 'info');
                toggleButton = document.createElement('div');
                toggleButton.className = `${this.config.menuToggleClass} fa-solid fa-bars`;
                
                // Position seamlessly prior to the navigation list blocks
                if (this.navMenuElement) {
                    navbar.insertBefore(toggleButton, this.navMenuElement);
                } else {
                    navbar.appendChild(toggleButton);
                }
            }

            if (toggleButton) {
                toggleButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMobileNavigationDrawer(toggleButton);
                });
            }
        },

        /**
         * Orchestrates responsive navigation menu expansion drawer states cleanly
         */
        toggleMobileNavigationDrawer: function (toggleBtnElement) {
            if (!this.navMenuElement) return;

            const isExpanded = this.navMenuElement.classList.contains('mobile-expanded-active');
            
            if (!isExpanded) {
                // Open Menu State Transition Execution
                this.navMenuElement.classList.add('mobile-expanded-active');
                toggleBtnElement.classList.remove('fa-bars');
                toggleBtnElement.classList.add('fa-xmark');
                MV_APP.State.isMobileMenuOpen = true;
                
                // Standard programmatic layout properties implementation matching original specifications
                Object.assign(this.navMenuElement.style, {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    width: '100%',
                    background: 'rgba(11, 15, 25, 0.98)',
                    padding: '30px 20px',
                    borderBottom: '2px solid rgba(108, 99, 255, 0.25)',
                    backdropFilter: 'blur(20px)',
                    webkitBackdropFilter: 'blur(20px)',
                    zIndex: '9999',
                    opacity: '0',
                    transform: 'translateY(-15px)',
                    transition: 'transform 0.4s ease, opacity 0.4s ease'
                });

                // Trigger DOM Reflow for fluid execution of custom transitional rulesets
                this.navMenuElement.offsetHeight;
                this.navMenuElement.style.opacity = '1';
                this.navMenuElement.style.transform = 'translateY(0)';
                
            } else {
                this.collapseMobileNavigationDrawer(toggleBtnElement);
            }
        },

        collapseMobileNavigationDrawer: function (toggleBtnElement) {
            if (!this.navMenuElement) return;
            
            const btn = toggleBtnElement || document.querySelector(`.${this.config.menuToggleClass}`);
            
            this.navMenuElement.style.opacity = '0';
            this.navMenuElement.style.transform = 'translateY(-15px)';
            
            setTimeout(() => {
                this.navMenuElement.classList.remove('mobile-expanded-active');
                this.navMenuElement.style.display = '';
                if (btn) {
                    btn.classList.remove('fa-xmark');
                    btn.classList.add('fa-bars');
                }
                MV_APP.State.isMobileMenuOpen = false;
            }, 350);
        },

        /**
         * Sets up sticky scrolling capabilities matching stylesheet designs
         */
        bindWindowScrollEvents: function () {
            const scrollHandler = MV_APP.Utils.throttle(() => {
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (currentScrollTop > this.config.scrollThreshold) {
                    this.headerElement.classList.add(this.config.scrolledClass);
                    // Inline functional adjustment reinforcing backdrop filtering optimization
                    this.headerElement.style.background = 'rgba(5, 8, 15, 0.95)';
                    this.headerElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                } else {
                    this.headerElement.classList.remove(this.config.scrolledClass);
                    this.headerElement.style.background = 'rgba(10, 15, 25, 0.75)';
                    this.headerElement.style.boxShadow = '';
                }

                this.updateActiveNavigationSectionOnScroll();
            }, 60);

            window.addEventListener('scroll', scrollHandler, MV_APP.Utils.getPassiveEventSupport());
        },

        evaluateInitialScrollState: function () {
            const initialScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (initialScroll > this.config.scrollThreshold && this.headerElement) {
                this.headerElement.classList.add(this.config.scrolledClass);
            }
        },

        /**
         * Manages linear routing navigation anchor element scrolling mechanics
         */
        bindNavigationLinkInteractions: function () {
            const appScope = this;
            MV_APP.Utils.addEventListenerSafe('.nav-menu li a, .footer-column ul li a', 'click', function (e) {
                const targetHref = this.getAttribute('href');
                
                if (!targetHref || targetHref === '#' || !targetHref.startsWith('#')) {
                    return; // Permit default fallback browser structural links routing execution
                }
                
                const elementTarget = document.querySelector(targetHref);
                if (elementTarget) {
                    e.preventDefault();
                    
                    // Collapse active responsive mobile presentation states instantly
                    if (MV_APP.State.isMobileMenuOpen) {
                        appScope.collapseMobileNavigationDrawer(null);
                    }

                    const elementOffsetTop = elementTarget.getBoundingClientRect().top + window.pageYOffset;
                    const headerOffsetCorrection = appScope.headerElement ? appScope.headerElement.offsetHeight : 80;
                    const absoluteCalculatedPosition = elementOffsetTop - headerOffsetCorrection;

                    window.scrollTo({
                        top: absoluteCalculatedPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active target presentation styling state values programmatically
                    document.querySelectorAll('.nav-menu li a').forEach(item => item.classList.remove(appScope.config.activeLinkClass));
                    this.classList.add(appScope.config.activeLinkClass);
                }
            });
        },

        /**
         * Tracks application layout viewport coordinate ranges to illuminate navbar paths
         */
        updateActiveNavigationSectionOnScroll: function () {
            const structuralSections = document.querySelectorAll('section[id]');
            const activeScrollY = window.pageYOffset + (this.headerElement ? this.headerElement.offsetHeight : 80) + 100;

            structuralSections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop;
                const sectionId = section.getAttribute('id');
                
                if (activeScrollY >= sectionTop && activeScrollY < sectionTop + sectionHeight) {
                    const trackingQuery = `.nav-menu li a[href="#${sectionId}"]`;
                    const navTargetLink = document.querySelector(trackingQuery);
                    if (navTargetLink) {
                        document.querySelectorAll('.nav-menu li a').forEach(el => el.style.color = '');
                        navTargetLink.style.color = 'var(--accent)';
                    }
                }
            });
        },

        /**
         * Safeguards visibility layers from breaking during aggressive sizing changes
         */
        initViewportResizeAdaptation: function () {
            const handleLayoutResize = MV_APP.Utils.debounce(() => {
                const innerWidthValue = window.innerWidth;
                if (innerWidthValue > 1000 && MV_APP.State.isMobileMenuOpen) {
                    this.collapseMobileNavigationDrawer(null);
                }
            }, 150);

            window.addEventListener('resize', handleLayoutResize);
        }
    };

    /**
     * ------------------------------------------------------------------------
     * USER INTERACTION, VISUAL EFFECT UTILITIES & PREMIUM ACCESSIBILITY ENGINE
     * ------------------------------------------------------------------------
     */
    MV_APP.UI.VisualFxEngine = {
        init: function () {
            MV_APP.Utils.logDebug('Activating Visual Micro-Interactions Platform Module Layer...', 'info');
            this.registerPremiumCardHoverParallax();
            this.setupScrollRevealAnimationObserver();
            this.bindGlobalButtonRippleEffects();
        },

        /**
         * Implements a premium, hardware-accelerated 3D parallax effect on cards
         */
        registerPremiumCardHoverParallax: function () {
            const complexInteractionTargets = '.template-card, .category-card, .hero-card, .stat-box';
            
            MV_APP.Utils.addEventListenerSafe(complexInteractionTargets, 'mousemove', function (e) {
                if (!MV_APP.State.userPreferences.animationsEnabled) return;

                const boundingDimensions = this.getBoundingClientRect();
                const absoluteMouseX = e.clientX - boundingDimensions.left;
                const absoluteMouseY = e.clientY - boundingDimensions.top;
                
                const tiltCalculationX = ((boundingDimensions.width / 2) - absoluteMouseX) / 16;
                const tiltCalculationY = (((boundingDimensions.height / 2) - absoluteMouseY) / 16) * -1;
                
                this.style.transform = `perspective(1000px) scale3d(1.03, 1.03, 1.03) rotateX(${tiltCalculationY}deg) rotateY(${tiltCalculationX}deg)`;
                this.style.zIndex = '10';
            });

            MV_APP.Utils.addEventListenerSafe(complexInteractionTargets, 'mouseleave', function () {
                this.style.transform = '';
                this.style.zIndex = '';
            });
        },

        /**
         * Sets up high-performance scroll reveal optimizations using IntersectionObservers
         */
        setupScrollRevealAnimationObserver: function () {
            const defaultRevealQuery = '.template-card, .category-card, .feature-card, .faq-item, .stat-box';
            const designElements = document.querySelectorAll(defaultRevealQuery);
            
            if (!('IntersectionObserver' in window)) {
                // Instantly manifest elements safely if legacy browsers do not feature API bindings
                designElements.forEach(item => item.style.opacity = '1');
                return;
            }

            const activeObserverOptions = {
                root: null, // Default viewport boundaries
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            };

            const revealCallbackProcessor = function (entries, observer) {
                entries.forEach((entry, idx) => {
                    if (entry.isIntersecting) {
                        const targetNode = entry.target;
                        
                        // Implements dynamic staggered animations natively using runtime calculation loops
                        setTimeout(() => {
                            targetNode.classList.add('show');
                            targetNode.style.opacity = '1';
                            targetNode.style.transform = 'translateY(0) scale(1)';
                        }, idx * 45);

                        observer.unobserve(targetNode);
                    }
                });
            };

            const intersectionObserverInstance = new IntersectionObserver(revealCallbackProcessor, activeObserverOptions);

            designElements.forEach(item => {
                // Ensure reliable default styling parameters are mapped out clearly beforehand
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.97)';
                item.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
                intersectionObserverInstance.observe(item);
            });
        },

        /**
         * Material-style dynamic programmatic background radial grid canvas gradient waves
         */
        bindGlobalButtonRippleEffects: function () {
            const functionalTargetElements = '.primary-btn, .secondary-btn, .signup-btn, .login-btn, .generate-btn, .search-box button';
            
            MV_APP.Utils.addEventListenerSafe(functionalTargetElements, 'mousedown', function (e) {
                const targetNode = this;
     /**
 * ============================================================================
 * MemeVerse AI - Premium Enterprise Application Core Script
 * Module 2: Client-Side Meme Generation Engine & Advanced Canvas Renderer
 * System Clock Reference: 2026
 * ============================================================================
 */

(function (global) {
    'use strict';

    // Ensure parent workspace registration exists
    const MV_APP = global.MV_APP || {};
    if (!MV_APP.Engine) MV_APP.Engine = {};

    /**
     * ------------------------------------------------------------------------
     * AI TEXT SYNTHESIS ENGINE (SIMULATED PIPELINE)
     * ------------------------------------------------------------------------
     */
    MV_APP.Engine.AISynthesizer = {
        // Deep data repository matching themes and language semantic intents
        templateLibrary: {
            tech: {
                captions: [
                    "When the code compiles successfully but you have no clue why.",
                    "Local machine vs Production deployment environment.",
                    "AI models replacing my job but failing to center a simple div element.",
                    "Senior Developer watching me close terminal windows without checking logs."
                ],
                tags: ["Coding", "TechLife", "Developer"],
                accentColor: "#00E5FF"
            },
            academic: {
                captions: [
                    "Me calculatedly turning over pages during the exam to pretend I know everything.",
                    "When the math teacher says the calculation steps are easy but fills three boards.",
                    "Studying five dense syllabus books exactly twenty minutes before the warning bell rings.",
                    "My brain cells trying to remember fundamental formulas under exam room clocks."
                ],
                tags: ["Education", "Exams", "Student"],
                accentColor: "#6C63FF"
            },
            corporate: {
                captions: [
                    "Answering 'As per my previous email' with complete corporate aggression.",
                    "Me scheduling a status meeting to discuss when the next alignment meeting will happen.",
                    "Friday at 4:59 PM vs Monday morning corporate standard updates.",
                    "Surviving a calendar block that definitely should have been a brief Slack text."
                ],
                tags: ["Office", "Corporate", "RemoteWork"],
                accentColor: "#8B5CF6"
            },
            relatable: {
                captions: [
                    "Me staring at the courier tracking status updates every three minutes.",
                    "Saying 'I'll be there in 5 minutes' from the comfort of my bed blankets.",
                    "My bank account watching me buy aesthetic things I don't remotely need.",
                    "Me calculating how many hours of sleep I will secure if I sleep right this instant."
                ],
                tags: ["Relatable", "Life", "Everyday"],
                accentColor: "#EF4444"
            }
        },

        fallbackPrompts: [
            "A cat operating a full-scale corporate database looking deeply panicked.",
            "An alarm clock practicing classical music vocals at 5:00 AM.",
            "A smartphone battery running towards a power plug while carrying its luggage.",
            "A slice of leftover pizza judging my lifestyle choices from the shelf at 3 AM."
        ],

        /**
         * Selects a random starter prompt and places it in the active promptBox
         */
        triggerRandomPromptSelection: function () {
            const promptInputNode = document.getElementById('promptBox');
            if (!promptInputNode) {
                MV_APP.Utils.logDebug("Generator Input Node ('#promptBox') is missing from DOM hierarchy.", "warn");
                return;
            }

            const selectionPool = this.fallbackPrompts;
            const dynamicRandomIndex = Math.floor(Math.random() * selectionPool.length);
            const chosenPhrase = selectionPool[dynamicRandomIndex];

            // Add smooth typography trace effect into input container
            this.animateTextTypewriter(promptInputNode, chosenPhrase);
        },

        animateTextTypewriter: function (targetInput, textString) {
            targetInput.value = '';
            let charactersIndex = 0;
            
            // Clear prior intervals if user spams the selection button rapidly
            if (targetInput.typewriterInterval) {
                clearInterval(targetInput.typewriterInterval);
            }

            targetInput.typewriterInterval = setInterval(() => {
                if (charactersIndex < textString.length) {
                    targetInput.value += textString.charAt(charactersIndex);
                    charactersIndex++;
                } else {
                    clearInterval(targetInput.typewriterInterval);
                }
            }, 25);
        },

        /**
         * Evaluates incoming inputs and determines logical template pairing metadata structures
         */
        synthesizeMemeConcept: function (rawUserText) {
            const analyticalText = rawUserText.toLowerCase().trim();
            let selectedCategory = 'relatable'; // Adaptive default matching pool

            if (analyticalText.includes('code') || analyticalText.includes('program') || analyticalText.includes('bug') || analyticalText.includes('developer') || analyticalText.includes('compiler') || analyticalText.includes('tech')) {
                selectedCategory = 'tech';
            } else if (analyticalText.includes('exam') || analyticalText.includes('study') || analyticalText.includes('class') || analyticalText.includes('school') || analyticalText.includes('math') || analyticalText.includes('teacher')) {
                selectedCategory = 'academic';
            } else if (analyticalText.includes('office') || analyticalText.includes('work') || analyticalText.includes('corporate') || analyticalText.includes('meeting') || analyticalText.includes('email') || analyticalText.includes('boss')) {
                selectedCategory = 'corporate';
            }

            const targetCategoryBlock = this.templateLibrary[selectedCategory];
            const randomIndexValue = Math.floor(Math.random() * targetCategoryBlock.captions.length);
            
            return {
                categoryKey: selectedCategory,
                conceptTitle: `AI Concept #${Math.floor(1000 + Math.random() * 9000)}`,
                suggestedCaption: targetCategoryBlock.captions[randomIndexValue],
                associatedTags: targetCategoryBlock.tags,
                brandColor: targetCategoryBlock.accentColor,
                timestamp: new Date().toLocaleTimeString()
            };
        }
    };

    /**
     * ------------------------------------------------------------------------
     * HTML5 GRAPHICS CANVAS PIPELINE RENDER ENGINE
     * ------------------------------------------------------------------------
     */
    MV_APP.Engine.CanvasRenderer = {
        config: {
            baseCanvasWidth: 800,
            baseCanvasHeight: 800,
            fontFamilyName: 'Poppins, sans-serif',
            primaryFillColor: '#FFFFFF',
            strokeOutlineColor: '#000000',
            panelBackgroundColor: '#111827'
        },

        /**
         * Orchestrates offscreen rendering buffers to produce dynamic high-resolution outputs
         */
        renderMemeOutput: function (visualPrompt, targetCaption, runtimeCallback) {
            MV_APP.Utils.logDebug("Initializing programmatic Canvas generation loop...", "info");

            // Setup an offscreen buffer canvas to manage processing independently from display layout frames
            const offscreenCanvas = document.createElement('canvas');
            offscreenCanvas.width = this.config.baseCanvasWidth;
            offscreenCanvas.height = this.config.baseCanvasHeight;
            const ctx = offscreenCanvas.getContext('2d');

            if (!ctx) {
                MV_APP.Utils.logDebug("Critical Graphics Engine Failure: Canvas Context could not be drawn.", "error");
                return;
            }

            // 1. Draw Core Studio Canvas Background Layer
            ctx.fillStyle = this.config.panelBackgroundColor;
            ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

            // 2. Build Gradient Art Framing Panels
            const structuralGradient = ctx.createLinearGradient(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            structuralGradient.addColorStop(0, '#6C63FF');
            structuralGradient.addColorStop(0.5, '#8B5CF6');
            structuralGradient.addColorStop(1, '#00E5FF');
            
            ctx.strokeStyle = structuralGradient;
            ctx.lineWidth = 16;
            ctx.strokeRect(8, 8, offscreenCanvas.width - 16, offscreenCanvas.height - 16);

            // 3. Render Simulated Central Graphical Scene Placeholder via Geometric Logic
            this.drawAIGraphicalRepresentation(ctx, offscreenCanvas.width, offscreenCanvas.height);

            // 4. Compute and Apply Top Prompt / Context Banner Texts
            this.drawMemeTextWrapped(ctx, `PROMPT: "${visualPrompt}"`, 40, 70, offscreenCanvas.width - 80, 26, 'rgba(0, 229, 255, 0.85)', true);

            // 5. Compute and Place Bottom Punchline Dynamic Captions
            this.drawMemeTextWrapped(ctx, targetCaption.toUpperCase(), 40, offscreenCanvas.height - 140, offscreenCanvas.width - 80, 36, this.config.primaryFillColor, false);

            // 6. Draw Identity Watermark Footers to verify algorithmic validity
            ctx.font = '600 14px Poppins';
            ctx.fillStyle = 'rgba(199, 210, 254, 0.4)';
            ctx.textAlign = 'right';
            ctx.fillText('GENERATED VIA MEMEVERSE AI STUDIO • 2026', offscreenCanvas.width - 40, offscreenCanvas.height - 30);

            // Export tracking asset blocks to viewport display frames
            setTimeout(() => {
                try {
                    const compiledDataUrlOutput = offscreenCanvas.toDataURL('image/png');
                    runtimeCallback(null, compiledDataUrlOutput);
                } catch (graphicsError) {
                    runtimeCallback(graphicsError, null);
                }
            }, 400);
        },

        /**
         * Procedural vector rendering pipeline simulating advanced graphic design assets
         */
        drawAIGraphicalRepresentation: function (ctx, canvasW, canvasH) {
            ctx.save();
            
            // Draw an elegant, dark interior display viewport layout box inside the boundaries
            ctx.fillStyle = '#0B0F19';
            ctx.fillRect(40, 140, canvasW - 80, canvasH - 320);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 2;
            ctx.strokeRect(40, 140, canvasW - 80, canvasH - 320);

            // Generate matrix abstract graphic coordinates
            const centerX = canvasW / 2;
            const centerY = (canvasH / 2) - 20;

            // Render a stylized neon wireframe core representing AI nodes
            const centralRadialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 160);
            centralRadialGlow.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
            centralRadialGlow.addColorStop(0.6, 'rgba(108, 99, 255, 0.1)');
            centralRadialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = centralRadialGlow;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
            ctx.fill();

            // Programmatic vector face element generation matching Meme layout parameters
            ctx.strokeStyle = 'rgba(0, 225, 255, 0.4)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 80, 0, Math.PI, false); // Smile arc geometry
            ctx.stroke();

            // Neon glowing eyes setup
            ctx.fillStyle = '#00E5FF';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00E5FF';
            
            ctx.beginPath();
            ctx.arc(centerX - 35, centerY - 20, 10, 0, Math.PI * 2);
            ctx.arc(centerX + 35, centerY - 20, 10, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        },

        /**
         * Advanced text wrapper that calculates font metrics and processes line breaks on canvas
         */
        drawMemeTextWrapped: function (ctx, textContent, targetX, targetY, maxLineWidth, designLineHeight, textHexColor, isItalicStyle = false) {
            ctx.save();
            
            // Text configuration bindings
            ctx.fillStyle = textHexColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            if (isItalicStyle) {
                ctx.font = `italic 500 ${designLineHeight - 4}px ${this.config.fontFamilyName}`;
            } else {
                ctx.font = `800 ${designLineHeight}px ${this.config.fontFamilyName}`;
                ctx.strokeStyle = this.config.strokeOutlineColor;
                ctx.lineWidth = 7;
                ctx.lineJoin = 'round';
            }

            const parsingWordsArray = textContent.split(' ');
            let runningLineBuffer = '';
            let internalCurrentY = targetY;
            const targetCenterXPosition = targetX + (maxLineWidth / 2);

            for (let idx = 0; idx < parsingWordsArray.length; idx++) {
                const testLineString = runningLineBuffer + parsingWordsArray[idx] + ' ';
                const textMetrics = ctx.measureText(testLineString);
                const computedLineWidth = textMetrics.width;

                if (computedLineWidth > maxLineWidth && idx > 0) {
                    this.renderSingleLineSegment(ctx, runningLineBuffer, targetCenterXPosition, internalCurrentY, !isItalicStyle);
                    runningLineBuffer = parsingWordsArray[idx] + ' ';
                    internalCurrentY += designLineHeight + 6;
                } else {
                    runningLineBuffer = testLineString;
                }
            }
            
            this.renderSingleLineSegment(ctx, runningLineBuffer, targetCenterXPosition, internalCurrentY, !isItalicStyle);
            ctx.restore();
        },

        renderSingleLineSegment: function (ctx, lineText, x, y, applyStrokeBorder) {
            if (applyStrokeBorder) {
                ctx.strokeText(lineText, x, y);
            }
            ctx.fillText(lineText, x, y);
        }
    };

    /**
     * ------------------------------------------------------------------------
     * WORKSPACE CONTROLLER CORE BRIDGE HANDLERS
     * ------------------------------------------------------------------------
     */
    MV_APP.Engine.GeneratorBridge = {
        init: function () {
            MV_APP.Utils.logDebug("Binding Generator System UI Event Listeners...", "info");
            
            const triggerGenerateBtn = document.getElementById('generateBtn');
            const triggerRandomBtn = document.getElementById('randomPrompt');
            
            if (triggerGenerateBtn) {
                triggerGenerateBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.executeGeneratorPipelineWorkflow();
                });
            }

            if (triggerRandomBtn) {
                triggerRandomBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    MV_APP.Engine.AISynthesizer.triggerRandomPromptSelection();
                });
            }
        },

        /**
         * Drives UI state transitions and triggers the AI synthesis and graphic canvas rendering logic
         */
        executeGeneratorPipelineWorkflow: function () {
            const promptBoxNode = document.getElementById('promptBox');
            const resultAreaNode = document.getElementById('resultArea');
            const submitBtnNode = document.getElementById('generateBtn');

            if (!promptBoxNode || !resultAreaNode) return;

            const baseUserValue = promptBoxNode.value.trim();

            if (baseUserValue.length < 5) {
                alert("Kindly enter a descriptive prompt (minimum 5 characters) to initialize the AI Meme Generator engine.");
                return;
            }

            // Step 1: Transition UI to Loading State
            this.setButtonLoadingState(submitBtnNode, true);
            this.renderProcessingPlaceholderMarkup(resultAreaNode);

            // Step 2: Trigger AI Semantic Concept Synthesizer
            const synthesizedMetadata = MV_APP.Engine.AISynthesizer.synthesizeMemeConcept(baseUserValue);

            // Step 3: Pass Output to Vector Graphic Canvas Processing Pipeline
            MV_APP.Engine.CanvasRenderer.renderMemeOutput(
                baseUserValue, 
                synthesizedMetadata.suggestedCaption, 
                (error, finalizedDataUrl) => {
                    if (error) {
                        MV_APP.Utils.logDebug(`Graphics Pipeline Failure: ${error.message}`, "error");
                        this.renderErrorPlaceholderMarkup(resultAreaNode);
                        this.setButtonLoadingState(submitBtnNode, false);
                        return;
                    }

                    // Step 4: Display the finalized generated template structure onto the viewport
                    this.injectFinalizedMemeTemplateIntoDOM(resultAreaNode, finalizedDataUrl, synthesizedMetadata, baseUserValue);
                    this.setButtonLoadingState(submitBtnNode, false);
                    
                    // Track runtime transaction history
                    MV_APP.State.studioHistory.push({
                        prompt: baseUserValue,
                        metadata: synthesizedMetadata,
                        dataUrl: finalizedDataUrl
                    });
                    MV_APP.State.historyIndex++;
                }
            );
        },

        setButtonLoadingState: function (btnElement, isLoadingActive) {
            if (!btnElement) return;
            if (isLoadingActive) {
                btnElement.disabled = true;
                btnElement.innerHTML = `<span class="loading"></span> Generating Concept...`;
            } else {
                btnElement.disabled = false;
                btnElement.innerHTML = `✨ Generate Meme`;
            }
        },

        renderProcessingPlaceholderMarkup: function (containerElement) {
            containerElement.innerHTML = `
                <div class="glass" style="padding: 50px 20px; text-align: center; border-radius: var(--radius);">
                    <div class="loading" style="width:45px; height:45px; border-width:4px; margin-bottom:20px;"></div>
                    <h3 style="color: var(--accent); margin-bottom:10px; font-size:22px;">🔮 Compiling Neural Schematics</h3>
                    <p style="color: var(--gray); max-width:400px; margin: 0 auto; font-size:14px; line-height:1.6;">
                        Analyzing phrase semantics, matching layout records, and assembling rendering layers...
                    </p>
                </div>
            `;
        },

        renderErrorPlaceholderMarkup: function (containerElement) {
            containerElement.innerHTML = `
                <div class="glass" style="padding: 40px; text-align: center; border-radius: var(--radius); border: 1px solid var(--danger);">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size:40px; color:var(--danger); margin-bottom:15px;"></i>
                    <h3 style="color: #ffffff; margin-bottom:10px;">Rendering Engine Interrupted</h3>
                    <p style="color: var(--gray); font-size:14px;">An internal exception occurred during Canvas context array extraction routines.</p>
                </div>
            `;
        },

        /**
         * Injects the generated template image asset along with control buttons into the DOM
         */
        injectFinalizedMemeTemplateIntoDOM: function (container, dataUrl, meta, originalPrompt) {
            const safeCaptionText = MV_APP.Utils.sanitizeHTML(meta.suggestedCaption);
            const safePromptText = MV_APP.Utils.sanitizeHTML(originalPrompt);
            
            let structuredTagsHtml = '';
            meta.associatedTags.forEach(tag => {
                structuredTagsHtml += `<span style="background: rgba(255,255,255,0.06); padding:4px 10px; border-radius:12px; font-size:12px; color:var(--gray);">#${tag}</span>`;
            });

            container.innerHTML = `
                <div class="glass" style="padding: 25px; border-radius: var(--radius); animation: scale-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; box-shadow: var(--shadow);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
                        <div>
                            <span style="color: ${meta.brandColor}; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:2px;">✨ AI Generation Complete</span>
                            <h4 style="font-size:18px; color:#ffffff; margin:0;">${meta.conceptTitle}</h4>
                        </div>
                        <span style="font-size:11px; color:var(--gray); background:rgba(0,0,0,0.2); padding:5px 10px; border-radius:8px;">Processed: ${meta.timestamp}</span>
                    </div>

                    <div style="position:relative; border-radius:10px; overflow:hidden; background:#05080f; margin-bottom:20px; box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                        <img src="${dataUrl}" alt="Generated AI Meme Template Layout" style="width:100%; display:block; height:auto; object-fit:contain; max-height:480px;" />
                    </div>

                    <div style="background: rgba(0,0,0,0.25); padding:15px; border-radius:10px; border-left:3px solid ${meta.brandColor}; margin-bottom:20px;">
                        <p style="font-size:12px; color:var(--gray); margin-bottom:5px;"><strong>Input Prompt Context:</strong> "${safePromptText}"</p>
                        <p style="font-size:14px; color:#ffffff; font-weight:500; margin:0;"><strong>Suggested Caption Line:</strong> "${safeCaptionText}"</p>
                    </div>

                    <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                        ${structuredTagsHtml}
                    </div>

                    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <a href="${dataUrl}" download="MemeVerse_${meta.conceptTitle}.png" class="primary-btn" style="text-decoration:none; text-align:center; padding: 12px 20px; font-size: 14px; flex: 1; display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                            <i class="fa-solid fa-cloud-arrow-down"></i> Download PNG
                        </a>
                        <button class="secondary-btn" style="padding: 12px 20px; font-size: 14px; flex: 1; display:inline-flex; align-items:center; justify-content:center; gap:8px;" id="studioShareActionBtn">
                            <i class="fa-solid fa-link"></i> Copy Share Link
                        </button>
                    </div>
                </div>
            `;

            // Bind contextual tracking operations explicitly to injected button references
            const shareBtn = document.getElementById('studioShareActionBtn');
            if (shareBtn) {
                shareBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert("Meme Workspace Share Link copied to user clipboard storage parameters successfully.");
                    }).catch(() => {
                        alert("Clipboard action fallback manual copy verification required.");
                    });
                });
            }
        }
    };

    // Register module layers safely into global workspace architecture
    global.MV_APP = MV_APP;

})(window);

/* ============================================================================
   End of Part 2 - Graphics Engine
   Awaiting Part 3 Query Processor Directives...
   ============================================================================ */

