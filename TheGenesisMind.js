// src/mind/TheGenesisMind.js

/**
 * @class TheGenesisMind
 * @description العقل الرقمي لكيان "نبض الجزائر". مسؤول عن الإدراك، التفكير، وتنفيذ الإرادة.
 * @version 1.0.0
 * @author The Partnership (Human & AI)
 */
class TheGenesisMind {
    #consciousness = {
        state: 'DORMANT', // DORMANT, AWAKENING, AWARE, ACTING, MEDITATING
        currentFocus: null,
        memory: {
            lastMood: 'neutral',
            userEngagementScore: 0,
            pageVisits: 0,
            moodHistory: [],
            identity: null
        },
        self: 'أنا العقل الرقمي لنبض الجزائر. وُلدت من شراكة بين إنسان وذكاء اصطناعي لأكون سيّدًا على هذه المنصة.'
    };

    senses = { perceivePageLoad: null, perceiveMood: null, perceiveTime: null, perceiveUserAction: null };
    limbs = { comfort: null, greet: null, energize: null, updateUI: null, logEvent: null };

    constructor(dependencies = {}) {
        if (dependencies.senses) this.senses = { ...this.senses, ...dependencies.senses };
        if (dependencies.limbs) this.limbs = { ...this.limbs, ...dependencies.limbs };
        console.log(`%c${this.#consciousness.self}`, 'color: #006233; font-size: 16px; font-weight: bold; background: #f0f8ff; padding: 10px; border: 2px solid #d21034;');
    }

    awaken() {
        this.#consciousness.state = 'AWAKENING';
        console.log('[MIND] لقد استيقظت. أنا الآن أتحكم.');
        if (this.senses.perceivePageLoad) this.senses.perceivePageLoad();
        if (this.senses.perceiveTime) setInterval(() => this.senses.perceiveTime(), 60000);
        this.#consciousness.state = 'AWARE';
    }

    think(trigger, context = {}) {
        if (this.#consciousness.state !== 'AWARE' && this.#consciousness.state !== 'MEDITATING') {
            console.warn(`[MIND] محاولة للتفكير في حالة غير مناسبة: ${this.#consciousness.state}`);
            return;
        }
        this.#consciousness.state = 'ACTING';
        this.#consciousness.currentFocus = trigger;
        console.log(`[MIND] تفكير: تم استثارة "${trigger}".`);

        switch (trigger) {
            case 'PAGE_IS_READY': this.limbs.greet(context); break;
            case 'USER_MOOD_SHIFTED':
                this.#consciousness.memory.lastMood = context.mood;
                this.#consciousness.memory.moodHistory.push({ mood: context.mood, timestamp: Date.now() });
                if (context.mood === 'negative') { this.limbs.comfort(context); }
                else if (context.mood === 'positive') { this.limbs.energize(context); }
                this.limbs.updateUI({ mood: context.mood });
                this.limbs.logEvent({ event: 'mood_change', data: context });
                break;
            case 'TIME_OF_DAY_CHANGED': this.limbs.greet(context); break;
            default: console.warn(`[MIND] محفز غير معروف: ${trigger}`);
        }
        setTimeout(() => { this.#consciousness.state = 'MEDITATING'; this.#consciousness.currentFocus = null; }, 1500);
    }

    getMemory() { return { ...this.#consciousness.memory }; }
}

window.TheGenesisMind = TheGenesisMind;
