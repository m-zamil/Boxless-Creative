/* Navbar Script */
document.getElementById('mobile-menu-toggle').onclick = function () {
  var navbar = document.querySelector('.navbar');
  var toggleButton = document.getElementById('mobile-menu-toggle');
  navbar.classList.toggle('open');
  toggleButton.classList.toggle('open');
};

/* Modal Script */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openModalBtns = document.querySelectorAll('.openModalBtn');
  const closeBtn = document.querySelector('.close-btn');
  const scheduleForm = document.getElementById('scheduleForm');
  const ctaBtn = document.getElementById('ctaBtn');
  const result = document.getElementById('result');

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.remove('fade-out');
      modal.querySelector('.modal-content').classList.remove('slide-out');
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  scheduleForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(scheduleForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = `<span>Please wait...</span>`;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = `<span class="success">${json.message} Redirecting... </span>`;

          setTimeout(() => {
            scheduleForm.style.display = 'none';
            ctaBtn.style.display = 'block';
            scheduleForm.classList.add('hidden');
            result.innerHTML = '';
          }, 1000);
        } else {
          console.log(response);
          result.innerHTML = `<span class="warning">${json.message}</span>`;
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = `<span class="warning"> 'Something went wrong!</span>`;
      })
      .then(function () {
        scheduleForm.reset();
      });
  });

  function closeModal() {
    modal.classList.add('fade-out');
    modal.querySelector('.modal-content').classList.add('slide-out');
    setTimeout(() => {
      modal.style.display = 'none';
      scheduleForm.style.display = 'block';
      if (scheduleForm.classList.contains('hidden')) {
        scheduleForm.classList.remove('hidden');
      }
      ctaBtn.style.display = 'none';
    }, 500);
  }
});
