import axios from 'axios';

const form = document.querySelector('.form');

const sendEmail = (formData) => {
  axios({
    method: 'post',
    url: 'mailer.php',
    data: formData,
  })
    .then(function (response) {
      alert('Email has been sent successfully');
      console.log(`Email has been sent successfully: ${response}`);
    })
    .catch(function (error) {
      alert('There was a problem with sending email');
      console.log(`There was a problem with sending email: ${error}`);
    });
}

const handleMailer = (e) => {
  e.preventDefault();

  const fields = [].slice.call(document.querySelectorAll('.field__input'));

  if (!form.checkValidity()) {
    console.log('Form fields are empty');
  } else {

    const formData = {
      name: fields[0].value,
      phone: fields[1].value,
      subject: fields[2].value,
      message: fields[3].value,
    }

    sendEmail(formData);
  }



};

form.addEventListener('submit', handleMailer);
