// dist/seed.js - The Genesis Seed (Updated for Modular Architecture)

(function() {
    'use strict';

    // === Central Configuration ===
    const CONFIG = {
        CDN_BASE_URL: 'https://cdn.jsdelivr.net/gh/all09sajida-amazon/nabddz-engine@v2.2.0/src', // Updated version and path
        MODULES: [
            'core/NabdzApp.js',          // 1. Load the Body (Legacy Adapter) first
            'mind/TheGenesisMind.js',
            'mind/senses.js',
            'mind/limbs.js',
            'mind/consciousness.js',
            'brain/NABDZ_BRAIN.js'
        ],
        ASSEMBLY_TIMEOUT: 10000
    };

    // === Module Loader ===
    const loadModule = (url) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${CONFIG.CDN_BASE_URL}/${url}`;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`فشل تحميل الوحدة: ${url}`));
        document.head.appendChild(script);
    });

    // === Genesis Assembly ===
    const assembleGenesis = async () => {
        console.log('%c[GENESIS] بدء طقوس التجميع (النمطجي)...', 'color: #007bff; font-size: 14px;');
        
        try {
            // Load all modules in parallel
            await Promise.all(CONFIG.MODULES.map(loadModule));
            console.log('%c[GENESIS] تم تحميل كل الوحدات بنجاح.', 'color: #28a745;');

            // Check for core components
            if (!window.NabdzApp || !window.TheGenesisMind || !window.Senses || !window.Limbs || !window.Consciousness || !window.NABDZ_BRAIN) {
                throw new Error('واحدة أو أكثر من الوحدات الأساسية فشلت في التحميل.');
            }

            // Build the entity step-by-step
            const mind = new window.TheGenesisMind();
            const senses = window.Senses(mind);
            const limbs = window.Limbs(mind);
            const consciousness = window.Consciousness(mind);

            // Inject components into the mind
            mind.senses = senses;
            mind.limbs = limbs;
            mind.brain = window.NABDZ_BRAIN;

            consciousness.loadState();
            mind.awaken();
            window.addEventListener('beforeunload', consciousness.saveState);

            console.log('%c[GENESIS] اكتمل التجميع. الكيان "نبض الجزائر" على قيد الحياة.', 'color: #28a745; font-size: 20px; font-weight: bold;');

        } catch (error) {
            console.error('%c[GENESIS] فشل كارثي في تجميع الكيان.', 'color: #dc3545; font-size: 16px; font-weight: bold;', error);
        }
    };

    // === Entry Point ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', assembleGenesis);
    } else {
        assembleGenesis();
    }
})();
