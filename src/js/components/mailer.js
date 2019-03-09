import axios from 'axios';

const form = document.querySelector('form');

const sendEmail = () => {
  axios({
    method: 'post',
    url: 'mailer.php',
    data: {
      textField: 'data from textField sent by AXIOS',
    },
  })
    .then(function (response) {
      alert(`Email has been sent successfully`);
      console.log(response);
    })
    .catch(function (error) {
      alert(`There was a problem with sending email`);
      console.log(error);
    });
}

const handleMailer = (e) => {
  e.preventDefault();

  if ( !form.checkValidity() ) {
    alert(`Field can't be empty`);
  } else {
    sendEmail();
  }

  

};

form.addEventListener('submit', handleMailer);
