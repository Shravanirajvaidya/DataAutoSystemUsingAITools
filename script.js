// JavaScript for DataAutoSys

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('noticeDate');
    if (dateInput) {
        dateInput.value = today;
    }
    
    // Initialize form field counter
    window.formFieldCounter = 0;
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Module tab switching - hide all outputs when switching tabs
    const moduleTabs = document.querySelectorAll('#moduleTabs button[data-bs-toggle="pill"]');
    moduleTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            // Hide all output sections when switching tabs
            hideAllOutputs();
        });
    });
});

// Function to hide all output sections
function hideAllOutputs() {
    const outputSections = [
        'noticeOutput',
        'letterOutput',
        'quizOutput',
        'pdfToolOutput',
        'formOutput'
    ];
    
    outputSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
}

// Function to reset form inputs (optional - can be enabled if needed)
function resetFormInputs(tabId) {
    const formMap = {
        'notice': 'noticeForm',
        'letter': 'letterForm',
        'quiz': 'quizForm',
        'form': 'formBuilder'
    };
    
    // You can uncomment the lines below to auto-clear forms when switching tabs
    // Object.values(formMap).forEach(formId => {
    //     const form = document.getElementById(formId);
    //     if (form) {
    //         form.reset();
    //     }
    // });
}

// Notice Generator
function generateNotice() {
    const title = document.getElementById('noticeTitle').value;
    const category = document.getElementById('noticeCategory').value;
    const points = document.getElementById('noticePoints').value;
    const date = document.getElementById('noticeDate').value;
    const issuer = document.getElementById('noticeIssuer').value;
    
    if (!title || !points) {
        showAlert('Please fill in all required fields!', 'warning');
        return;
    }
    
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Split points into array
    const pointsList = points.split('\n').filter(p => p.trim() !== '');
    
    // Generate notice content
    let noticeHTML = `
        <div class="text-center mb-4">
            <h4><strong>NOTICE</strong></h4>
            <h5>${title}</h5>
        </div>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Category:</strong> ${category}</p>
        <div class="mt-3">
            <p>This is to inform all concerned that:</p>
            <ul>
                ${pointsList.map(point => `<li>${point}</li>`).join('')}
            </ul>
        </div>
        <div class="mt-4">
            <p>All are requested to take note of the same.</p>
        </div>
        <div class="mt-4 text-end">
            <p><strong>${issuer || 'Administration'}</strong></p>
            <p>${formattedDate}</p>
        </div>
    `;
    
    document.getElementById('noticeContent').innerHTML = noticeHTML;
    document.getElementById('noticeOutput').style.display = 'block';
    
    // Add fade-in animation
    document.getElementById('noticeOutput').classList.add('fade-in');
    
    showAlert('Notice generated successfully!', 'success');
}

// Download Notice as PDF
function downloadNotice() {
    showAlert('PDF download feature will be implemented with backend integration.', 'info');
}

// Email Notice
function emailNotice() {
    showAlert('Email feature will be implemented with backend integration.', 'info');
}

// Copy Notice
function copyNotice() {
    const noticeContent = document.getElementById('noticeContent').innerText;
    navigator.clipboard.writeText(noticeContent).then(() => {
        showAlert('Notice copied to clipboard!', 'success');
    });
}

// Letter Generator
function generateLetter() {
    const type = document.getElementById('letterType').value;
    const recipient = document.getElementById('letterRecipient').value;
    const subject = document.getElementById('letterSubject').value;
    const content = document.getElementById('letterContent').value;
    const sender = document.getElementById('letterSender').value;
    const designation = document.getElementById('letterDesignation').value;
    
    if (!recipient || !subject || !content || !sender) {
        showAlert('Please fill in all required fields!', 'warning');
        return;
    }
    
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let letterHTML = `
        <div style="text-align: right;">
            <p>${today}</p>
        </div>
        <div class="mt-3">
            <p>To,<br>${recipient}</p>
        </div>
        <div class="mt-3">
            <p><strong>Subject: ${subject}</strong></p>
        </div>
        <div class="mt-3">
            <p>Dear Sir/Madam,</p>
        </div>
        <div class="mt-3" style="text-align: justify;">
            <p>${content}</p>
        </div>
        <div class="mt-3">
            <p>Thank you for your attention to this matter.</p>
        </div>
        <div class="mt-4">
            <p>Yours sincerely,</p>
            <p><strong>${sender}</strong><br>${designation}</p>
        </div>
    `;
    
    document.getElementById('letterPreview').innerHTML = letterHTML;
    document.getElementById('letterOutput').style.display = 'block';
    document.getElementById('letterOutput').classList.add('fade-in');
    
    showAlert('Letter generated successfully!', 'success');
}

