// animations.js
document.addEventListener('DOMContentLoaded', function() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const serviceNum = this.getAttribute('data-service');
            const colors = [
                'rgba(255, 77, 148, 0.1)',
                'rgba(106, 17, 203, 0.1)',
                'rgba(0, 201, 255, 0.1)',
                'rgba(40, 167, 69, 0.1)'
            ];
            
            this.style.backgroundColor = colors[serviceNum - 1] || colors[0];
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'white';
        });
    });
    
    // Package cards selection effect
    const packageButtons = document.querySelectorAll('.btn-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Create a ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show a confirmation message
            const packageName = this.closest('.package-card').querySelector('.package-name').textContent;
            showNotification(`Thank you for choosing our ${packageName} package! We'll contact you soon.`);
        });
    });
    
    // Form submission
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            
            // Simple validation
            if (name && email && service) {
                // Show success message
                showNotification(`Thank you ${name}! Your quote request has been submitted. We'll contact you within 24 hours.`);
                
                // Reset form
                quoteForm.reset();
                
                // Simulate form submission animation
                const submitBtn = quoteForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Submitted!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                }, 2000);
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
    
    // Notification function
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(150%);
            transition: transform 0.5s ease;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }
    
    // Add ripple animation to CSS
    if (!document.getElementById('rippleAnimation')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'rippleAnimation';
        rippleStyle.innerHTML = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
});
