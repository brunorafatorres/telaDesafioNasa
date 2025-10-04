// Funções principais do simulador
document.addEventListener('DOMContentLoaded', function() {
    // Configurar controles deslizantes
    configurarControlesDeslizantes();
    
    // Configurar abas
    configurarAbas();
    
    // Configurar botão de simulação
    configurarBotaoSimulacao();
});

function configurarControlesDeslizantes() {
    const controleTamanho = document.getElementById('asteroid-size');
    const controleVelocidade = document.getElementById('asteroid-velocity');
    const controleAngulo = document.getElementById('impact-angle');
    
    const valorTamanho = document.getElementById('valor-tamanho');
    const valorVelocidade = document.getElementById('valor-velocidade');
    const valorAngulo = document.getElementById('valor-angulo');
    
    controleTamanho.addEventListener('input', function() {
        valorTamanho.textContent = `${this.value} m`;
    });
    
    controleVelocidade.addEventListener('input', function() {
        valorVelocidade.textContent = `${this.value} km/s`;
    });
    
    controleAngulo.addEventListener('input', function() {
        valorAngulo.textContent = `${this.value}°`;
    });
}

function configurarAbas() {
    const botoesAbas = document.querySelectorAll('.botao-aba');
    const conteudosAbas = document.querySelectorAll('.conteudo-aba');
    
    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            const idAba = this.getAttribute('data-tab');
            
            // Remover classe ativo de todos os botões e conteúdos
            botoesAbas.forEach(btn => btn.classList.remove('ativo'));
            conteudosAbas.forEach(conteudo => conteudo.classList.remove('ativo'));
            
            // Adicionar classe ativo ao botão e conteúdo atual
            this.classList.add('ativo');
            document.getElementById(`visualizacao-${idAba}`).classList.add('ativo');
        });
    });
}

function configurarBotaoSimulacao() {
    const botaoSimular = document.getElementById('executar-simulacao');
    
    botaoSimular.addEventListener('click', function() {
        // Coletar parâmetros
        const tamanho = document.getElementById('asteroid-size').value;
        const velocidade = document.getElementById('asteroid-velocity').value;
        const composicao = document.getElementById('asteroid-composition').value;
        const angulo = document.getElementById('impact-angle').value;
        const localizacao = document.getElementById('impact-location').value;
        
        // Executar simulação
        executarSimulacao(tamanho, velocidade, composicao, angulo, localizacao);
    });
}

function executarSimulacao(tamanho, velocidade, composicao, angulo, localizacao) {
    // Calcular efeitos do impacto
    const energia = calcularEnergiaImpacto(tamanho, velocidade, composicao);
    const tamanhoCratera = calcularTamanhoCratera(energia);
    const magnitudeSismica = calcularMagnitudeSismica(energia);
    const alturaTsunami = calcularAlturaTsunami(energia, localizacao);
    
    // Atualizar interface
    document.getElementById('tamanho-cratera').textContent = `${tamanhoCratera.toFixed(1)} km`;
    document.getElementById('energia-liberada').textContent = formatarEnergia(energia);
    document.getElementById('magnitude-sismica').textContent = `M ${magnitudeSismica.toFixed(1)}`;
    document.getElementById('altura-tsunami').textContent = localizacao === 'ocean' ? `${alturaTsunami.toFixed(1)} m` : 'N/A';
    
    // Mostrar aba de efeitos
    document.querySelectorAll('.botao-aba').forEach(btn => btn.classList.remove('ativo'));
    document.querySelectorAll('.conteudo-aba').forEach(conteudo => conteudo.classList.remove('ativo'));
    
    document.querySelector('[data-tab="efeitos"]').classList.add('ativo');
    document.getElementById('visualizacao-efeitos').classList.add('ativo');
}

function calcularEnergiaImpacto(tamanho, velocidade, composicao) {
    // Calcular massa baseada no tamanho e composição
    const raio = tamanho / 2; // metros
    let densidade;
    
    switch(composicao) {
        case 'rocky': densidade = 2700; break; // kg/m³
        case 'metallic': densidade = 7900; break;
        case 'icy': densidade = 1000; break;
        default: densidade = 2700;
    }
    
    const volume = (4/3) * Math.PI * Math.pow(raio, 3);
    const massa = volume * densidade; // kg
    
    // Energia cinética: E = 1/2 * m * v²
    const energiaJoules = 0.5 * massa * Math.pow(velocidade * 1000, 2); // Joules
    
    // Converter para equivalente em TNT (1 ton TNT = 4.184e9 J)
    return energiaJoules / 4.184e9; // toneladas de TNT
}

function calcularTamanhoCratera(energiaTNT) {
    // Fórmula simplificada para estimar tamanho da cratera
    return 0.07 * Math.pow(energiaTNT / 1000, 0.294); // km
}

function calcularMagnitudeSismica(energiaTNT) {
    // Relação aproximada entre energia e magnitude sísmica
    return 0.67 * Math.log10(energiaTNT * 4.184e9) - 5.87;
}

function calcularAlturaTsunami(energiaTNT, localizacao) {
    if (localizacao !== 'ocean') return 0;
    
    // Estimativa simplificada da altura do tsunami
    return 0.5 * Math.pow(energiaTNT / 1e6, 0.25) * 100; // metros
}

function formatarEnergia(energiaTNT) {
    if (energiaTNT >= 1e9) {
        return `${(energiaTNT / 1e9).toFixed(1)} Gt TNT`;
    } else if (energiaTNT >= 1e6) {
        return `${(energiaTNT / 1e6).toFixed(1)} Mt TNT`;
    } else if (energiaTNT >= 1e3) {
        return `${(energiaTNT / 1e3).toFixed(1)} kt TNT`;
    } else {
        return `${energiaTNT.toFixed(1)} t TNT`;
    }
}

