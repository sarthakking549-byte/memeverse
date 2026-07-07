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
     

