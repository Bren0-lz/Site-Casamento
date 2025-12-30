//  NOTA DE ARQUITETURA E SEGURANÇA:
//
// Em aplicações de produção com Backend tradicional (Node/Python), credenciais
// sensíveis JAMAIS devem ser expostas no repositório (usaríamos .env).
//
// Porém, este projeto utiliza arquitetura Serverless/Static Site.
// Para que o navegador do usuário (Client-Side) consiga se comunicar com a API
// do Google Sheets, ele PRECISA ter acesso a estas chaves publicamente.
//
// A segurança é garantida no Backend (Google Apps Script) através da validação
// do 'apiToken' que rejeita requisições não autorizadas.

const Config = {
  // URL da sua API do Google Sheets
  scriptURL:
    "https://script.google.com/macros/s/AKfycbwDRvFktIaXgPqNkk_MiGLjL5Uoj9QYJiRSVlcwjWoShxy57nHmYnhmgFgtrdDfmSk-/exec",

  // Sua Chave PIX que vai aparecer no Modal
  pixKey: "22988372354",

  apiToken: "Casamento2025Seguro",
};
