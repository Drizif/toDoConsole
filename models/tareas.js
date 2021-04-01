const Tarea = require('./tarea');
const moment = require('moment');

class Tareas {

  get listado() {
    const listado = [];

    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listado.forEach((task, i) => {
      let idx = `${i + 1}.`.green;
      const { desc, completadoEn } = task;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

      console.log(`${idx} ${desc} :: ${estado}.`);
    });
  }

  listadoCompletadasPendientes(completada = true) {
    console.log();
    let c = 0;

    this.listado.forEach((task) => {
      const { desc, completadoEn } = task;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

      if (completada) {
        if (completadoEn) {
          c++;
          console.log(`${(c + '.').green} ${desc}. :: ${completadoEn.green}`);
        }
      } else {
        if (!completadoEn) {
          c++;
          console.log(`${(c + '.').green} ${desc}. :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = moment(new Date()).format('DD/MM/YYYY | HH:mm:ss');
      }
    });

    this.listado.forEach(t => {
      if (!ids.includes(t.id)) {
        this._listado[t.id].completadoEn = null;
      }
    });
  }

}

module.exports = Tareas;