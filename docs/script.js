// 1. LÓGICA DO MENU MOBILE E NAVBAR
// Função para abrir/fechar o menu mobile
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const menuIcon = document.querySelector(".mobile-menu-icon");
  const closeIcon = document.querySelector(".close-menu");

  // 1. Abre ou fecha o menu (slide)
  navLinks.classList.toggle("active");

  // 2. Lógica de Troca dos Botões
  // Se o menu acabou de abrir (tem a classe active):
  if (navLinks.classList.contains("active")) {
    menuIcon.style.display = "none"; // Esconde o Hambúrguer
    closeIcon.style.display = "block"; // Mostra o X
  } else {
    // Se o menu fechou:
    menuIcon.style.display = "block"; // Volta o Hambúrguer
    closeIcon.style.display = "none"; // Esconde o X
  }
}

// Efeito de fundo na Navbar ao rolar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    // Verde Oliva Escuro quase sólido
    navbar.style.backgroundColor = "rgba(40, 54, 24, 0.95)";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});

// 2. LÓGICA DO FORMULÁRIO (GOOGLE SHEETS)

const scriptURL = Config.scriptURL; // ADD O LINK DA SUA PLANILHA AQUI
const form = document.getElementById("rsvpForm");

// MÁSCARA DE TELEFONE (Input Mask)
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function (e) {
  // Se o tipo de entrada for "deletar para trás" (Backspace),
  // nós PARAMOS a função aqui e deixamos o navegador apagar nativamente.
  // Isso impede que a máscara "brigue" com o usuário tentando recolocar o hífen.
  if (e.inputType === "deleteContentBackward") {
    return;
  }

  // 2. LÓGICA PADRÃO DA MÁSCARA (Só roda se estiver DIGITANDO)
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (value.length > 10) {
    // Celular (11 dígitos)
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (value.length > 5) {
    // Fixo ou digitando (10 dígitos)
    value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (value.length > 2) {
    // Apenas DDD
    value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
  } else if (value.length > 0) {
    // Começo
    value = value.replace(/^(\d*)/, "($1");
  }

  e.target.value = value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede a página de recarregar

  const btn = form.querySelector("button");
  const originalText = btn.innerText;

  // Feedback visual
  btn.innerText = "Enviando...";
  btn.disabled = true;

  // Converte os dados para o formato que o Google Script aceita
  const data = new URLSearchParams(new FormData(form));

  // Adiciona o token de segurança
  data.append("token", Config.apiToken);

  fetch(scriptURL, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      // Passo 1: Transforma a resposta bruta em JSON
      return response.json();
    })
    .then((json) => {
      // Passo 2: Verifica o que o Google respondeu
      if (json.result === "success") {
        // SUCESSO REAL
        alert("Obrigado! Sua presença foi confirmada na nossa lista.");

        btn.innerText = "Confirmado!";
        btn.style.backgroundColor = "#4CAF50";
        form.reset();

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
          btn.disabled = false;
        }, 3000);
      } else {
        // O SERVIDOR RESPONDEU ERRO (Ex: Token inválido)
        throw new Error(json.message || "Erro desconhecido no servidor");
      }
    })
    .catch((error) => {
      console.error("Erro!", error.message);
      // Agora sim vai cair aqui se o token estiver errado!
      alert("Erro ao enviar: " + error.message);

      btn.innerText = "Tentar Novamente";
      btn.style.backgroundColor = "#d32f2f"; // Vermelho
      btn.disabled = false;

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
      }, 3000);
    });
});
// 3. LÓGICA DO MODAL DE PRESENTES

const modal = document.getElementById("giftModal");
const modalTitle = document.getElementById("modalTitle");

// --- ATENÇÃO: COLOQUE SUA CHAVE PIX REAL AQUI ---
const myPixKey = Config.pixKey;

// Função para abrir o modal
function openGiftModal(giftName) {
  // Mostra o modal
  modal.classList.add("modal-open");
  // Muda o título para o nome do presente clicado
  modalTitle.innerText = giftName;

  // Garante que a chave pix esteja correta no input
  document.getElementById("pixKey").value = myPixKey;

  // Trava a rolagem da página de trás
  document.body.style.overflow = "hidden";
}

// Função para fechar o modal
function closeGiftModal() {
  modal.classList.remove("modal-open");
  document.body.style.overflow = "auto";
}

// Fecha o modal se clicar fora da caixinha branca
window.onclick = function (event) {
  if (event.target == modal) {
    closeGiftModal();
  }
};

// Função para copiar a chave PIX
function copyPix() {
  const copyText = document.getElementById("pixKey");
  const btn = document.querySelector(".btn-copy");

  // Tenta usar a API moderna de clipboard
  navigator.clipboard
    .writeText(copyText.value)
    .then(() => {
      // Feedback visual no botão
      const originalText = btn.innerHTML;
      btn.innerHTML =
        '<span class="material-icons" style="font-size: 16px;">check</span> Copiado!';
      btn.style.backgroundColor = "#4CAF50"; // Verde

      // Volta o botão ao normal depois de 2 segundos
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar", err);
      // Fallback (método antigo) caso o navegador não suporte a API nova
      copyText.select();
      document.execCommand("copy");
      alert("Chave copiada!");
    });
}

// SCROLL REVEAL (Intersection Observer API)
// 1. Configuração do Observador
const observerOptions = {
  root: null, // null = viewport (janela do navegador)
  rootMargin: "0px", // margem extra
  threshold: 0.1, // 10% do elemento precisa estar visível para disparar
};

// 2. Cria o Observador (Modo Repetição Infinita)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Se o elemento entrou na tela
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
    // Se o elemento SAIU da tela
    else {
      entry.target.classList.remove("active"); // Remove a classe para animar de novo depois
    }
  });
}, observerOptions);

// 3. Seleciona automaticamente os elementos que queremos animar
const elementsToAnimate = document.querySelectorAll(
  ".section-title, .card, .gift-card, .story-container, .rsvp-form, .bible-quote"
);

// 4. Conecta os elementos ao observador
elementsToAnimate.forEach((el) => {
  el.classList.add("reveal"); // Adiciona a classe CSS inicial (invisível)
  observer.observe(el); // Manda o observador vigiar
});
