/* script.js - The Performance (The Brain) */

document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION BLOCK (Model Context Protocol) ---
    // This is the "brain" of your white-labeling system.
    // All page content and settings are controlled from here.
    const config = {
        // The main ON/OFF switch for the entire site
        isEnabled: true,
        disabledMessage: "This site is currently undergoing maintenance. Please check back later.",

        // Business & Service Details
        businessName: "Burlington Concrete & Asphalt",
        businessCity: "Burlington",
        serviceName: "Concrete & Asphalt",
        
        // The service options that appear in the form dropdown
        serviceOptions: [
            "Concrete Driveway",
            "Asphalt Paving",
            "Interlock Patio",
            "Walkway Installation",
            "General Repair",
            "Other"
        ],

        // Links and Embeds
        googleCalendarLink: "https://your-google-calendar-booking-link.com", // IMPORTANT: Replace this link
        
        // Referral Video - Use a YouTube embed code. This one is a placeholder.
        referralVideoHTML: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    };
    // ----------------------------------------------------


    // --- CORE LOGIC ---

    // 1. The On/Off Switch
    if (!config.isEnabled) {
        document.body.innerHTML = `<div class="site-disabled">${config.disabledMessage}</div>`;
        return; // Stop all other script execution
    }

    // 2. White-Labeling Engine: Apply config to the page
    function applyConfiguration() {
        document.querySelectorAll('[data-config]').forEach(element => {
            const key = element.getAttribute('data-config');
            if (config[key] !== undefined) {
                if (key === 'referralVideoHTML') {
                    element.innerHTML = config[key];
                } else {
                    element.textContent = config[key];
                }
            }
        });
        
        document.title = `${config.businessName} - Free Quote`;

        const serviceSelect = document.querySelector('[data-config-service-options]');
        if (serviceSelect) {
            serviceSelect.innerHTML = '';
            config.serviceOptions.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                serviceSelect.appendChild(option);
            });
        }
    }

    // 3. Multi-Step Form Logic
    const form = document.getElementById('multi-step-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextButtons = Array.from(document.querySelectorAll('.next-button'));
    const prevButtons = Array.from(document.querySelectorAll('.prev-button'));
    let currentStep = 0;

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove('active');
                currentStep++;
                steps[currentStep].classList.add('active');
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('active');
                currentStep--;
                steps[currentStep].classList.add('active');
            }
        });
    });

    // 4. Form Submission & Workflow Simulation
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const leadName = formData.get('name');
        
        showThankYouMessage(leadName);
        simulateInternalNotification(formData);
        setupBookingLink();
    });

    function showThankYouMessage(name) {
        document.getElementById('main-content').classList.add('hidden');
        const thankYouScreen = document.getElementById('thank-you-screen');
        document.getElementById('thank-you-name').textContent = name;
        thankYouScreen.classList.remove('hidden');
    }

    function simulateInternalNotification(formData) {
        const notification = document.getElementById('internal-notification');
        const notificationText = document.getElementById('notification-text');

        const leadInfo = `
            Name: ${formData.get('name')} <br>
            Service: ${formData.get('service')} <br>
            Email: ${formData.get('email')}
        `;
        notificationText.innerHTML = leadInfo;
        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 10000);
    }

    function setupBookingLink() {
        const bookingLink = document.getElementById('booking-link');
        if (bookingLink) {
            bookingLink.href = config.googleCalendarLink;
        }
    }

    // --- INITIALIZATION ---
    applyConfiguration();

});