// Animation pour le menu mobile
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Animation au défilement
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 22, 0.9)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(10, 10, 22, 0.7)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Effet de saisie pour le titre
const heroTitle = document.querySelector('.hero h1');
const text = heroTitle.textContent;
heroTitle.innerHTML = '';

for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.animationDelay = `${i * 0.05}s`;
    heroTitle.appendChild(span);
}

// Animation des éléments au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.expertise-card, .project-card, .timeline-item, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});

// Animation des compétences
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gestion du formulaire de contact avec EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    // Initialiser EmailJS (remplacez par votre Public Key)
    emailjs.init("YOUR_PUBLIC_KEY"); // À remplacer par votre clé publique EmailJS
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Afficher l'indicateur de chargement
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            project_type: document.getElementById('project-type').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString('fr-FR')
        };
        
        // Envoi via EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData) // À remplacer par vos IDs
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Afficher le message de succès
                showNotification('✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Restaurer le bouton
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Afficher le message d'erreur
                showNotification('❌ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.', 'error');
                
                // Restaurer le bouton
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
});

// Fonction pour afficher les notifications
function showNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Ajouter les styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 157, 0.9)' : 'rgba(255, 0, 102, 0.9)'};
        color: var(--dark);
        padding: 15px 20px;
        border-radius: 10px;
        border: 2px solid ${type === 'success' ? 'var(--accent)' : 'var(--secondary)'};
        box-shadow: var(--glow);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Styles pour le contenu de la notification
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    // Styles pour le bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--dark);
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 0, 0, 0.1)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'none';
    });
    
    // Ajouter l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Fonction pour fermer la notification
    function closeNotification() {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Événements de fermeture
    closeBtn.addEventListener('click', closeNotification);
    
    // Fermeture automatique après 5 secondes
    setTimeout(closeNotification, 5000);
    
    // Ajouter la notification au document
    document.body.appendChild(notification);
}

// Alternative: Envoi via Formspree (solution sans configuration complexe)
function setupFormspree() {
    const contactForm = document.querySelector('.contact-form');
    
    // Changer l'action du formulaire pour utiliser Formspree
    contactForm.action = "https://formspree.io/f/YOUR_FORMSPREE_ID"; // À remplacer par votre ID Formspree
    contactForm.method = "POST";
    
    // Ajouter les champs cachés pour Formspree
    const hiddenSubject = document.createElement('input');
    hiddenSubject.type = 'hidden';
    hiddenSubject.name = '_subject';
    hiddenSubject.value = 'Nouvelle proposition de projet - Portfolio Technova';
    contactForm.appendChild(hiddenSubject);
    
    const hiddenReplyTo = document.createElement('input');
    hiddenReplyTo.type = 'hidden';
    hiddenReplyTo.name = '_replyto';
    hiddenReplyTo.value = '#email'; // Sera rempli par JavaScript
    
    contactForm.appendChild(hiddenReplyTo);
    
    // Mettre à jour le champ _replyto quand l'email change
    document.getElementById('email').addEventListener('input', function() {
        hiddenReplyTo.value = this.value;
    });
}

// Détection automatique de la solution d'envoi
function setupFormSubmission() {
    // Vérifier si EmailJS est configuré
    const emailjsConfigured = emailjs && emailjs.init && typeof emailjs.init === 'function';
    
    if (emailjsConfigured) {
        console.log('EmailJS configuré - utilisation du service EmailJS');
        // Le gestionnaire EmailJS est déjà configuré plus haut
    } else {
        console.log('EmailJS non configuré - utilisation de Formspree');
        setupFormspree();
        
        // Ajouter un gestionnaire pour afficher la notification même avec Formspree
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', function(e) {
            // La soumission normale se produit, on ajoute juste une notification
            setTimeout(() => {
                showNotification('✅ Formulaire soumis ! Redirection en cours...', 'success');
            }, 100);
        });
    }
}

// Initialiser la soumission du formulaire
document.addEventListener('DOMContentLoaded', setupFormSubmission);

// Fonction utilitaire pour valider l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation en temps réel du formulaire
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--secondary)';
            this.style.boxShadow = '0 0 10px rgba(255, 0, 102, 0.5)';
        } else {
            this.style.borderColor = 'rgba(0, 243, 255, 0.3)';
            this.style.boxShadow = 'none';
        }
    });
    
    // Validation complète du formulaire avant soumission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            e.preventDefault();
            showNotification('❌ Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            e.preventDefault();
            showNotification('❌ Veuillez entrer une adresse email valide.', 'error');
            return;
        }
    });
});

// Effet de particules sur le header (optionnel)
function createParticles() {
    const header = document.querySelector('header');
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: -1;
    `;
    
    header.style.position = 'relative';
    header.appendChild(particlesContainer);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary);
            border-radius: 50%;
            box-shadow: var(--glow);
            opacity: 0.7;
        `;
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animation
        particle.style.animation = `float ${3 + Math.random() * 7}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Appeler la fonction pour créer les particules (optionnel)
// createParticles();