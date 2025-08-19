// Configurações do WhatsApp
const WHATSAPP_PHONE = '5569999725720'; // Número do Rodrigo Soares
const WHATSAPP_MESSAGE = 'Olá Rodrigo! Vi seu site e gostaria de conversar sobre um projeto.';

// Elementos do DOM
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');

// Função para abrir WhatsApp
function openWhatsApp(message = '') {
    const phone = WHATSAPP_PHONE;
    const text = message || WHATSAPP_MESSAGE;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('loading', 'loaded');
        }
    });
}

// Função para atualizar header no scroll
function updateHeaderOnScroll() {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Função para animar barras de habilidades
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Função para validar formulário
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    if (!formData.phone || formData.phone.trim().length < 10) {
        errors.push('Telefone deve ter pelo menos 10 dígitos');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    return errors;
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #25d366;' : 'background: #ff6b6b;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Função para formatar dados do formulário
function formatFormData(formData) {
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    return data;
}

// Função para criar mensagem do WhatsApp
function createWhatsAppMessage(formData) {
    return `*Novo Lead do Site*

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}

*Mensagem:*
${formData.message}

---
Enviado através do site Rodrigo Soares`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Animar elementos no scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // Animar barras de habilidades quando a seção sobre estiver visível
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(aboutSection);
    }
    
    // Formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = formatFormData(formData);
            
            // Validar formulário
            const errors = validateForm(data);
            
            if (errors.length > 0) {
                errors.forEach(error => {
                    showNotification(error, 'error');
                });
                return;
            }
            
            // Criar mensagem para WhatsApp
            const message = createWhatsAppMessage(data);
            
            // Abrir WhatsApp com a mensagem
            openWhatsApp(message);
            
            // Mostrar notificação de sucesso
            showNotification('Formulário enviado! Redirecionando para WhatsApp...');
            
            // Limpar formulário
            this.reset();
        });
    }
    
    // Animar elementos na carga inicial
    animateOnScroll();
    
    // Adicionar classe de carregamento aos elementos
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    animatedElements.forEach(element => {
        element.classList.add('loading');
    });
});

// Função para adicionar efeito de digitação
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Função para adicionar efeito de contador
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Função para adicionar efeito de parallax
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Adicionar efeito de parallax ao scroll
window.addEventListener('scroll', parallaxEffect);

// Função para adicionar efeito de hover nos cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar efeitos de hover
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Função para adicionar loading state aos botões
function addLoadingState() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Inicializar loading state
document.addEventListener('DOMContentLoaded', addLoadingState);

// Função para adicionar efeito de scroll suave para todos os links
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializar smooth scroll
document.addEventListener('DOMContentLoaded', addSmoothScroll);

// Função para adicionar efeito de fade in para elementos
function addFadeInEffect() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Inicializar fade in effect
document.addEventListener('DOMContentLoaded', addFadeInEffect);

// Função para adicionar efeito de cursor de digitação
function addTypingEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 200);
    });
}

// Inicializar efeito de digitação
document.addEventListener('DOMContentLoaded', addTypingEffect);

// Função para adicionar efeito de partículas no background
function addParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        hero.appendChild(particle);
        particles.push(particle);
    }
    
    // Adicionar keyframes para animação de flutuação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar efeito de partículas
document.addEventListener('DOMContentLoaded', addParticleEffect);

// ===== NOVAS FUNCIONALIDADES =====

// Função para alternar tema (escuro/claro)
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animar a transição
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Função para carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// Função para newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simular envio (em produção, enviaria para um servidor)
    showNotification('Inscrição realizada com sucesso! Obrigado por se inscrever.', 'success');
    form.reset();
    
    // Tracking do Google Analytics (se configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            'event_category': 'engagement',
            'event_label': 'footer_newsletter'
        });
    }
}

// Função para tracking de eventos do Google Analytics
function trackEvent(eventName, eventCategory, eventLabel) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': eventCategory,
            'event_label': eventLabel
        });
    }
}

// Função para tracking de cliques em botões
function trackButtonClick(buttonText) {
    trackEvent('button_click', 'engagement', buttonText);
}

// Função para tracking de visualização de seções
function trackSectionView(sectionName) {
    trackEvent('section_view', 'engagement', sectionName);
}

// Inicializar funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    loadSavedTheme();
    
    // Adicionar tracking para botões
    const buttons = document.querySelectorAll('.btn, .social-link, .nav-menu a');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            trackButtonClick(this.textContent.trim());
        });
    });
    
    // Adicionar tracking para visualização de seções
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id;
                trackSectionView(sectionName);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Adicionar animação para cards de depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}); 