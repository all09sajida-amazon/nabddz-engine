// src/core/NabdzApp.js

/**
 * @object NabdzApp - The Body (Legacy Adapter)
 * @description الجسد المبسط الذي يتفاعل مع واجهة المستخدم.
 *              يعمل كـ "مكيف" بين القالب الجديد والكيان TheGenesisMind.
 *              هذه الوظائف سيتم استدعاؤها مباشرة من القالب.
 */
window.NabdzApp = {
    // === Text-to-Speech ===
    tts: {
        speakPost(id) {
            if (!('speechSynthesis' in window)) {
                alert('متصفحك لا يدعم قراءة النصوص صوتيًّا.');
                return;
            }
            const el = document.getElementById(id);
            if (!el) return;
            const text = el.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    },

    // === Chatbot ===
    chatbot: {
        init() {
            const bubble = document.getElementById('chatBubble');
            const window = document.getElementById('chatWindow');
            const input = document.getElementById('chatInput');
            const sendBtn = document.getElementById('chatSendBtn');
            
            if (bubble) bubble.addEventListener('click', () => window.classList.toggle('open'));
            if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
            if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });
        },

        sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            if (!message) return;
            
            this.addMessageToWindow(message, 'user');
            input.value = '';
            
            // أبلغ العقل الجديد برسالة المستخدم
            if (window.TheGenesisMind) {
                TheGenesisMind.think('USER_SENT_MESSAGE', { message: message });
            } else {
                // Fallback if the mind isn't ready yet
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.addMessageToWindow("فهمت رسالتك. سأفكر فيها...", 'bot');
                }, 1000);
            }
        },

        addMessageToWindow(text, sender) {
            const body = document.getElementById('chatBody');
            if (!body) return;
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.textContent = text;
            body.appendChild(messageDiv);
            body.scrollTop = body.scrollHeight;
        },

        showTypingIndicator: () => {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.style.display = 'flex';
        },

        hideTypingIndicator: () => {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.style.display = 'none';
        }
    },

    // === Identity Creator ===
    identity: {
        open() { document.getElementById('identity-modal').style.display = 'flex'; },
        close() { document.getElementById('identity-modal').style.display = 'none'; },
        generate() {
            const name = document.getElementById('identity-name').value.trim();
            const wilaya = document.getElementById('identity-wilaya').value;
            if (!name || !wilaya) { alert('يرجى ملء جميع الحقول'); return; }
            const preview = document.getElementById('identity-preview');
            preview.innerHTML = `<div style="font-size:24px; color:var(--primary); font-weight:bold;">${name}</div><div style="font-size:18px; color:var(--accent); margin-top:8px;">ولاية ${wilaya}</div><div style="margin-top:10px; font-size:14px; color:#666;">جزائري بالروح، حرّ بالفكر 💜</div><img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg" style="width:60px; margin-top:10px;">`;
        },
        download() {
            // Load html2canvas library on demand
            if (!window.html2canvas) {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
                s.onload = () => this.capture();
                document.head.appendChild(s);
            } else {
                this.capture();
            }
        },
        capture() {
            html2canvas(document.getElementById('identity-preview')).then(canvas => {
                const link = document.createElement('a');
                link.download = 'هويتي-الجزائرية.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    },

    // === Main Initializer ===
    init() {
        console.log('[NABDZ APP] الجسد (Legacy Adapter) يتم تهيئته...');
        this.chatbot.init();
        // Add other initializations here if needed
        console.log('[NABDZ APP] الجسد جاهز لخدمة العقل.');
    }
};

// Auto-initialize when the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.NabdzApp.init();
});
