const getSheet = (sheetName) => SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

function main() {
  const { numeroAgente, aliasEmpresa, modulos, prefijoEmail, servicio } = env();
  saveParamsGenerales({
    datos: getSheet("Parametros Generales").getRange("A2:I2").getValues()[0],
    aliasEmpresa,
    numeroAgente,
    servicio,
    modulos,
    prefijoEmail
  });

  saveIdentificacion({
    datos: getSheet("Modulo Identificación").getRange("A2:E2").getValues()[0],
    numeroAgente,
    aliasEmpresa
  });

  saveParamsOperadora({
    datos: getSheet("Parametros Operadora").getRange("A2:D2").getValues()[0],
    numeroAgente,
    aliasEmpresa
  });

  saveDepartamentos({
    cabeceras: getSheet("Departamentos").getRange("A1:E1").getValues()[0],
    datos: getSheet("Departamentos").getRange("A2:E999").getValues(),
    numeroAgente,
    aliasEmpresa
  });

  saveEmpleados({
    cabeceras: getSheet("Empleados").getRange("A1:U1").getValues()[0],
    datos: getSheet("Empleados").getRange("A2:U1000").getValues(),
    keyCol: "V",
    numeroAgente,
    aliasEmpresa
  });

  saveParamsGestionCita({
    aliasEmpresa,
    numeroAgente,
    datos: getSheet("Parametros Gestión de Cita").getRange("A2:C2").getValues()[0]
  })

  saveEspecialidades({
    numeroAgente,
    aliasEmpresa,
    nombres: getSheet("Especialidades").getRange("A2:A1000").getValues(),
    alias: getSheet("Especialidades").getRange("B2:B1000").getValues(),
  });

  saveParamsBuzon({
    datos: getSheet("Parametros Buzón Avanzado").getRange("A2:B2").getValues()[0],
    numeroAgente,
    aliasEmpresa
  })

  saveEmail({
    datos: getSheet("Modulo Email").getRange("A2:A2").getValues()[0],
    numeroAgente,
    aliasEmpresa
  })

  alert("Todos los cambios se han guardado!");
}
