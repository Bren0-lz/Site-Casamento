# 💍 Save the Date - Casamento Serverless

![Project Status](https://img.shields.io/badge/status-concluído-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Frontend](https://img.shields.io/badge/frontend-HTML5%20%7C%20CSS3%20%7C%20JS-orange)
![Backend](https://img.shields.io/badge/backend-Google%20Apps%20Script-green)
![Cost](https://img.shields.io/badge/hosting-custo%20zero-success)

> **[Clique aqui para ver a Demo Online](https://bren0-lz.github.io/Site-Casamento/)**

Uma aplicação Web moderna e responsiva para gestão de casamentos. O projeto elimina custos de infraestrutura utilizando uma arquitetura **Serverless** baseada no ecossistema Google, garantindo alta disponibilidade e persistência de dados em tempo real.

---

## Screenshots



## Destaques de Engenharia

Este não é apenas um site estático. O projeto resolve desafios reais de negócio com soluções técnicas otimizadas:

* **Arquitetura Serverless de Custo Zero:** Backend construído com Google Apps Script (GAS) e Google Sheets como Banco de Dados. Isso elimina custos mensais de hospedagem (AWS/Heroku) e manutenção de servidores.
* **Segurança no Frontend:** Implementação de **Tokenização de API**. O Backend valida um token enviado pelo cliente, rejeitando requisições diretas não autorizadas (API Spam).
* **Performance Nativa:**
    * Uso de **Intersection Observer API** para animações de scroll (Scroll Reveal) sem impactar a thread principal.
    * Sanitização de Inputs com **Regex** puro (sem bibliotecas pesadas) para máscaras de telefone.
* **Separação de Ambientes:** Estrutura configurada para suportar ambiente de Desenvolvimento (GitHub Pages + Base de Teste) e Produção (Vercel + Base Real) através de arquivos de configuração isolados.

## Tecnologias Utilizadas

### Frontend (Client-Side)
* **HTML5 Semântico**: Estrutura acessível e otimizada para SEO (Open Graph Protocol).
* **CSS3 Moderno**: CSS Grid, Flexbox, Variáveis CSS (`:root`) e Media Queries para design responsivo.
* **JavaScript (ES6+)**:
    * `Fetch API` para comunicação assíncrona com o Backend.
    * `Clipboard API` para funcionalidade de "Copiar Pix".
    * `IntersectionObserver` para performance de animações.

### Backend (Server-Side)
* **Google Apps Script**: Atua como API Gateway e Controller, recebendo requisições `POST` e tratando erros.
* **Google Sheets**: Persistência de dados (RSVP).

---

## Como Configurar o Projeto

Para rodar este projeto com sua própria planilha, siga os passos de arquitetura:

### 1. Configuração do Backend (Google Sheets)
1.  Crie uma nova planilha no [Google Sheets](https://sheets.new).
2.  Renomeie a aba inferior para **"Página1"**.
3.  Na linha 1 (cabeçalho), adicione as colunas: `Data`, `Nome`, `Telefone`, `Convidados`.
4.  Vá em **Extensões > Apps Script**.
5.  Cole o código do arquivo `backend/code.gs` (disponível na pasta `docs` deste repositório).
6.  Clique em **Implantar > Nova Implantação**.
    * Tipo: **App da Web**.
    * Quem pode acessar: **Qualquer pessoa**.
7.  Copie a URL gerada (terminada em `/exec`).

### 2. Configuração do Frontend
1.  Clone este repositório:
    ```bash
    git clone [https://github.com/Bren0-lz/Site-Casamento.git](https://github.com/Bren0-lz/Site-Casamento.git)
    ```
2.  Navegue até a pasta `docs/`.
3.  Abra (ou crie) o arquivo `config.js` e configure suas variáveis de ambiente:
    ```javascript
    const Config = {
        scriptURL: "SUA_URL_DO_APPS_SCRIPT_AQUI",
        pixKey: "SUA_CHAVE_PIX",
        apiToken: "CRIE_UMA_SENHA_SEGURA" // Deve ser igual à variável no Apps Script
    };
    ```

## Estrutura de Diretórios

O projeto segue uma estrutura limpa, isolando o código-fonte do frontend na pasta `/docs` para compatibilidade nativa com o deploy do **GitHub Pages**.

```bash
/
├── docs/                  # Código Fonte do Frontend (Application Entry Point)
│   ├── index.html         # Estrutura Semântica, SEO e Meta Tags Open Graph
│   ├── style.css          # Estilização Global, Variáveis (:root) e Media Queries
│   ├── script.js          # Controller Client-Side (Lógica de RSVP, Máscaras e DOM)
│   └── config.js          # Gerenciamento de Variáveis de Ambiente e Tokens de API
├── .gitignore             # Definição de arquivos ignorados pelo versionamento
└── README.md              # Documentação técnica e guia de instalação
```

## Autor

**Breno Luiz**
* [LinkedIn](## Autor

**Breno Luiz**
* [LinkedIn](https://www.linkedin.com/in/breno-luiz-silva-do-carmo-19451a243/)
* [GitHub](https://github.com/Bren0-lz))
* [GitHub](https://github.com/Bren0-lz)
