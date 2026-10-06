/* =====================================
   MENU MOBILE
===================================== */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
});


/* Fecha o menu quando um link é clicado */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });

});


/* =====================================
   CONTADOR DE DENÚNCIAS
===================================== */

function atualizarContador() {

    const denuncias =
        JSON.parse(localStorage.getItem("denuncias")) || [];

    const contador =
        document.getElementById("denunciaCount");

    contador.textContent = denuncias.length;
}

atualizarContador();


/* =====================================
   FORMULÁRIO DE DENÚNCIA
===================================== */

const form =
    document.getElementById("denunciaForm");

const modal =
    document.getElementById("successModal");

const closeModal =
    document.getElementById("closeModal");

const modalButton =
    document.getElementById("modalButton");


form.addEventListener("submit", function(event) {

    event.preventDefault();


    const nome =
        document.getElementById("nome").value.trim();

    const local =
        document.getElementById("local").value.trim();

    const tipoLixo =
        document.getElementById("tipoLixo").value;

    const descricao =
        document.getElementById("descricao").value.trim();


    const novaDenuncia = {

        id: Date.now(),

        nome: nome,

        local: local,

        tipoLixo: tipoLixo,

        descricao: descricao,

        data:
            new Date().toLocaleString("pt-BR")

    };


    let denuncias =
        JSON.parse(localStorage.getItem("denuncias")) || [];


    denuncias.push(novaDenuncia);


    localStorage.setItem(
        "denuncias",
        JSON.stringify(denuncias)
    );


    atualizarContador();


    form.reset();


    modal.classList.add("active");

});


/* =====================================
   MODAL
===================================== */

function fecharModal() {

    modal.classList.remove("active");

}

closeModal.addEventListener(
    "click",
    fecharModal
);

modalButton.addEventListener(
    "click",
    fecharModal
);


/* Fecha clicando fora do modal */

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        fecharModal();
    }

});


/* =====================================
   QUIZ
===================================== */

const perguntas = [

    {
        pergunta:
            "Onde devemos descartar uma pilha usada?",

        respostas: [
            "🗑️ No lixo comum",
            "🔋 Em um ponto de coleta apropriado",
            "🌊 Em um rio",
            "🛣️ Na rua"
        ],

        correta: 1
    },


    {
        pergunta:
            "O que pode acontecer quando o lixo bloqueia os bueiros?",

        respostas: [
            "🌈 O ar fica mais limpo",
            "🌱 As plantas crescem mais rápido",
            "🌧️ Podem ocorrer alagamentos",
            "☀️ A temperatura diminui"
        ],

        correta: 2
    },


    {
        pergunta:
            "Qual destes materiais pode ser reciclado?",

        respostas: [
            "📦 Papelão",
            "☠️ Material contaminado",
            "🍌 Restos de comida",
            "🧴 Material sem possibilidade de reaproveitamento"
        ],

        correta: 0
    },


    {
        pergunta:
            "Onde devemos jogar óleo de cozinha usado?",

        respostas: [
            "🚰 Na pia",
            "🌊 No rio",
            "♻️ Em um ponto de coleta de óleo",
            "🌳 No jardim"
        ],

        correta: 2
    }

];


let perguntaAtual = 0;
let pontuacao = 0;


const question =
    document.getElementById("question");

const answers =
    document.querySelector(".answers");

const quizResult =
    document.getElementById("quizResult");

const nextQuestion =
    document.getElementById("nextQuestion");


function carregarPergunta() {

    const pergunta =
        perguntas[perguntaAtual];


    question.textContent =
        pergunta.pergunta;


    answers.innerHTML = "";

    quizResult.textContent = "";

    nextQuestion.classList.add("hidden");


    pergunta.respostas.forEach(
        (resposta, index) => {

            const button =
                document.createElement("button");


            button.className = "answer";

            button.textContent = resposta;


            button.addEventListener(
                "click",
                () => verificarResposta(
                    index,
                    button
                )
            );


            answers.appendChild(button);

        }
    );

}


function verificarResposta(index, button) {

    const pergunta =
        perguntas[perguntaAtual];


    const botoes =
        document.querySelectorAll(".answer");


    botoes.forEach(botao => {
        botao.disabled = true;
    });


    if (index === pergunta.correta) {

        button.classList.add("correct");

        quizResult.textContent =
            "✅ Muito bem! Resposta correta.";

        quizResult.style.color =
            "#1f9d55";

        pontuacao++;

    } else {

        button.classList.add("wrong");

        botoes[
            pergunta.correta
        ].classList.add("correct");

        quizResult.textContent =
            "❌ Quase! A resposta correta está destacada.";

        quizResult.style.color =
            "#c0392b";
    }


    nextQuestion.classList.remove("hidden");

}


nextQuestion.addEventListener(
    "click",
    () => {

        perguntaAtual++;


        if (perguntaAtual < perguntas.length) {

            carregarPergunta();

        } else {

            mostrarResultadoQuiz();

        }

    }
);


function mostrarResultadoQuiz() {

    question.textContent =
        "🎉 Quiz concluído!";


    answers.innerHTML = "";


    quizResult.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;

    quizResult.style.color =
        "#1f9d55";


    nextQuestion.textContent =
        "Refazer quiz";


    nextQuestion.classList.remove("hidden");


    nextQuestion.onclick = () => {

        perguntaAtual = 0;

        pontuacao = 0;

        nextQuestion.textContent =
            "Próxima pergunta →";

        carregarPergunta();

    };

}


carregarPergunta();


/* =====================================
   ANIMAÇÃO AO ENTRAR NA TELA
===================================== */

const elementos =
    document.querySelectorAll(
        ".card, .disposal-card, .step"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


elementos.forEach(elemento => {

    elemento.style.opacity = "0";

    elemento.style.transform =
        "translateY(20px)";

    elemento.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(elemento);

});
