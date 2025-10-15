const openDialogBtn = document.getElementById('openDialog');
const contactDialog = document.getElementById('contactDialog');
const closeDialogBtn = document.getElementById('closeDialog');
const contactForm = document.getElementById('contactForm');
let lastActiveElement = null;

if (openDialogBtn && contactDialog) {
  openDialogBtn.addEventListener('click', () => {
    lastActiveElement = document.activeElement;
    contactDialog.showModal();
    contactDialog.querySelector('input, select, textarea')?.focus();
  });
}

if (closeDialogBtn && contactDialog) {
  closeDialogBtn.addEventListener('click', () => {
    contactDialog.close('cancel');
  });
}

if (contactDialog) {
  contactDialog.addEventListener('close', () => {
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    [...contactForm.elements].forEach(el => {
      if (typeof el.setCustomValidity === 'function') {
        el.setCustomValidity('');
      }
    });

    if (!contactForm.checkValidity()) {
      e.preventDefault();
      const email = contactForm.elements.email;
      if (email && email.validity.typeMismatch) {
        email.setCustomValidity('Введите корректный e-mail, например bendy@joeydrew.com');
      }
      contactForm.reportValidity();
      [...contactForm.elements].forEach(el => {
        if (el.willValidate) {
          el.toggleAttribute('aria-invalid', !el.checkValidity());
        }
      });
      return;
    }

    e.preventDefault();
    alert('Сообщение отправлено в архив студии. Ожидайте звонка от Бенди...');
    contactForm.reset();
    contactDialog.close('success');
  });
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
    let formatted = '';
    if (value.length > 0) formatted += '+7';
    if (value.length > 1) formatted += `(${value.slice(1, 4)}`;
    if (value.length >= 4) formatted += ')';
    if (value.length >= 5) formatted += ` ${value.slice(4, 7)}`;
    if (value.length >= 8) formatted += `-${value.slice(7, 9)}`;
    if (value.length >= 10) formatted += `-${value.slice(9, 11)}`;
    phoneInput.value = formatted;
  });
  phoneInput.setAttribute('pattern', '^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$');
}