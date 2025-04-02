// Common utility functions for the Building Management System

// Initialize dark mode based on user preference
function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-gray-900');
        document.body.classList.remove('bg-gray-100');
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
        type === 'error' ? 'bg-red-500' : 
        type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form validation helper
function validateForm(formId, requiredFields) {
    const form = document.getElementById(formId);
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });

    return isValid;
}

// Get current residence data
function getCurrentResidence() {
    return JSON.parse(localStorage.getItem('currentResidence')) || {};
}

// Save current residence data
function saveCurrentResidence(data) {
    localStorage.setItem('currentResidence', JSON.stringify(data));
}

// Initialize photo preview functionality
function initPhotoPreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    
    // Check if there's residence data, otherwise redirect to home
    if (!window.location.pathname.includes('index.html') && 
        !window.location.pathname.includes('add-residence.html') &&
        !localStorage.getItem('currentResidence')) {
        window.location.href = 'index.html';
    }
});

// Export all functions for use in other files
export {
    initDarkMode,
    showToast,
    validateForm,
    getCurrentResidence,
    saveCurrentResidence,
    initPhotoPreview
};