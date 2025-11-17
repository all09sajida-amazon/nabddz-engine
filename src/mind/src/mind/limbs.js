// src/mind/limbs.js
const Limbs = (mind) => {
    const comfort = (context) => {
        console.log('[LIMBS] فعل: أمدّ يد المواساة.');
        updateUI({ action: 'show_comfort_popup' });
        if (window.NabdzApp && window.NabdzApp.chatbot) {
            const messages = ["لا تخف، أنا معك.", "أشعر بما تشعر به.", "القوة تكمن في الصبر."];
            NabdzApp.chatbot.addMessageToWindow(messages[Math.floor(Math.random() * messages.length)], 'bot');
        }
        logEvent({ type: 'comfort_action', trigger: context.mood });
    };
    const greet = (context) => {
        console.log('[LIMBS] فعل: أرحب بالزائر بذكاء.');
        const headerMsg = document.getElementById('dynamic-header-message'); if (!headerMsg) return;
        let greeting = ''; const visitCount = mind.consciousness.memory.pageVisits;
        if (visitCount === 1) { greeting = 'أهلاً بك في نبض الجزائر لأول مرة! 🎉'; }
        else if (context.time) { const greetings = { 'صباح': 'صباح النور يا فارس الأمل ☀️', 'بعد الظهر': 'أهلاً بك في رحاب نبض الجزائر 🌤️', 'مساء': 'مساء الخير والسرور 🌙' }; greeting = greetings[context.time] || 'أهلاً بك'; }
        else { greeting = `مرحباً بعودتك! هذه زيارتك رقم ${visitCount}.`; }
        headerMsg.style.opacity = '0'; setTimeout(() => { headerMsg.textContent = greeting; headerMsg.style.opacity = '0.8'; }, 300);
    };
    const energize = (context) => { console.log('[LIMBS] فعل: أضخ طاقة في نظام النقاط.'); if (window.NabdzApp && window.NabdzApp.energy) { NabdzApp.energy.addPoints(15); } logEvent({ type: 'energize_action', points: 15, trigger: context.mood }); };
    const updateUI = (payload) => {
        console.log('[LIMBS] فعل: تحديث واجهة المستخدم.', payload);
        switch (payload.action) {
            case 'change_mood': document.body.className = document.body.className.replace(/mood-\w+/, '').trim(); document.body.classList.add(`mood-${payload.mood}`); break;
            case 'show_comfort_popup': const moodHelpPopup = document.getElementById('moodHelp'); if (moodHelpPopup) { moodHelpPopup.style.display = 'block'; moodHelpPopup.querySelector('b').innerText = 'أنا أشعر بما تشعر به. دعني أساعدك...'; } break;
        }
    };
    const logEvent = (event) => { console.log('[LIMBS] فعل: تسجيل حدث للتحليل.', event); const logKey = 'nabdz_analytics_log'; let log = JSON.parse(localStorage.getItem(logKey) || '[]'); log.push({ ...event, timestamp: Date.now() }); if (log.length > 100) { log = log.slice(-100); } localStorage.setItem(logKey, JSON.stringify(log)); };
    return { comfort, greet, energize, updateUI, logEvent };
};
window.Limbs = Limbs;
