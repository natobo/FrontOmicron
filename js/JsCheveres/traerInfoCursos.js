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
function generateCourseCard(nombreCurso, gradoCurso, colorCurso) {
  return `<div class="col-lg-3 mb-4">
            <div class="card bg-${colorCurso} text-white shadow">
               <div class="card-body">
                 ${gradoCurso}
               <div class="text-white-50 small">${nombreCurso}</div>
               </div>
           </div>
         </div>`;
}
// Cargue todo los contenidos e ubiquelos en las cartas de los cursos
function loadCourses() {
  fetch('http://127.0.0.1:8000/materias')
    .then(res => res.json())
    .then(data => {
      let rta = ``;
      data.forEach(curso => {
        rta += generateCourseCard(curso.nombre, ' ', arregloColores[0]);
      });
      contenedorCursos.innerHTML = rta;
    });
}
loadCourses();
