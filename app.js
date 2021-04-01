require('colors');

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listarTareasCheck } = require('./helpers/inquirer');
const { saveData, leerData } = require('./helpers/saveFile');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';

  const tareas = new Tareas();

  const tareasData = leerData();

  if (tareasData) {
    tareas.cargarTareasFromArray(tareasData)
  }
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listadoCompletadasPendientes();
        break;
      case '4':
        tareas.listadoCompletadasPendientes(false);
        break;
      case '5':
        const ids = await listarTareasCheck(tareas.listado);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listado);
        if (id !== '0') {
          const ok = await confirmar(`¿Esta seguro de que desea borrar el id: ${id}?`);
          if (ok) {
            tareas.borrarTarea(id);
            console.log(`Tarea con id:${id} borrada correctamente.`);
          }
        }
        break;
    }

    saveData(tareas.listado);

    await pausa();


  } while (opt !== '0');

}

main();