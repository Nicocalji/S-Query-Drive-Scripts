function cargarLlamadas() {
  const registrosSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reporte llamadas");
  const registrosLlamadas = fetch("reportes", {
    tag: "obtenerLlamadas",
    aliasEmpresa: env().aliasEmpresa,
    numeroAgente: env().numeroAgente,
  });

  console.log(registrosLlamadas);

  registrosLlamadas?.forEach(({ metadatos, fechaLlamada, horaLlamada, tiempoLlamada, tipoAsitencia, tiempoEspera }, i) => {
    registrosSheet.getRange(`A${i + 2}:I${i + 2}`).setValues([[metadatos?.nombre, metadatos?.empresa, metadatos?.telefono, fechaLlamada, horaLlamada, metadatos?.empleadoContactado, tiempoLlamada, tiempoEspera, tipoAsitencia]]);
  });
}

function cargarContactos() {
  const registrosSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reporte Contactos");
  const registrosContactos = fetch("reportes", {
    tag: "obtenerContactos",
    empresa: env().aliasEmpresa,
    numeroAgente: env().numeroAgente
  });

  console.log(registrosContactos);

  registrosContactos?.forEach((contacto, i) => registrosSheet.getRange(`A${i + 2}:F${i + 2}`).setValues([[
    contacto.Empresa, contacto.Nombre, contacto.Apellido, contacto.Telefono, contacto["Día de autorización"], contacto["Hora de autorización"]
  ]]));
}
