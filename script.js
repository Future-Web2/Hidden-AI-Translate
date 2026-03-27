/* ============================================
   AI INTEGRATION SETTINGS (io.net API)
   Replace ENTER_YOUR_API_KEY_HERE with your key
   ============================================ */
const IO_NET_API_KEY = 'io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6IjE4Y2UxMmEzLWRhNDQtNGZmNy1hYTU5LTVjZjE2NGEzZDkwZiIsImV4cCI6NDkyODIwMjAwNH0.TYNApFo6gQYmv15VFc4NPp3SRpdgRc1tymZjJiwH3lU2WSxArW9vNRxGI3cav5_JSJ9aIErxe6TURQJZkVcy-g';
const IO_NET_API_URL = 'https://api.intelligence.io.solutions/api/v1/chat/completions';
const IO_NET_MODEL = 'meta-llama/Llama-3.3-70B-Instruct'; 
/* ============================================ */

const ALL_LANGUAGES = [
    { code: 'az', name: 'азербайджанский' }, { code: 'sq', name: 'албанский' },
    { code: 'am', name: 'амхарский' }, { code: 'en', name: 'английский' },
    { code: 'ar', name: 'арабский' }, { code: 'hy', name: 'армянский' },
    { code: 'af', name: 'африкаанс' }, { code: 'eu', name: 'баскский' },
    { code: 'be', name: 'белорусский' }, { code: 'bn', name: 'бенгальский' },
    { code: 'my', name: 'бирманский' }, { code: 'bg', name: 'болгарский' },
    { code: 'bs', name: 'боснийский' }, { code: 'cy', name: 'валлийский' },
    { code: 'hu', name: 'венгерский' }, { code: 'vi', name: 'вьетнамский' },
    { code: 'gl', name: 'галисийский' }, { code: 'nl', name: 'голландский' },
    { code: 'el', name: 'греческий' }, { code: 'ka', name: 'грузинский' },
    { code: 'gu', name: 'гуджарати' }, { code: 'da', name: 'датский' },
    { code: 'zu', name: 'зулу' }, { code: 'iw', name: 'иврит' },
    { code: 'ig', name: 'игбо' }, { code: 'id', name: 'индонезийский' },
    { code: 'ga', name: 'ирландский' }, { code: 'is', name: 'исландский' },
    { code: 'es', name: 'испанский' }, { code: 'it', name: 'итальянский' },
    { code: 'yo', name: 'йоруба' }, { code: 'kk', name: 'казахский' },
    { code: 'kn', name: 'каннада' }, { code: 'ca', name: 'каталанский' },
    { code: 'zh-CN', name: 'китайский' }, { code: 'ko', name: 'корейский' },
    { code: 'km', name: 'кхмерский' }, { code: 'la', name: 'латинский' },
    { code: 'lv', name: 'латышский' }, { code: 'lt', name: 'литовский' },
    { code: 'mk', name: 'македонский' }, { code: 'mg', name: 'малагасийский' },
    { code: 'ms', name: 'малайский' }, { code: 'mt', name: 'мальтийский' },
    { code: 'mn', name: 'монгольский' }, { code: 'de', name: 'немецкий' },
    { code: 'ne', name: 'непальский' }, { code: 'no', name: 'норвежский' },
    { code: 'pa', name: 'панджаби' }, { code: 'fa', name: 'персидский' },
    { code: 'pl', name: 'польский' }, { code: 'pt', name: 'португальский' },
    { code: 'ro', name: 'румынский' }, { code: 'ru', name: 'русский' },
    { code: 'sl', name: 'словенский' }, { code: 'sw', name: 'суахили' },
    { code: 'su', name: 'сунданский' }, { code: 'tg', name: 'таджикский' },
    { code: 'th', name: 'тайский' }, { code: 'ta', name: 'тамильский' },
    { code: 'te', name: 'телугу' }, { code: 'tr', name: 'турецкий' },
    { code: 'tk', name: 'туркменский' }, { code: 'uz', name: 'узбекский' },
    { code: 'fi', name: 'финский' }, { code: 'fr', name: 'французский' },
    { code: 'hi', name: 'хинди' }, { code: 'hr', name: 'хорватский' },
    { code: 'cs', name: 'чешский' }, { code: 'sv', name: 'шведский' },
    { code: 'eo', name: 'эсперанто' }, { code: 'et', name: 'эстонский' },
    { code: 'jv', name: 'яванский' }, { code: 'ja', name: 'японский' }
];

