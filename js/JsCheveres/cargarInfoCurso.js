const gradoCurso = document.querySelector(`.gradoCurso`);
const nombreCurso = document.querySelector(`.nombreCurso`);
const listaEstudiantes = document.querySelector(`.listaEstudiantes`);
const listaActividades = document.querySelector(`#accordionExample`);

function restoreIdFromLocalStorage() {
  // Traer la informacion de la lista del localstorage y ponerla de vuelta.
  const idLs = JSON.parse(localStorage.getItem(`idCursoSeleccionado`));
  if (idLs.length) {
    return idLs;
  }
}
// Trae el id del curso seleccionado
const id = restoreIdFromLocalStorage();

function htmlEstudiante(nombre, codigo) {
  const li = document.createElement(`li`);
  li.classList.add('list-group-item');
  li.innerHTML = `
  <div class="row w-100 d-flex justify-content-between align-items-center">
   <div class="col-sm-6">
     <a href="cuaderno.html" class="mr-2">${codigo}</a>
     <a href="cuaderno.html">${nombre}</a>
   </div>
   <div class="col-sm-6 col-lg-5 col-xl-4 align-items-center offset-xl-2 offset-lg-1">
     <div class="row mt-3 mt-md-0">
       <div class="col-1" data-toggle="modal" data-target="#modal-estudiante">
         <button type="button" class="btn btn-light"><i class="fas fa-pencil-alt"></i></button>
       </div>
       <div class="col offset-1">
         <div class="input-group">
           <div class="input-group-prepend">
             <button class="btn btn-primary text-white-50" type="button"
               id="inputGroupFileAddon01">
               <i class="fas fa-upload" aria-hidden="true"></i>
             </button>
           </div>
           <div class="custom-file">
             <input type="file" class="custom-file-input" id="inputGroupFile01"
               aria-describedby="inputGroupFileAddon01">
             <label class="custom-file-label" for="inputGroupFile01"
               data-browse="Buscar">Entrega</label>
           </div>
         </div>
       </div>
     </div>
     </div>
    </div>`;

  return li;
}

function htmlActividad(idAct, nombre, descripcion, qr) {
  const div = document.createElement(`div`);
  div.classList.add(`card`);
  div.innerHTML = `
  <div class="card-header align-items-center" id="heading${idAct}">
    <div class="row">
      <div class="col-8 col-sm-6">
        <button class="btn stretched-link" type="button" data-toggle="collapse"
          data-target="#actividad${idAct}" aria-expanded="false" aria-controls="collapseOne">
          ${nombre}
        </button>
      </div>
      <div class="col-1 offset-2 col-sm-6 offset-sm-0" style="text-align: right;">
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
  </div>

  <div id="actividad${idAct}" class="collapse show" aria-labelledby="heading${idAct}"
    data-parent="#accordionExample">
    <div class="card-body row">
      <div class="col-md-8">
        ${descripcion}
      </div>
      <img class="imgQr" src="data:image/png;base64,${
        qr.image_base64
      }" alt="" width="100px" height="100px">
    </div>
  </div>`;
  return div;
}

async function loadCourse() {
  await fetch(`http://127.0.0.1:8000/materias/${id}`)
    .then(res => res.json())
    .then(data => {
      gradoCurso.textContent = data.grado;
      nombreCurso.textContent = data.nombre;
      console.log(data.cuadernos);
      data.cuadernos.forEach(element => {
        fetch(element.estudiante)
          .then(res => res.json())
          .then(dataEstudiante => {
            listaEstudiantes.insertAdjacentElement(
              `beforeend`,
              htmlEstudiante(dataEstudiante.nombre, dataEstudiante.codigo)
            );
          });
      });
      data.actividades.forEach(dataActividad => {
        console.log(dataActividad);
        listaActividades.insertAdjacentElement(
          `beforeend`,
          htmlActividad(
            dataActividad.id,
            dataActividad.nombre,
            dataActividad.descripcion,
            JSON.parse(dataActividad.qr)
          )
        );
      });
    });
}

loadCourse();
