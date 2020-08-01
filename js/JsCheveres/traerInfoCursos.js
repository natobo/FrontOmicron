// Obtenga el primer elemento del documento con la clase="container":
const contenedorCursos = document.querySelector(`[name="cursos"]`);
// Arreglo de colores que tiene bootstrap;
const arregloColores = [
  `primary`,
  `success`,
  `info`,
  `warning`,
  `danger`,
  `secondary`,
  `light`,
  `dark`,
];
// Crea el html para una card de un curso
function generateCourseCard(nombreCurso, gradoCurso, colorCurso, idCurso) {
  return `<a href="http://localhost:3000/infoCurso.html">
           <div class="col-lg-3 mb-4">
             <div class="card bg-${colorCurso} text-white shadow curso" value="${idCurso}">
               <div class="card-body" >
                 ${gradoCurso}
               <div class="text-white-50 small">${nombreCurso}</div>
               </div>
           </div>
          </div>
         </a>`;
}
// Cargue todo los contenidos e ubiquelos en las cartas de los cursos
async function loadCourses() {
  await fetch('http://127.0.0.1:8000/materias')
    .then(res => res.json())
    .then(data => {
      let rta = ``;
      data.forEach(curso => {
        rta += generateCourseCard(
          curso.nombre,
          curso.grado,
          arregloColores[curso.color],
          curso.id
        );
      });
      contenedorCursos.innerHTML = rta;
    });
}

function pasarIdToLocalStorage(id) {
  console.info(id);
  // localStorage es solo texto
  localStorage.setItem(`idCursoSeleccionado`, JSON.stringify(id));
}

function handleClickCard(e) {
  pasarIdToLocalStorage($(e.currentTarget).attr('value'));
}

function handleClicksOnCards() {
  let cardscursos = ``;
  cardscursos = document.querySelectorAll(`.curso`);
  cardscursos.forEach(card => {
    card.addEventListener(`click`, handleClickCard);
  });
}

loadCourses().then(handleClicksOnCards);
