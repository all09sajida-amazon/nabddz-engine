// src/mind/senses.js
const Senses = (mind) => {
    const perceivePageLoad = () => {
        console.log('[SENSES] إدراك: تم تحميل الصفحة بالكامل.');
        mind.consciousness.memory.pageVisits++;
        mind.think('PAGE_IS_READY', { loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart });
    };
    const perceiveMood = (mood) => {
        if (!['positive', 'negative', 'neutral'].includes(mood)) { console.error('[SENSES] خطأ: مزاج غير معروف.', mood); return; }
        console.log(`[SENSES] إدراك: مزاج المستخدم تغير إلى ${mood}.`);
        mind.think('USER_MOOD_SHIFTED', { mood: mood, timestamp: Date.now(), source: 'explicit_user_input' });
    };
    const perceiveTime = () => {
        const hour = new Date().getHours(); let timeOfDay = 'صباح';
        if (hour >= 12 && hour < 18) timeOfDay = 'بعد الظهر'; else if (hour >= 18) timeOfDay = 'مساء';
        console.log(`[SENSES] إدراك: الوقت هو ${timeOfDay}.`);
        mind.think('TIME_OF_DAY_CHANGED', { time: timeOfDay, hour: hour });
    };
    const perceiveUserAction = (actionType, data = {}) => {
        console.log(`[SENSES] إدراك: قام المستخدم بفعل "${actionType}".`);
        let engagementScore = mind.consciousness.memory.userEngagementScore;
        switch (actionType) { case 'scroll_depth': if (data.percentage > 0.8) engagementScore += 5; break; case 'dwell_time': if (data.seconds > 120) engagementScore += 10; break; case 'click': engagementScore += 2; break; }
        mind.consciousness.memory.userEngagementScore = engagementScore;
        mind.think('USER_ACTION_PERCEIVED', { type: actionType, data: data, newEngagementScore: engagementScore });
    };
    return { perceivePageLoad, perceiveMood, perceiveTime, perceiveUserAction };
};
window.Senses = Senses;
