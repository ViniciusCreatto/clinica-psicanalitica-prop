import { showToast } from './main.js';

// Função para validar o formulário de agendamento
export function validateBookingForm(formData) {
    const errors = [];
    
    if (!formData.get('bookingName')) {
        errors.push('Nome é obrigatório');
    }
    
    if (!formData.get('bookingEmail')) {
        errors.push('Email é obrigatório');
    } else if (!isValidEmail(formData.get('bookingEmail'))) {
        errors.push('Email inválido');
    }
    
    if (!formData.get('bookingDate')) {
        errors.push('Data é obrigatória');
    }
    
    if (!formData.get('bookingTime')) {
        errors.push('Horário é obrigatório');
    }
    
    return errors;
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para salvar agendamento no localStorage
function saveBooking(formData) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
        id: Date.now(),
        name: formData.get('bookingName'),
        email: formData.get('bookingEmail'),
        date: formData.get('bookingDate'),
        time: formData.get('bookingTime'),
        status: 'pending'
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return newBooking;
}

// Função principal para lidar com o formulário de agendamento
export function handleBookingForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const errors = validateBookingForm(formData);
    
    if (errors.length > 0) {
        showToast(errors.join('<br>'), 'danger');
        return;
    }
    
    try {
        const booking = saveBooking(formData);
        showToast('Agendamento realizado com sucesso!', 'success');
        e.target.reset();
        
        // Fechando o modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
        if (modal) {
            modal.hide();
        }
    } catch (error) {
        showToast('Erro ao salvar agendamento', 'danger');
    }
}
