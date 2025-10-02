$(document).ready(function() {
    
    //Datos del Quiz
    const quizQuestions = [
        {
            pregunta: "¿Qué es el phishing?",
            opciones: [
                "Un tipo de malware que encripta archivos",
                "Una técnica para engañar usuarios y obtener información personal",
                "Un ataque que sobrecarga servidores",
                "Un virus que se propaga por email"
            ], 
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cuál de estas NO es una característica de una contraseña segura?",
            opciones: [
                "Contiene información personal",
                "Incluye mezcla de letras, números y símbolos",
                "Tiene más de 8 carácteres",
                "No contiene palabras comunes"
            ],
            respuestaCorrecta: 0
        },
        {
            pregunta: "¿Qué significa 2FA?",
            opciones: [
                "Dos firewalls Activos",
                "Autenticación de Dos Factores",
                "Doble Filtro de Antivirus",
                "Dos Formas de Acceso"
            ],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Qué tipo de ataque fue más común en 2024?",
            opciones: [
                "Phishing",
                "DDoS",
                "Ransomware",
                "Malware"
            ],
            respuestaCorrecta: 2
        },
        {
            pregunta: "¿Cuál es el propósito de un firewall?",
            opciones: [
                "Acelerar la conexión a internet",
                "Monitorear tráfico saliente",
                "Prevenir acceso no autorizado a la red",
                "Encriptar emails"
            ],
            respuestaCorrecta: 2
        },
        {
            pregunta: "¿Qué protocolo asegura la transmisión segura de datos?",
            opciones: [
                "HTTP",
                "FTP",
                "SSL/TLS",
                "SMTP"
            ],
            respuestaCorrecta: 2
        },
        {
            pregunta: "¿Qué significa DDoS?",
            opciones: [
                "Denegación Distribuida de Servicio",
                "Detección de Datos Sospechosos",
                "Doble Defensa de Sistema",
                "Distribución de Datos Seguros"
            ],
            respuestaCorrecta: 0
        },
        {
            pregunta: "¿Cuál es una buena práctica para respaldos?",
            opciones: [
                "Hacer respaldos solo una vez al año",
                "Guardar respaldos en la misma ubicación que los datos originales",
                "Hacer respaldos regulares y probar su recuperación",
                "Solo respaldar archivos importantes manualmente"
            ],
            respuestaCorrecta: 2
        }
    ];

    //Variables del Quiz
    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    //Funciones del Quiz
    window.startQuiz = function() {
        $('#quiz-intro').hide();
        $('#quiz-question').show();
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        showQuestion();
    }

    window.restartQuiz = function() {
        $('#quiz-results').hide();
        $('#quiz-intro').show();
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
    }

    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        const questionHtml = `
            <div class="question-container">
                <h4 class="question-title">${question.pregunta}</h4>
                <div class="answers-container">
                    ${question.opciones.map((opcion, index) => `
                        <button class="answer-option" onclick="selectAnswer(${index})">
                            ${opcion}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-navigation mt-4">
                    <button class="btn btn-secondary" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left me-2"></i> Anterior
                    </button>
                    <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()" disabled>
                        ${currentQuestion === quizQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
                        <i class="fas fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        `;

        $('#current-question').html(questionHtml);
        updateProgress();

        if (userAnswers[currentQuestion] !== undefined) {
            $(`.answer-option:eq(${userAnswers[currentQuestion]})`).addClass('selected');
            $('#nextBtn').prop('disabled', false);
        }
    }

    window.nextQuestion = function() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            finishQuiz();
        }
    }

    window.previousQuestion = function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    window.selectAnswer = function(selectedIndex) {
        // Remover selección anterior
        $('.answer-option').removeClass('selected');
        
        // Marcar la nueva selección
        $(`.answer-option:eq(${selectedIndex})`).addClass('selected');
        
        // Guardar la respuesta del usuario
        userAnswers[currentQuestion] = selectedIndex;
        
        // Habilitar el botón siguiente
        $('#nextBtn').prop('disabled', false);
    }

    function updateProgress() {
        const progress = ((currentQuestion + 1) / quizQuestions.length) *100;
        $('.progress-bar').css('width', progress + '%');
        $('#question-counter').text(`Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`);
    }

    function finishQuiz() {
        score = 0;
        for (let i = 0; i < quizQuestions.length; i++) {
            if (userAnswers[i] === quizQuestions[i].respuestaCorrecta) {
                score++;
            }
        }

        const porcentaje = (score / quizQuestions.length) * 100;
        showResults(porcentaje);
    }

    function showResults(porcentaje) {
        $('#quiz-question').hide();

        let message, className;
        if (porcentaje >= 90) {
            message = "¡Excelente! Tienes un conocimiento sobresaliente en ciberseguridad.";
            className = "score-excellent";
        } else if (porcentaje >= 70) {
            message = "¡Muy bien! Tienes un buen conocimiento en ciberseguridad, sigue aprendiendo.";
            className = "score-good";
        } else if (porcentaje >= 50) {
            message = "¡Bien! Pero hay áreas que puedes mejorar en ciberseguridad.";
            className = "score-fair";
        } else {
            message = "Necesitas mejorar tu conocimiento en ciberseguridad. ¡Sigue practicando!";
            className = "score-poor";
        }

        $('#score-display').text(`${score}/${quizQuestions.length} (${Math.round(porcentaje)}%)`).removeClass().addClass(className);
        $('#score-message').text(message);
        $('#quiz-results').show();    
    }

    //Desplazamiento suave para enlaces de navegación
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    //Scroll barra de navegación
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    //Fade In 
    $(window).scroll(function() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    });












});