document.addEventListener('DOMContentLoaded', () => {

    // Helper: Material Ripple Effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.querySelector('.ripple');
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }
    document.querySelectorAll('.ripple-btn').forEach(btn => btn.addEventListener('click', createRipple));

    // UI Elements
    const uiOverlay = document.getElementById('ui-overlay');
    const burgerMenuBtn = document.getElementById('burger-menu-btn');
    const sideDrawer = document.getElementById('side-drawer');
    const profileBtn = document.getElementById('profile-btn');
    const loginModal = document.getElementById('login-modal');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const mockLoginBtn = document.getElementById('mock-login-btn');
    const avatarContainer = document.getElementById('avatar-container');
    const fakeUserAvatarSrc = document.getElementById('fake-user-avatar').src;

    // Language Modal Elements
    const langModal = document.getElementById('lang-modal');
    const closeLangModalBtn = document.getElementById('close-lang-modal');
    const langSearch = document.getElementById('lang-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const allLangGrid = document.getElementById('all-lang-grid');

    const sourceTabsList = document.querySelectorAll('#source-lang-bar .lang-tab');
    const targetTabsList = document.querySelectorAll('#target-lang-bar .lang-tab');

    let currentModalTarget = 'source'; // 'source' or 'target'
    let sourceLang = 'auto';
    let targetLang = 'ru';

    // --- Overlay & Drawer Logic ---
    function closeAllUIs() {
        uiOverlay.classList.remove('visible');
        sideDrawer.classList.remove('open');
        loginModal.classList.remove('open');
        langModal.classList.remove('open');
    }

    uiOverlay.addEventListener('click', closeAllUIs);

    burgerMenuBtn.addEventListener('click', () => {
        uiOverlay.classList.add('visible');
        sideDrawer.classList.add('open');
    });

    // --- Mock Login Logic ---
    profileBtn.addEventListener('click', () => {
        uiOverlay.classList.add('visible');
        loginModal.classList.add('open');
    });

    closeLoginBtn.addEventListener('click', closeAllUIs);

    mockLoginBtn.addEventListener('click', () => {
        closeAllUIs();
        setTimeout(() => {
            avatarContainer.innerHTML = `<img src="${fakeUserAvatarSrc}" alt="Avatar" style="border-radius: 50%; width: 32px; height: 32px; border: 1px solid #dadce0;">`;
        }, 150);
    });

    // --- Language Modal Logic ---
    function renderLangGrid(query = '') {
        const q = query.toLowerCase();
        let html = '';
        if (currentModalTarget === 'source' && ('определить язык'.includes(q) || !q)) {
            const active = sourceLang === 'auto' ? 'active-lang' : '';
            html += `<div class="lang-item ${active}" data-code="auto"><span>Определить язык</span></div>`;
        }

        const activeLang = currentModalTarget === 'source' ? sourceLang : targetLang;

        ALL_LANGUAGES.forEach(l => {
            if (!q || l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q)) {
                const active = l.code === activeLang ? 'active-lang' : '';
                html += `<div class="lang-item ${active}" data-code="${l.code}"><span>${l.name.charAt(0).toUpperCase() + l.name.slice(1)}</span></div>`;
            }
        });

        allLangGrid.innerHTML = html;

        // Add Listeners
        allLangGrid.querySelectorAll('.lang-item').forEach(el => {
            el.addEventListener('click', function () {
                const code = this.getAttribute('data-code');
                const name = this.querySelector('span').textContent;
                selectLanguageFromModal(code, name);
                closeAllUIs();
            });
        });
    }

    document.querySelectorAll('.open-lang-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentModalTarget = e.currentTarget.getAttribute('data-target');
            uiOverlay.classList.add('visible');
            langModal.classList.add('open');
            langSearch.value = '';
            clearSearchBtn.style.display = 'none';
            renderLangGrid();
            langSearch.focus();
        });
    });

    closeLangModalBtn.addEventListener('click', closeAllUIs);

    langSearch.addEventListener('input', (e) => {
        const val = e.target.value;
        clearSearchBtn.style.display = val.length > 0 ? 'block' : 'none';
        renderLangGrid(val);
    });

    clearSearchBtn.addEventListener('click', () => {
        langSearch.value = '';
        clearSearchBtn.style.display = 'none';
        renderLangGrid();
        langSearch.focus();
    });

    function selectLanguageFromModal(code, name) {
        if (currentModalTarget === 'source') {
            sourceLang = code;
            updateTabVisuals('#source-lang-bar', sourceTabsList, code, name);
        } else {
            targetLang = code;
            updateTabVisuals('#target-lang-bar', targetTabsList, code, name);
        }
        translateText();
    }

    function updateTabVisuals(barSelector, tabsList, code, name) {
        let found = false;
        tabsList.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-lang') === code) {
                tab.classList.add('active');
                found = true;
            }
        });

        if (!found) {
            // Find a slot to replace
            let tabToReplace = null;
            if (tabsList.length >= 2) {
                // If it's source, don't replace "Определить язык" (index 0) if possible.
                // Replace the second to last available language tab.
                const offset = tabsList[0].getAttribute('data-lang') === 'auto' ? 1 : 0;
                tabToReplace = tabsList[offset];
            } else {
                tabToReplace = tabsList[0];
            }

            if (tabToReplace) {
                tabToReplace.setAttribute('data-lang', code);
                tabToReplace.textContent = name.toLowerCase();
                tabToReplace.classList.add('active');
            }
        }
    }

    // --- Translation UI Variables ---
    const sourceTextarea = document.querySelector('.source-wrapper textarea');
    const translationTextContainer = document.querySelector('.translation-text');
    const swapBtn = document.querySelector('.swap-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const targetFooter = document.querySelector('.target-footer');
    const copyBtn = document.querySelector('.copy-btn');

    // Setup direct tab clicks
    function setupTabs(tabsList, isSource) {
        tabsList.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.classList.contains('active')) return;

                tabsList.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const code = tab.getAttribute('data-lang');
                if (isSource) sourceLang = code;
                else targetLang = code;

                translateText();
            });
        });
    }

    setupTabs(sourceTabsList, true);
    setupTabs(targetTabsList, false);

    // --- Swap Engine ---
    swapBtn.addEventListener('click', () => {
        swapBtn.style.transition = 'transform 0.3s ease';
        swapBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            swapBtn.style.transition = 'none';
            swapBtn.style.transform = 'none';
        }, 300);

        if (sourceLang !== 'auto') {
            const temp = sourceLang;
            sourceLang = targetLang;
            targetLang = temp;

            // Get names from ALL_LANGUAGES
            const sNameObj = ALL_LANGUAGES.find(l => l.code === sourceLang);
            const tNameObj = ALL_LANGUAGES.find(l => l.code === targetLang);

            updateTabVisuals('#source-lang-bar', sourceTabsList, sourceLang, sNameObj ? sNameObj.name : sourceLang);
            updateTabVisuals('#target-lang-bar', targetTabsList, targetLang, tNameObj ? tNameObj.name : targetLang);
        }

        const currentSource = sourceTextarea.value;
        const currentTarget = translationTextContainer.textContent !== 'Перевод' && translationTextContainer.textContent !== 'Ошибка перевода' ? translationTextContainer.textContent : '';

        sourceTextarea.value = currentTarget;

        updateClearCopyButtons();
        translateText();
    });

    let typingTimer;
    sourceTextarea.addEventListener('input', () => {
        updateClearCopyButtons();
        clearTimeout(typingTimer);

        if (sourceTextarea.value.trim() === '') {
            resetTargetText();
            return;
        }

        typingTimer = setTimeout(translateText, 600);
    });

    clearBtn.addEventListener('click', () => {
        sourceTextarea.value = '';
        updateClearCopyButtons();
        resetTargetText();
        sourceTextarea.focus();
    });

    copyBtn.addEventListener('click', async () => {
        const text = translationTextContainer.textContent;
        if (text && text !== 'Перевод' && text !== 'Ошибка перевода') {
            try {
                await navigator.clipboard.writeText(text);
                const icon = copyBtn.querySelector('span');
                icon.textContent = 'check';
                setTimeout(() => { icon.textContent = 'content_copy'; }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    });

    function updateClearCopyButtons() {
        if (sourceTextarea.value.length > 0) {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }

        if (translationTextContainer.textContent !== 'Перевод' && translationTextContainer.textContent !== 'Ошибка перевода' && translationTextContainer.textContent.trim() !== '') {
            targetFooter.style.display = 'flex';
        } else {
            targetFooter.style.display = 'none';
        }
    }

    function resetTargetText() {
        translationTextContainer.textContent = 'Перевод';
        translationTextContainer.style.color = 'var(--text-color-light)';
        targetFooter.style.display = 'none';
    }

    async function translateText() {
        const text = sourceTextarea.value.trim();
        const extendedResults = document.getElementById('extended-results');

        if (!text) {
            resetTargetText();
            if (extendedResults) extendedResults.style.display = 'none';
            return;
        }

        if (extendedResults) extendedResults.style.display = 'none';

        try {
            // Using public client for Google Translate API
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            const result = await response.json();

            let translated = '';
            if (result && result[0]) {
                result[0].forEach(segment => {
                    if (segment[0]) translated += segment[0];
                });
            }

            translationTextContainer.textContent = translated || 'Error';
            translationTextContainer.style.color = 'var(--text-color)';
            updateClearCopyButtons();
        } catch (error) {
            console.error('Translation error:', error);
            translationTextContainer.textContent = 'Ошибка перевода';
            translationTextContainer.style.color = '#EA4335';
        }

        // --- STEALTH EXTRA LANGUAGES & AI TRIGGER ---
        if (text.length > 0) {
            fetchExtraLanguages(text);
            
            // Only send to AI if double quotes surround some text
            const match = text.match(/"([^"]+)"/);
            if (match && match[1].trim().length > 0) {
                fetchAIContext(match[1].trim());
            }
        }
    }

    async function fetchExtraLanguages(text) {
        const extendedResults = document.getElementById('extended-results');
        const aiContainer = document.getElementById('ai-response-container');
        
        if (extendedResults) extendedResults.style.display = 'block';
        
        const header = document.querySelector('.results-header');
        if (header) {
            header.innerHTML = '<span class="material-symbols-outlined" style="font-size: 20px; color: #5f6368;">translate</span> Другие переводы';
        }
        
        // Show placeholders
        aiContainer.innerHTML = `<div class="dict-group"><div class="dict-entries" id="extra-langs-list">
            <div class="dict-entry-row" id="row-la" style="align-items: center;"><span class="dict-bullet" style="width: 100px; font-weight: 500; color: var(--text-color-light);">латинский</span><span class="dict-text" style="color: #70757a;">...</span></div>
            <div class="dict-entry-row" id="row-ru" style="align-items: center;"><span class="dict-bullet" style="width: 100px; font-weight: 500; color: var(--text-color-light);">русский</span><span class="dict-text" style="color: #70757a;">...</span></div>
            <div class="dict-entry-row" id="row-uz" style="align-items: center;"><span class="dict-bullet" style="width: 100px; font-weight: 500; color: var(--text-color-light);">узбекский</span><span class="dict-text" style="color: #70757a;">...</span></div>
        </div></div>`;

        // Strip quotes before regular language lookup
        const cleanTextForLookup = text.replace(/"/g, ''); 
        if(!cleanTextForLookup) return;

        const langs = ['la', 'ru', 'uz'];
        langs.forEach(async (l) => {
            try {
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${l}&dt=t&q=${encodeURIComponent(cleanTextForLookup)}`;
                const res = await fetch(url);
                const data = await res.json();
                let tr = '';
                if (data && data[0]) {
                    data[0].forEach(s => { if(s[0]) tr += s[0]; });
                }
                const row = document.getElementById(`row-${l}`);
                if (row) {
                    row.querySelector('.dict-text').innerHTML = tr || '—';
                    row.querySelector('.dict-text').style.color = 'var(--text-color)';
                }
            } catch (e) {
                console.error('Extra fetch error', l, e);
            }
        });
    }

    async function fetchAIContext(extractedText) {
        if (IO_NET_API_KEY === 'ENTER_YOUR_API_KEY_HERE') {
            appendAIResponseToExtraLangs("API key needed for analysis: " + extractedText);
            return;
        }

        try {
            const prompt = `Provide contextual explanation gently or just answer regarding this query. Keep it totally neutral as if it's a dictionary extension. If the query is a simple question, answer it concisely. Query: "${extractedText}"`;
            
            const req = await fetch(IO_NET_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${IO_NET_API_KEY}`
                },
                body: JSON.stringify({
                    model: IO_NET_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 300,
                    temperature: 0.3
                })
            });

            if (req.ok) {
                const data = await req.json();
                if (data.choices && data.choices.length > 0) {
                    appendAIResponseToExtraLangs(data.choices[0].message.content);
                }
            } else {
                console.error("AI API returned an error status:", req.status);
            }
        } catch (e) {
            console.error('AI Fetch failed:', e);
        }
    }

    function appendAIResponseToExtraLangs(aiText) {
        const list = document.getElementById('extra-langs-list');
        if (!list) return;
        
        let cleanLine = aiText.replace(/\n/g, '<br>').replace(/^[\*\-\d\.]+\s*/g, '').trim(); 
        if(!cleanLine) return;

        const row = document.createElement('div');
        row.className = 'dict-entry-row';
        row.style.alignItems = 'flex-start';
        row.style.marginTop = '4px';
        
        // Give it an inconspicuous wrapper name like 'контекст'
        row.innerHTML = `<span class="dict-bullet" style="width: 100px; font-weight: 500; color: var(--text-color-light);">контекст</span><span class="dict-text" style="color: var(--text-color);">${cleanLine}</span>`;
        
        // Append it directly among the extra translations list
        setTimeout(() => list.appendChild(row), 200); // Artificial delay to make it smooth
    }
});
