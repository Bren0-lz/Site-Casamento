// 1. LÓGICA DO MENU MOBILE E NAVBAR
// Função para abrir/fechar o menu mobile
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
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
