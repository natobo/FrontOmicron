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
// RECORDAR EL ASYNC MANO
function loadCourses() {
  // const res = await fetch('http://localhost:4000/creators');
  // const creators = await res.json();
  const jsonPrueba = [
    {
      id: 1,
      nombre: `Matematicas`,
      grado: `6a`,
      color: arregloColores[0],
    },
    {
      id: 2,
      nombre: `Español`,
      grado: `2c`,
      color: arregloColores[1],
    },

    {
      id: 3,
      nombre: `Sociales`,
      grado: `3a`,
      color: arregloColores[2],
    },

    {
      id: 4,
      nombre: `Ética`,
      grado: `4d`,
      color: arregloColores[3],
    },

    {
      id: 5,
      nombre: `Física`,
      grado: `5d`,
      color: arregloColores[4],
    },

    {
      id: 6,
      nombre: `Biología`,
      grado: `3a`,
      color: arregloColores[5],
    },
  ];
  console.log(jsonPrueba);
  // Obtenga el primer elemento del documento con la clase="container":
  const contenedorCursos = document.querySelector(`[name="cursos"]`);
  console.log(contenedorCursos);
  // Itere y cree las cartas y los contenedores
  let rta = ``;
  console.log(`antes${rta}`);
  jsonPrueba.forEach(curso => {
    rta += generateCourseCard(curso.nombre, curso.grado, curso.color);
  });
  console.log(`despues${rta}`);
  contenedorCursos.innerHTML = rta;
}

console.log(loadCourses());
