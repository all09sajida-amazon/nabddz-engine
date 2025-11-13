// nabdz.core.js - The Heart of Revolution
// Version 1.0.0 - Full Core
// This is the single source of truth for all Nabdz applications.

(function(window) {
    'use strict';

    // --- الحالة المركزية (The Central State) ---
    let state = {
        user: {
            name: null,
            wilaya: null,
            sparkId: null // معرف فريد لكل مستخدم
        },
        ui: {
            mood: 'neutral', // positive, negative, neutral
            theme: 'auto',   // light, dark, auto
            isChatOpen: false
        },
        energy: {
            points: 0,
            level: 'شرارة جديدة' // شرارة جديدة, تدفق, موجة, طاقة محركة
        },
        analytics: {
            visitCount: 0,
            moodHistory: []
        }
    };

    // --- المشتركون (The Subscribers) ---
    const subscribers = [];

    // --- الإجراءات (The Actions) ---
    const actions = {
        SET_USER: (payload) => { state.user = { ...state.user, ...payload }; },
        SET_MOOD: (payload) => { 
            state.ui.mood = payload; 
            state.analytics.moodHistory.push({ mood: payload, timestamp: Date.now() });
        },
        SET_THEME: (payload) => { state.ui.theme = payload; },
        TOGGLE_CHAT: () => { state.ui.isChatOpen = !state.ui.isChatOpen; },
        ADD_ENERGY: (payload) => { 
            state.energy.points += payload; 
            if (state.energy.points >= 700) state.energy.level = 'طاقة محركة';
            else if (state.energy.points >= 300) state.energy.level = 'موجة';
            else if (state.energy.points >= 100) state.energy.level = 'تدفق';
            else state.energy.level = 'شرارة جديدة';
        },
        INCREMENT_VISIT: () => { state.analytics.visitCount++; }
    };

    // --- المتجر (The Store) ---
    const NabdzStore = {
        getState: () => JSON.parse(JSON.stringify(state)),
        dispatch: (actionName, payload) => {
            if (!actions[actionName]) {
                console.error(`Action "${actionName}" is not defined.`);
                return;
            }
            console.log(`%c[DISPATCH] ${actionName}`, 'color: #007bff; font-weight: bold;', payload);
            actions[actionName](payload);
            subscribers.forEach(callback => callback(state));
        },
        subscribe: (callback) => {
            subscribers.push(callback);
            return () => {
                const index = subscribers.indexOf(callback);
                if (index > -1) subscribers.splice(index, 1);
            };
        },
        init: () => {
            console.log('%c[NABDZ STORE] Initializing...', 'color: #dc3545; font-weight: bold; font-size: 16px;');
            console.log('%c[NABDZ STORE] Initialized.', 'color: #28a745; font-weight: bold; font-size: 16px;');
        }
    };

    window.NabdzStore = NabdzStore;

})(window);
