import { showToast } from './main.js';

// Função para validar o formulário de contato
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.get('name')) {
        errors.push('Nome é obrigatório');
    }
    
    if (!formData.get('email')) {
        errors.push('Email é obrigatório');
    } else if (!isValidEmail(formData.get('email'))) {
        errors.push('Email inválido');
    }
    
    if (!formData.get('message')) {
        errors.push('Mensagem é obrigatória');
    }
    
    return errors;
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para salvar mensagem no localStorage
function saveMessage(formData) {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMessage = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        date: new Date().toISOString()
    };
    
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    return newMessage;
}

// Função principal para lidar com o formulário de contato
export function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const errors = validateContactForm(formData);
    
    if (errors.length > 0) {
        showToast(errors.join('<br>'), 'danger');
        return;
    }
    
    try {
        const message = saveMessage(formData);
        showToast('Mensagem enviada com sucesso!', 'success');
        e.target.reset();
    } catch (error) {
        showToast('Erro ao enviar mensagem', 'danger');
    }
}
