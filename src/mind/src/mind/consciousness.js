// src/mind/consciousness.js
const Consciousness = (mind) => {
    const STORAGE_KEY = 'nabdz_consciousness_state';
    const saveState = () => {
        const stateToSave = { lastMood: mind.consciousness.memory.lastMood, userEngagementScore: mind.consciousness.memory.userEngagementScore, pageVisits: mind.consciousness.memory.pageVisits, moodHistory: mind.consciousness.memory.moodHistory.slice(-30), identity: mind.consciousness.memory.identity };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave)); console.log('[CONSCIOUSNESS] تم حفظ حالة الذاكرة بنجاح.'); } catch (e) { console.error('[CONSCIOUSNESS] فشل في حفظ الحالة:', e); }
    };
    const loadState = () => {
        try { const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (savedState) { mind.consciousness.memory = { ...mind.consciousness.memory, ...savedState }; console.log('[CONSCIOUSNESS] تم استعادة حالة الذاكرة بنجاح.', mind.consciousness.memory); return true; } } catch (e) { console.error('[CONSCIOUSNESS] فشل في استعادة الحالة:', e); } return false;
    };
    const clearState = () => { localStorage.removeItem(STORAGE_KEY); console.log('[CONSCIOUSNESS] تم مسح الحالة المحفوظة.'); };
    return { saveState, loadState, clearState };
};
window.Consciousness = Consciousness;
