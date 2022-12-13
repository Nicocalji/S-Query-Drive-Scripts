function fetch(module, payload) {
  try {
    const res = UrlFetchApp.fetch(`${env().urlModulos}/${module}_${env().entorno}`, {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    });
    return JSON.parse(res.getContentText());
  } catch (err) {
    console.log(err);
  }
}

const env = () => {
  const paramsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Parametros Tecnicos");
  return {
    urlModulos: paramsSheet.getRange("E2").getValue(),
    aliasEmpresa: paramsSheet.getRange("A2").getValue(),
    numeroAgente: paramsSheet.getRange("C2").getValue(),
    servicio: paramsSheet.getRange("G2").getValue(),
    entorno: paramsSheet.getRange("I2").getValue(),
    modulos: {
      operadora: paramsSheet.getRange("L2").getValue(),
      gestion_cita: paramsSheet.getRange("L3").getValue(),
      buzon: paramsSheet.getRange("L4").getValue(),
    },
    prefijoEmail: paramsSheet.getRange("N2").getValue()
  }
};

function alert(msg) {
  SpreadsheetApp.getUi().alert(msg);
}
