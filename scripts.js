
                    document.addEventListener('DOMContentLoaded', () => {
                        const navToggle = document.querySelector('.nav-toggle');
                        const navMenu = document.querySelector('header nav ul');
                        if (navToggle && navMenu) {
                            navToggle.addEventListener('click', () => {
                                const isVisible = navMenu.classList.toggle('show');
                                navToggle.setAttribute('aria-expanded', isVisible.toString());
                                navToggle.innerHTML = isVisible ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                            });
                        }
                        const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
                        const navLinks = document.querySelectorAll('header nav ul li a');
                        navLinks.forEach(link => {
                            const linkPage = link.getAttribute('href').split('/').pop();
                            if (linkPage === currentLocation) {
                                link.classList.add('active');
                                const parentLi = link.closest('li.dropdown');
                                if (parentLi) {
                                    parentLi.querySelector('a').classList.add('active');
                                }
                            }
                        });
                        const chatbotBtn = document.querySelector('.chatbot-btn');
                        const chatbotWindow = document.querySelector('.chatbot-window');
                        const chatbotCloseBtn = document.querySelector('.chatbot-close-btn');
                        const chatbotMessagesContainer = document.querySelector('.chatbot-messages');
                        const chatbotInput = document.querySelector('#chatbot-input');
                        const chatbotSendBtn = document.querySelector('#chatbot-send');
                        function addMessageToChat(text, type) {
                            if (!chatbotMessagesContainer) return;
                            const messageElement = document.createElement('div');
                            messageElement.classList.add('chatbot-message', type);
                            messageElement.textContent = text;
                            chatbotMessagesContainer.appendChild(messageElement);
                            chatbotMessagesContainer.scrollTop = chatbotMessagesContainer.scrollHeight;
                        }
                        if (chatbotBtn && chatbotWindow) {
                            chatbotBtn.addEventListener('click', () => {
                                const isActive = chatbotWindow.classList.toggle('active');
                                chatbotWindow.hidden = !isActive;
                                if (isActive && chatbotMessagesContainer.children.length === 0) {
                                     setTimeout(() => { addMessageToChat("Hello! How can I help you today?", "bot"); }, 300);
                                }
                                if(isActive && chatbotInput) chatbotInput.focus();
                            });
                        }
                        if (chatbotCloseBtn && chatbotWindow) {
                             chatbotCloseBtn.addEventListener('click', () => {
                                chatbotWindow.classList.remove('active');
                                chatbotWindow.hidden = true;
                             });
                        }
                        function handleChatbotSend() {
                            if (!chatbotInput || !chatbotMessagesContainer) return;
                            const userText = chatbotInput.value.trim();
                            if (userText) {
                                addMessageToChat(userText, 'user');
                                chatbotInput.value = '';
                                if(chatbotInput) chatbotInput.focus();
                                setTimeout(() => { addMessageToChat('Thanks for your message! A representative will get back to you shortly.', 'bot'); }, 1000);
                            }
                        }
                        if (chatbotSendBtn) { chatbotSendBtn.addEventListener('click', handleChatbotSend); }
                        if (chatbotInput) { chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleChatbotSend(); } }); }
                        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                            anchor.addEventListener('click', function (e) {
                                const href = this.getAttribute('href');
                                if (href.length > 1 && href.startsWith('#')) {
                                    const targetId = href.substring(1);
                                    const targetElement = document.getElementById(targetId);
                                    if (targetElement) {
                                        e.preventDefault();
                                        targetElement.scrollIntoView({ behavior: 'smooth' });
                                        if (navMenu && navMenu.classList.contains('show') && navToggle) {
                                            navMenu.classList.remove('show');
                                            navToggle.setAttribute('aria-expanded', 'false');
                                            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                                        }
                                    }
                                }
                            });
                        });
                        
                        const heroElement = document.querySelector('.hero');
                        const heroBackgrounds = ["images/hero_bg_1_20250609_020010.webp", "images/hero_bg_2_20250609_020159.webp", "images/hero_bg_3_20250609_020347.webp"];
                        let currentHeroBgIndex = 0;
                        function changeHeroBackground() {
                            if (heroElement && heroBackgrounds && heroBackgrounds.length > 0) {
                                heroElement.style.backgroundImage = `url('${heroBackgrounds[currentHeroBgIndex]}')`;
                                currentHeroBgIndex = (currentHeroBgIndex + 1) % heroBackgrounds.length;
                            }
                        }
                        if (heroElement && heroBackgrounds && heroBackgrounds.length > 1) {
                            setInterval(changeHeroBackground, 7000);
                        }
            
                        try {
                            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
                            if (accentColor.startsWith('#')) {
                                const r = parseInt(accentColor.slice(1, 3), 16);
                                const g = parseInt(accentColor.slice(3, 5), 16);
                                const b = parseInt(accentColor.slice(5, 7), 16);
                                if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                                     document.documentElement.style.setProperty('--accent-color-rgb', `${r},${g},${b}`);
                                } else { document.documentElement.style.setProperty('--accent-color-rgb', '44,62,80'); }
                            } else { document.documentElement.style.setProperty('--accent-color-rgb', '44,62,80'); }
                        } catch (error) {
                            console.warn("Could not parse accent color for RGB property:", error);
                            document.documentElement.style.setProperty('--accent-color-rgb', '44,62,80');
                        }
                    });
                