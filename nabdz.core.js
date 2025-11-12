// nabdz.core.js - The Heart of the Revolution
window.NabdzStore = (function() {
    let state = {
        mood: 'neutral',
        energy: 0,
        user: null,
        theme: 'light'
    };
    const subscribers = [];

    return {
        getState: () => state,
        dispatch: (action, payload) => {
            console.log(`Dispatching: ${action}`, payload);
            switch(action) {
                case 'SET_MOOD':
                    state.mood = payload;
                    break;
                case 'ADD_ENERGY':
                    state.energy += payload;
                    break;
                case 'SET_USER':
                    state.user = payload;
                    break;
                // ... المزيد من الإجراءات
            }
            subscribers.forEach(callback => callback(state));
        },
        subscribe: (callback) => {
            subscribers.push(callback);
        }
    };
})();

// الآن، أي جزء من التطبيق يمكنه "الاستماع" للتغييرات
NabdzStore.subscribe((newState) => {
    console.log('State changed:', newState);
    // هنا يمكننا تحديث الواجهة، حفظ البيانات، إلخ
    document.body.className = `mood-${newState.mood}`;
});
