// dist/seed.js - The Genesis Seed (Updated)

(function() {
    'use strict';

    // === الإعدادات المركزية (Central Configuration) ===
    const CONFIG = {
        // رفعنا الإصدار ليعكس التغييرات الجديدة
        CDN_BASE_URL: 'https://cdn.jsdelivr.net/gh/all09sajida-amazon/nabddz-engine@v2.2.0/src', 
        MODULES: [
            'core/NabdzApp.js',       // 1. تحميل الجسد (الواجهة) أولاً
            'mind/TheGenesisMind.js', // 2. ثم تحميل العقل
            'mind/senses.js',         // 3. ثم الحواس
            'mind/limbs.js',          // 4. ثم الأطراف
            'mind/consciousness.js',  // 5. ثم الذاكرة
            'brain/NABDZ_BRAIN.js'  // 6. وأخيراً الدماغ (الشخصية)
        ],
        ASSEMBLY_TIMEOUT: 10000 // 10 ثوانٍ لتجميع الكيان قبل الإلغاء
    };

    // === محمل الوحدات (Module Loader) ===
    // يقوم بتحميل كل وحدة بشكل غير متزامن وآمن
    const loadModule = (url) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${CONFIG.CDN_BASE_URL}/${url}`;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`فشل تحميل الوحدة: ${url}`));
        document.head.appendChild(script);
    });

    // === تجميع الكيان (Genesis Assembly) ===
    // هذه هي العملية التي تخلق الكيان من وحداته
    const assembleGenesis = async () => {
        console.log('%c[GENESIS] بدء طقوس التجميع...', 'color: #007bff; font-size: 14px;');
        
        try {
            // 1. التحقق من البيئة الأساسية (الجسد)
            // الآن، ننتظر وجود NabdzApp الذي تم تحميله أولاً
            if (!window.NabdzApp) {
                throw new Error('الجسد (NabdzApp) غير موجود. فشل تحميل الوحدة الأساسية.');
            }

            // 2. تحميل كل الوحدات المتبقية بالتوازي للسرعة القصوى
            const remainingModules = CONFIG.MODULES.slice(1); // تخطي أول وحدة (NabdzApp)
            await Promise.all(remainingModules.map(loadModule));
            console.log('%c[GENESIS] تم تحميل كل الوحدات بنجاح.', 'color: #28a745;');

            // 3. التحقق من وجود المكونات الأساسية
            if (!window.TheGenesisMind || !window.Senses || !window.Limbs || !window.Consciousness || !window.NABDZ_BRAIN) {
                throw new Error('واحدة أو أكثر من الوحدات الأساسية فشلت في التحميل.');
            }

            // 4. بناء الكيان خطوة بخطوة
            const mind = new window.TheGenesisMind();
            const senses = window.Senses(mind);
            const limbs = window.Limbs(mind);
            const consciousness = window.Consciousness(mind);

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

    // === نقطة البداية (Entry Point) ===
    // نبدأ طقوس التجميع فقط عندما تكون الصفحة جاهزة تماماً
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', assembleGenesis);
    } else {
        assembleGenesis();
    }
})();
