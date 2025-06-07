// Credenciais de admin (hardcoded)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '123456'
};

// Função para verificar login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Mostrar dashboard e ocultar login
        document.getElementById('loginSection').classList.add('d-none');
        document.getElementById('dashboardSection').classList.remove('d-none');
        
        // Carregar dados
        loadBookings();
        loadMessages();
    } else {
        alert('Credenciais inválidas!');
    }
});

// Função para carregar agendamentos
function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingsList = document.getElementById('bookingsList');
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="text-muted">Nenhum agendamento encontrado.</p>';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${booking.name}</h5>
                <p class="card-text">
                    <strong>Data:</strong> ${new Date(booking.date).toLocaleDateString('pt-BR')}<br>
                    <strong>Horário:</strong> ${booking.time}<br>
                    <strong>Status:</strong> 
                    <span class="badge bg-${booking.status === 'pending' ? 'warning' : 'success'}">
                        ${booking.status === 'pending' ? 'Pendente' : 'Confirmado'}
                    </span>
                </p>
                <div class="btn-group">
                    <button class="btn btn-${booking.status === 'pending' ? 'success' : 'warning'} btn-sm" 
                            onclick="toggleBookingStatus(${booking.id})">
                        ${booking.status === 'pending' ? 'Confirmar' : 'Pendente'}
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBooking(${booking.id})">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para carregar mensagens
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const messagesList = document.getElementById('messagesList');
    
    if (messages.length === 0) {
        messagesList.innerHTML = '<p class="text-muted">Nenhuma mensagem encontrada.</p>';
        return;
    }
    
    messagesList.innerHTML = messages.map(message => `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${message.name}</h5>
                <p class="card-text">
                    <strong>Email:</strong> ${message.email}<br>
                    <strong>Data:</strong> ${new Date(message.date).toLocaleString('pt-BR')}<br>
                    <strong>Mensagem:</strong><br>
                    ${message.message}
                </p>
            </div>
        </div>
    `).join('');
}

// Função para alternar status do agendamento
window.toggleBookingStatus = function(bookingId) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = booking.status === 'pending' ? 'confirmed' : 'pending';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
    }
};

// Função para excluir agendamento
window.deleteBooking = function(bookingId) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedBookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        loadBookings();
    }
};
