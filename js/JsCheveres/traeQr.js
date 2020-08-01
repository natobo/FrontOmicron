// Obtenga el primera imagen
const imgQr = document.querySelector(`.imgQr`);

function createQr() {
  fetch('http://127.0.0.1:8000/actividades/createqr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'Juan',
    }),
  })
    .then(res => res.json())
    .then(data => {
      imgQr.src = `data:image/png;base64,${data.image_base64}`;
      console.log(data);
    });
}

createQr();
