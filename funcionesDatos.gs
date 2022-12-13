function saveParamsGenerales({ datos, aliasEmpresa, numeroAgente, servicio, modulos, prefijoEmail }) {
  fetch("registros", {
    "parametros": {
      "nombreEmpresa": datos[0],
      "prefijo": datos[1],
      "nombreAgente": datos[2],
      "sexo": String(datos[3]),
      "enviarEmails": datos[4],
      "emailsPorDefecto": datos[5].split(",").map((email) => email.trim()),
      "usarWebServices": datos[6],
      "urlWebServices": datos[7],
      "grabarLlamada": datos[8],
      "aliasEmpresa": aliasEmpresa,
      "numeroAgente": numeroAgente,
      "servicioEntrada": servicio,
      "modulos": modulos,
      "prefijoEmail": prefijoEmail,
    },
    tag: "insertParametros"
  });
}

function saveIdentificacion({ datos, aliasEmpresa, numeroAgente }) {
  fetch("registros", {
    parametros: {
      pedirNombre: datos[0],
      pedirDni: datos[1],
      pedirEmpresa: datos[2],
      confirmarNumero: datos[3],
      confirmarGestionPersonal: datos[4]
    },
    tag: "upsertParametrosIdentificar",
    empresa: aliasEmpresa,
    numeroAgente
  });
}

function saveParamsOperadora({ datos, aliasEmpresa, numeroAgente }) {
  fetch("registros", {
    tag: "upsertParamsOperadora",
    empresa: aliasEmpresa,
    numeroAgente,
    parametros: {
      dejarMensaje: datos[0],
      guardarContactos: datos[1],
      numeroSuplenteGeneral: datos[3]
    }
  });
}

function saveDepartamentos({ datos, cabeceras, aliasEmpresa, numeroAgente }) {
  datos.forEach((row) => {
    if (row.indexOf("") === -1) {
      const departamento = {};
      cabeceras.forEach((cabecera, ci) => {
        if (cabecera === "Alias") {
          departamento[cabecera] = row[ci].split(",").map((alias) => alias.trim());
        } else {
          departamento[cabecera] = row[ci];
        }
      });

      fetch("registros", {
        departamento,
        tag: "upsertDepartamento",
        empresa: aliasEmpresa,
        numeroAgente: numeroAgente
      });
    }
  });
}

function saveEmpleados({ datos, cabeceras, aliasEmpresa, numeroAgente, keyCol }) {
  const empleados = datos.map((row, ri) => {
    // TODO verify more information
    if (row[0] !== "" || row[1] !== "" || row[2] !== "") {
      const empleado = {};

      cabeceras.forEach((cabecera, ci) => {
        if (!(cabecera === "Nombre - Apellido Suplente 1" || cabecera === "Nombre - Apellido Suplente 2")) {
          empleado[cabecera] = row[ci];
        }
      });
      return empleado;
    }

  }).filter(empleado => empleado);

  const res = fetch("registros", {
    empleados,
    tag: "setEmpleados",
    empresa: aliasEmpresa,
    numeroAgente
  });
}

function saveParamsGestionCita({ datos, aliasEmpresa, numeroAgente }) {
  fetch("registros", {
    tag: "upsertParametrosGestion",
    empresa: aliasEmpresa,
    numeroAgente,
    parametros: {
      pedirFechaNueva: datos[0],
      presentarOpcionesCita: datos[1],
      pedirFechaCambio: datos[2]
    }
  });
}

function saveEspecialidades({ nombres, alias, aliasEmpresa, numeroAgente }) {
  fetch("registros", {
    especialidades: nombres.map((nombre, i) => { return { nombre: nombre[0], alias: alias[i][0].split(",").map(alias => alias.trim()) } }).filter(el => el.nombre !== ""),
    empresa: aliasEmpresa,
    numeroAgente: numeroAgente,
    tag: "insertEspecialidades",
  });
}

function saveParamsBuzon({ datos, aliasEmpresa, numeroAgente }) {
  fetch("registros", {
    parametros: {
      pedirOtrasConsultas: datos[0],
      pedirConsultaMedicamentos: datos[1]
    },
    empresa: aliasEmpresa,
    numeroAgente,
    tag: "upsertParametrosBuzon"
  });
}

function saveEmail({ datos, aliasEmpresa, numeroAgente }) {
  fetch("registros", {
    parametros: {
      tratoAlUsuario: datos[0],
    },
    empresa: aliasEmpresa,
    numeroAgente,
    tag: "upsertParametrosEmail"
  });
}
