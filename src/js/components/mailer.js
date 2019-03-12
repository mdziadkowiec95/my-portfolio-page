import axios from 'axios';

const form = document.querySelector('.form');
const fields = [].slice.call(document.querySelectorAll('.field__input'));
const exam = document.getElementById('form-exam');


const sendEmail = (formData) => {

  axios({
    method: 'post',
    url: '_m_a_i_l_e_r.php',
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


  fields.forEach(field => field.value = ''); // clear fields
  exam.value = '';
}

const handleMailer = (e) => {
  e.preventDefault();

  const fields = [].slice.call(document.querySelectorAll('.field__input'));
  const examinationVal = exam.value;

  if (!form.checkValidity() || examinationVal !== '7') {
    console.log('Form fields are empty');
  } else {

    const formData = {
      name: fields[0].value,
      phone: fields[1].value,
      subject: fields[2].value,
      message: fields[3].value,
      exam: examinationVal,
    }

    sendEmail(formData, fields);
  }

};

form.addEventListener('submit', handleMailer);
