
// Для ссылки "Как это работает"
document.querySelector('a[href="#work"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
});

// Для ссылки "Что внутри"
document.querySelector('a[href="#more"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#more').scrollIntoView({ behavior: 'smooth' });
});

// Для ссылки "Партнеры"
document.querySelector('a[href="#partner"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#partner').scrollIntoView({ behavior: 'smooth' });
});
  document.querySelector('.hero-cta').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#brief').scrollIntoView({ behavior: 'smooth' });
  });
  document.querySelector('.hero-cta-header').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#brief').scrollIntoView({ behavior: 'smooth' });
  });


 document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#top').scrollIntoView({ behavior: 'smooth' });
  });

  // Маска для телефона (минимальный пример)
  
//   // Обработка отправки (заглушка — сюда вставим Telegram)
//   document.getElementById('briefForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     alert("Форма отправлена! (пока без Telegram)");
//     // Здесь будет отправка в Telegram
//   });



// document.querySelectorAll('.select-multiple').forEach(select => {
//     select.addEventListener('mousedown', function (e) {
//         e.preventDefault();
//         const option = e.target;
//         if (option.tagName === 'OPTION') {
//             option.selected = !option.selected;
//             const event = new Event('change', {bubbles: true});
//             select.dispatchEvent(event);
//         }
//      });
// });


var element = document.getElementById('phone');
var maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false,
    
}
var mask = new IMask(element, maskOptions);


  const form = document.querySelector('.brief-form');
  const industry = document.getElementById('industry');
  const routine = document.getElementById('routine');
  const dialog = document.getElementById('contactDialog');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isIndustryValid = industry.value !== '';
   

    if (isIndustryValid) {
      dialog.showModal();
    } else {
      // Простая подсветка ошибки
      if (!isIndustryValid) industry.classList.add('error');
      if (!isRoutineValid) routine.classList.add('error');
    }
  });

document.getElementById("contactSubform").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const industry = document.getElementById("industry").value.trim();
  const routine = document.getElementById("routine").value.trim();

  const data = { name, email, phone, industry, routine };

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Спасибо! Мы свяжемся с вами в течение 24 часов.");
      document.getElementById("contactSubform").reset();
    } else {
      alert("Ошибка отправки. Попробуйте позже.");
    }
  } catch (err) {
    alert("Ошибка соединения с сервером.");
  }
});
