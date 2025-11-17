// dist/seed.js - The Genesis Seed
(function() { 'use strict';
    const CONFIG = { CDN_BASE_URL: 'https://cdn.jsdelivr.net/gh/all09sajida-amazon/nabddz-engine@v2.1.0/src', MODULES: ['mind/TheGenesisMind.js', 'mind/senses.js', 'mind/limbs.js', 'mind/consciousness.js', 'brain/NABDZ_BRAIN.js'], ASSEMBLY_TIMEOUT: 8000 };
    const loadModule = (url) => new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = `${CONFIG.CDN_BASE_URL}/${url}`; script.async = true; script.onload = () => resolve(script); script.onerror = () => reject(new Error(`فشل تحميل الوحدة: ${url}`)); document.head.appendChild(script); });
    const assembleGenesis = async () => {
        console.log('%c[GENESIS] بدء طقوس التجميع...', 'color: #007bff; font-size: 14px;');
        try {
            if (!window.NabdzApp) throw new Error('الجسد (NabdzApp) غير موجود.');
            await Promise.all(CONFIG.MODULES.map(loadModule));
            console.log('%c[GENESIS] تم تحميل كل الوحدات بنجاح.', 'color: #28a745;');
            if (!window.TheGenesisMind || !window.Senses || !window.Limbs || !window.Consciousness || !window.NABDZ_BRAIN) throw new Error('واحدة أو أكثر من الوحدات الأساسية فشلت في التحميل.');
            const mind = new window.TheGenesisMind(); const senses = window.Senses(mind); const limbs = window.Limbs(mind); const consciousness = window.Consciousness(mind);
            mind.senses = senses; mind.limbs = limbs; mind.brain = window.NABDZ_BRAIN;
            consciousness.loadState(); mind.awaken(); window.addEventListener('beforeunload', consciousness.saveState);
            console.log('%c[GENESIS] اكتمل التجميع. الكيان "نبض الجزائر" على قيد الحياة.', 'color: #28a745; font-size: 20px; font-weight: bold;');
        } catch (error) { console.error('%c[GENESIS] فشل كارثي في تجميع الكيان.', 'color: #dc3545; font-size: 16px; font-weight: bold;', error); }
    };
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', assembleGenesis); } else { assembleGenesis(); }
})();