// Download Letter
function downloadLetter() {
    showAlert('PDF download feature will be implemented with backend integration.', 'info');
}

// Email Letter
function emailLetter() {
    showAlert('Email feature will be implemented with backend integration.', 'info');
}

// Quiz Generator
function generateQuiz() {
    const topic = document.getElementById('quizTopic').value;
    const difficulty = document.getElementById('quizDifficulty').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const type = document.getElementById('quizType').value;
    
    if (!topic) {
        showAlert('Please enter a topic!', 'warning');
        return;
    }
    
    // Sample quiz questions (in real implementation, this would come from AI)
    const sampleQuestions = [
        {
            question: `What is the main concept of ${topic}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 0
        },
        {
            question: `Which statement best describes ${topic}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 1
        },
        {
            question: `In ${topic}, what is the primary focus?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 2
        },
        {
            question: `How does ${topic} relate to practical applications?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 1
        },
        {
            question: `What are the key principles of ${topic}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 3
        }
    ];
    
    let quizHTML = `
        <div class="mb-3">
            <h5>${topic} Quiz</h5>
            <p><strong>Difficulty:</strong> ${difficulty} | <strong>Questions:</strong> ${count} | <strong>Type:</strong> ${type}</p>
        </div>
    `;
    
    for (let i = 0; i < Math.min(count, sampleQuestions.length); i++) {
        const q = sampleQuestions[i];
        quizHTML += `
            <div class="question">
                <h6>Question ${i + 1}: ${q.question}</h6>
                ${q.options.map((opt, idx) => `
                    <div class="option">
                        <input type="radio" name="q${i}" id="q${i}_${idx}" value="${idx}">
                        <label for="q${i}_${idx}" class="ms-2">${opt}</label>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    document.getElementById('quizPreview').innerHTML = quizHTML;
    document.getElementById('quizOutput').style.display = 'block';
    document.getElementById('quizOutput').classList.add('fade-in');
    
    showAlert('Quiz generated successfully!', 'success');
}

// Download Quiz
function downloadQuiz() {
    showAlert('Quiz download feature will be implemented with backend integration.', 'info');
}

// Share Quiz
function shareQuiz() {
    showAlert('Quiz sharing feature will be implemented with backend integration.', 'info');
}

// PDF Tools
function showPdfToImage() {
    const result = `
        <h6>PDF to Image Converter</h6>
        <div class="mb-3">
            <label class="form-label">Upload PDF File</label>
            <input type="file" class="form-control" accept=".pdf">
        </div>
        <button class="btn btn-info" onclick="convertPdfToImage()">
            <i class="fas fa-exchange-alt me-2"></i>Convert to Images
        </button>
    `;
    
    document.getElementById('pdfToolResult').innerHTML = result;
    document.getElementById('pdfToolOutput').style.display = 'block';
}

function showPdfToText() {
    const result = `
        <h6>PDF to Text Extractor</h6>
        <div class="mb-3">
            <label class="form-label">Upload PDF File</label>
            <input type="file" class="form-control" accept=".pdf">
        </div>
        <button class="btn btn-success" onclick="extractPdfText()">
            <i class="fas fa-file-text me-2"></i>Extract Text
        </button>
    `;
    
    document.getElementById('pdfToolResult').innerHTML = result;
    document.getElementById('pdfToolOutput').style.display = 'block';
}

function convertPdfToImage() {
    showAlert('PDF to Image conversion will be implemented with backend integration.', 'info');
}

function extractPdfText() {
    showAlert('PDF text extraction will be implemented with backend integration.', 'info');
}

function createPdf() {
    showAlert('PDF creation feature will be implemented with backend integration.', 'info');
}

// Form Builder
function addFormField() {
    window.formFieldCounter++;
    const fieldList = document.getElementById('fieldList');
    
    const fieldHTML = `
        <div class="field-item" id="field-${window.formFieldCounter}">
            <div>
                <input type="text" placeholder="Field Label" class="form-control form-control-sm d-inline-block" style="width: 200px;" id="fieldLabel-${window.formFieldCounter}">
                <select class="form-select form-select-sm d-inline-block ms-2" style="width: 150px;" id="fieldType-${window.formFieldCounter}">
                    <option>Text Input</option>
                    <option>Email</option>
                    <option>Number</option>
                    <option>Date</option>
                    <option>Dropdown</option>
                    <option>Checkbox</option>
                    <option>Radio Button</option>
                    <option>Text Area</option>
                </select>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFormField(${window.formFieldCounter})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    fieldList.innerHTML += fieldHTML;
}

function removeFormField(id) {
    const field = document.getElementById(`field-${id}`);
    if (field) {
        field.remove();
    }
}

function generateForm() {
    const title = document.getElementById('formTitle').value;
    const description = document.getElementById('formDescription').value;
    const type = document.getElementById('formType').value;
    
    if (!title) {
        showAlert('Please enter a form title!', 'warning');
        return;
    }
    
    let formHTML = `
        <div class="mb-4">
            <h5>${title}</h5>
            <p class="text-muted">${description}</p>
        </div>
        <form>
    `;
    
    // Get all fields
    const fieldItems = document.querySelectorAll('.field-item');
    fieldItems.forEach((item, index) => {
        const label = item.querySelector('[id^="fieldLabel-"]').value || `Field ${index + 1}`;
        const fieldType = item.querySelector('[id^="fieldType-"]').value;
        
        formHTML += `<div class="form-field mb-3">`;
        formHTML += `<label class="form-label">${label}</label>`;
        
        switch(fieldType) {
            case 'Text Input':
                formHTML += `<input type="text" class="form-control" placeholder="Enter ${label}">`;
                break;
            case 'Email':
                formHTML += `<input type="email" class="form-control" placeholder="Enter email">`;
                break;
            case 'Number':
                formHTML += `<input type="number" class="form-control" placeholder="Enter number">`;
                break;
            case 'Date':
                formHTML += `<input type="date" class="form-control">`;
                break;
            case 'Dropdown':
                formHTML += `<select class="form-select"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>`;
                break;
            case 'Checkbox':
                formHTML += `<div class="form-check"><input type="checkbox" class="form-check-input"><label class="form-check-label">Option</label></div>`;
                break;
            case 'Radio Button':
                formHTML += `<div class="form-check"><input type="radio" class="form-check-input" name="${label}"><label class="form-check-label">Option 1</label></div>
                           <div class="form-check"><input type="radio" class="form-check-input" name="${label}"><label class="form-check-label">Option 2</label></div>`;
                break;
            case 'Text Area':
                formHTML += `<textarea class="form-control" rows="3" placeholder="Enter ${label}"></textarea>`;
                break;
        }
        
        formHTML += `</div>`;
    });
    
    formHTML += `
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
    
    document.getElementById('formPreview').innerHTML = formHTML;
    document.getElementById('formOutput').style.display = 'block';
    document.getElementById('formOutput').classList.add('fade-in');
    
    showAlert('Form generated successfully!', 'success');
}

function publishForm() {
    showAlert('Form publishing feature will be implemented with backend integration.', 'info');
}

function shareFormLink() {
    const link = `https://datautosys.example.com/forms/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(link).then(() => {
        showAlert(`Form link copied: ${link}`, 'success');
    });
}

// Alert Function
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
}

// Active Nav Link on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all feature cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .card');
    cards.forEach(card => observer.observe(card));
});
