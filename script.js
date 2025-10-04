// Funções principais do simulador
document.addEventListener('DOMContentLoaded', function() {
    // Configurar controles deslizantes
    setupSliders();
    
    // Configurar abas
    setupTabs();
    
    // Configurar botão de simulação
    setupSimulationButton();
});

function setupSliders() {
    const sizeSlider = document.getElementById('asteroid-size');
    const velocitySlider = document.getElementById('asteroid-velocity');
    const angleSlider = document.getElementById('impact-angle');
    
    const sizeValue = document.getElementById('size-value');
    const velocityValue = document.getElementById('velocity-value');
    const angleValue = document.getElementById('angle-value');
    
    sizeSlider.addEventListener('input', function() {
        sizeValue.textContent = `${this.value} m`;
    });
    
    velocitySlider.addEventListener('input', function() {
        velocityValue.textContent = `${this.value} km/s`;
    });
    
    angleSlider.addEventListener('input', function() {
        angleValue.textContent = `${this.value}°`;
    });
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão e conteúdo atual
            this.classList.add('active');
            document.getElementById(`${tabId}-visualization`).classList.add('active');
        });
    });
}

function setupSimulationButton() {
    const simulateButton = document.getElementById('run-simulation');
    
    simulateButton.addEventListener('click', function() {
        // Coletar parâmetros
        const size = document.getElementById('asteroid-size').value;
        const velocity = document.getElementById('asteroid-velocity').value;
        const composition = document.getElementById('asteroid-composition').value;
        const angle = document.getElementById('impact-angle').value;
        const location = document.getElementById('impact-location').value;
        
        // Executar simulação
        runSimulation(size, velocity, composition, angle, location);
    });
}

function runSimulation(size, velocity, composition, angle, location) {
    // Calcular efeitos do impacto
    const energy = calculateImpactEnergy(size, velocity, composition);
    const craterSize = calculateCraterSize(energy);
    const seismicMagnitude = calculateSeismicMagnitude(energy);
    const tsunamiHeight = calculateTsunamiHeight(energy, location);
    
    // Atualizar interface
    document.getElementById('crater-size').textContent = `${craterSize.toFixed(1)} km`;
    document.getElementById('energy-release').textContent = formatEnergy(energy);
    document.getElementById('seismic-magnitude').textContent = `M ${seismicMagnitude.toFixed(1)}`;
    document.getElementById('tsunami-height').textContent = location === 'ocean' ? `${tsunamiHeight.toFixed(1)} m` : 'N/A';
    
    // Mostrar aba de efeitos
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector('[data-tab="effects"]').classList.add('active');
    document.getElementById('effects-visualization').classList.add('active');
}

function calculateImpactEnergy(size, velocity, composition) {
    // Calcular massa baseada no tamanho e composição
    const radius = size / 2; // metros
    let density;
    
    switch(composition) {
        case 'rocky': density = 2700; break; // kg/m³
        case 'metallic': density = 7900; break;
        case 'icy': density = 1000; break;
        default: density = 2700;
    }
    
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);
    const mass = volume * density; // kg
    
    // Energia cinética: E = 1/2 * m * v²
    const energyJoules = 0.5 * mass * Math.pow(velocity * 1000, 2); // Joules
    
    // Converter para equivalente em TNT (1 ton TNT = 4.184e9 J)
    return energyJoules / 4.184e9; // toneladas de TNT
}

function calculateCraterSize(energyTNT) {
    // Fórmula simplificada para estimar tamanho da cratera
    return 0.07 * Math.pow(energyTNT / 1000, 0.294); // km
}

function calculateSeismicMagnitude(energyTNT) {
    // Relação aproximada entre energia e magnitude sísmica
    return 0.67 * Math.log10(energyTNT * 4.184e9) - 5.87;
}

function calculateTsunamiHeight(energyTNT, location) {
    if (location !== 'ocean') return 0;
    
    // Estimativa simplificada da altura do tsunami
    return 0.5 * Math.pow(energyTNT / 1e6, 0.25) * 100; // metros
}

function formatEnergy(energyTNT) {
    if (energyTNT >= 1e9) {
        return `${(energyTNT / 1e9).toFixed(1)} Gt TNT`;
    } else if (energyTNT >= 1e6) {
        return `${(energyTNT / 1e6).toFixed(1)} Mt TNT`;
    } else if (energyTNT >= 1e3) {
        return `${(energyTNT / 1e3).toFixed(1)} kt TNT`;
    } else {
        return `${energyTNT.toFixed(1)} t TNT`;
    }
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
    });
}