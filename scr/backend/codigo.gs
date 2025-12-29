// Função que recebe os dados
function handleRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // 1. Abre a planilha (Certifique-se que a aba se chama 'Página1')
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Página1");

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({
          result: "error",
          message: "Aba Página1 não encontrada",
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Pega os parâmetros (verifica se veio pelo navegador ou formulário)
    var p = e.parameter;
    var dataHora = new Date();
    // Se o parâmetro não existir, salva como vazio ""
    var nome = p.nome || "";
    var telefone = p.telefone || "";
    var convidados = p.convidados || "";

    // 3. Salva na planilha
    sheet.appendRow([dataHora, nome, telefone, convidados]);

    // 4. Retorna sucesso
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: sheet.getLastRow() })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Redireciona o POST (Formulário) para a função principal
function doPost(e) {
  return handleRequest(e);
}

// Redireciona o GET (Navegador) para a função principal
function doGet(e) {
  return handleRequest(e);
}
