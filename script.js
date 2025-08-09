let selectedGroup = null;
let selectedRole = null;

function selectGroup(group, element) {
  // Quitar activos anteriores
  document.querySelectorAll('.group-card').forEach(card => card.classList.remove('active'));
  element.classList.add('active');

  selectedGroup = group;

  // Habilitar grid de roles
  const rolesGrid = document.getElementById('rolesGrid');
  rolesGrid.classList.remove('disabled');

  // Mostrar badge
  const badge = document.getElementById('selectionBadge');
  const groupNames = {
    'servicios-generales': 'Servicios Generales',
    'servicios-integrales': 'Servicios Integrales'
  };
  badge.textContent = `Grupo seleccionado: ${groupNames[group]}`;
  badge.classList.add('show');

  // Reiniciar selección de rol/formulario
  document.querySelectorAll('.role-card').forEach(card => card.classList.remove('active'));
  selectedRole = null;
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('btnText').textContent = 'INICIAR SESIÓN';

  showNotification(`Grupo ${groupNames[group]} seleccionado`, 'info');
}

function selectRole(role, element) {
  if (!selectedGroup) {
    showNotification('Primero seleccione un grupo', 'error');
    return;
  }

  document.querySelectorAll('.role-card').forEach(card => card.classList.remove('active'));
  element.classList.add('active');

  selectedRole = role;

  const loginForm = document.getElementById('loginForm');
  loginForm.classList.add('active');

  const btnText = document.getElementById('btnText');
  const roleNames = {
    'agente': 'AGENTE',
    'supervisor': 'SUPERVISOR',
    'administrativo': 'ADMINISTRATIVO'
  };
  btnText.textContent = `ACCEDER COMO ${roleNames[role]}`;

  showNotification(`Rol ${roleNames[role]} seleccionado`, 'info');

  setTimeout(() => {
    loginForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function handleLogin(event) {
  event.preventDefault();

  if (!selectedGroup) {
    showNotification('Por favor, seleccione un grupo', 'error');
    return;
  }
  if (!selectedRole) {
    showNotification('Por favor, seleccione un rol', 'error');
    return;
  }

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    showNotification('Validando credenciales...', 'info');

    setTimeout(() => {
      const roleNames = { 'agente': 'Agente', 'supervisor': 'Supervisor', 'administrativo': 'Administrativo' };
      const groupNames = { 'servicios-generales': 'Servicios Generales', 'servicios-integrales': 'Servicios Integrales' };
      showNotification(`Bienvenido - ${groupNames[selectedGroup]} / ${roleNames[selectedRole]}`, 'success');

      // Ejemplo de redirección real por grupo/rol:
      // window.location.href = `/panel/${selectedGroup}/${selectedRole}`;
      console.log(`Redirigiendo a: /panel/${selectedGroup}/${selectedRole}`);
    }, 1500);
  }
}

function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.remove('success', 'error');
  if (type === 'success') notification.classList.add('success');
  else if (type === 'error') notification.classList.add('error');
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 3000);
}

// Animación de entrada para las tarjetas de rol + validaciones de campos
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.role-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });

  // Validaciones campo usuario
  const userInput = document.getElementById('username');
  if (userInput) {
    userInput.addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9._-]/g, '');
    });
  }

  // Seguridad campo contraseña
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('paste', (e) => {
      e.preventDefault();
      showNotification('Por seguridad, no se permite pegar en el campo de contraseña', 'error');
    });
  }
});
