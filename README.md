# 💍 Site para Casamento 💍

![Project Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Frontend](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JS-orange)
![Backend](https://img.shields.io/badge/backend-Google%20Apps%20Script-green)

> Uma Landing Page moderna, responsiva e serverless para confirmação de presença em casamentos e lista de presentes virtual.

---

## Projeto em Desenvolvimento

Este projeto está atualmente em fase de **desenvolvimento ativo**. As funcionalidades principais (RSVP e Lista de Presentes) já estão operacionais, mas melhorias de UI/UX e refatoração de código podem ocorrer.

## Sobre o Projeto

Este projeto foi desenvolvido como uma solução digital completa para convites de casamento. O objetivo principal foi criar uma interface elegante e funcional que eliminasse a necessidade de confirmações manuais por telefone ou listas de presentes físicas.

A arquitetura se destaca por ser **Serverless** (sem servidor dedicado), utilizando o ecossistema do Google como Backend e Banco de Dados, garantindo custo zero de hospedagem e alta disponibilidade.

## Funcionalidades

* **Design Responsivo (Mobile First):** Layout fluido utilizando CSS Grid e Flexbox, adaptável a qualquer tamanho de tela.
* **RSVP Integrado:** Formulário de confirmação de presença que salva os dados automaticamente em uma planilha do Google Sheets.
* **Lista de Presentes Virtual:** Sistema de "Cotas Virtuais" onde os convidados selecionam experiências (ex: Jantar, Lua de Mel) e recebem a chave PIX via Modal.
* **Copiar/Colar PIX:** Funcionalidade JavaScript moderna (`Clipboard API`) para facilitar o pagamento.
* **Mapas e Informações:** Integração visual com links para localização da cerimônia e recepção.
* **Validação de Formulário:** Feedback visual de carregamento e sucesso/erro no envio dos dados.

## Tecnologias Utilizadas

### Frontend
* **HTML5 Semântico**: Estrutura acessível e organizada.
* **CSS3 Moderno**: Uso de Variáveis (`:root`), Grid Layout, Flexbox e Animações (`keyframes`).
* **JavaScript (ES6+)**: Manipulação de DOM, `fetch API` para requisições assíncronas e `URLSearchParams`.

### Backend & Integração
* **Google Apps Script**: Atua como API Gateway, recebendo requisições `POST` do site.
* **Google Sheets**: Atua como Banco de Dados relacional simples.

---

## Como Configurar o Backend (Google Sheets)

Para que o formulário funcione no seu clone do projeto, siga estes passos:

1.  Crie uma nova planilha no [Google Sheets](https://sheets.new).
2.  Renomeie a aba inferior para **"Página1"**.
3.  Na linha 1 (cabeçalho), adicione as colunas: `Data`, `Nome`, `Telefone`, `Convidados`.
4.  Vá em **Extensões > Apps Script**.
5.  Cole o código do arquivo `backend/code.gs` (disponível neste repositório).
6.  Clique em **Implantar > Nova Implantação**.
    * Tipo: **App da Web**.
    * Quem pode acessar: **Qualquer pessoa**.
7.  Copie a URL gerada (terminada em `/exec`).
8.  No arquivo `script.js` do projeto, substitua a variável `scriptURL` pela sua nova URL.

```javascript
const scriptURL = "[https://script.google.com/macros/s/SUA_URL_AQUI/exec]";
```

## Como Rodar Localmente
  Pré-requisitos: Navegador atualizado.
  ```
  # Clone este repositório
  $ git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)

  # Acesse a pasta do projeto
  $ cd NOME_DO_REPO

  # Abrir diretamente
  Abra o arquivo index.html no seu navegador.
```

## Autor
* **Breno Luiz** - [Bren0-lz](https://github.com/Bren0-lz)
