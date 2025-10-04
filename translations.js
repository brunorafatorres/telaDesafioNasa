// Sistema de tradução
const translations = {
    'pt': {
        'site_title': 'Simulador de Impacto de Asteroides',
        'simulation_title': 'Simulador de Impacto',
        'simulation_params': 'Parâmetros do Asteroide',
        'param_size': 'Tamanho (diâmetro em metros)',
        'param_velocity': 'Velocidade (km/s)',
        'param_composition': 'Composição',
        'comp_rocky': 'Rochoso (densidade: 2.7 g/cm³)',
        'comp_metallic': 'Metálico (densidade: 7.9 g/cm³)',
        'comp_icy': 'Gelado (densidade: 1.0 g/cm³)',
        'param_angle': 'Ângulo de Impacto',
        'param_location': 'Local de Impacto',
        'loc_ocean': 'Oceano',
        'loc_continent': 'Continente',
        'loc_urban': 'Área Urbana',
        'loc_custom': 'Personalizado',
        'simulate_button': 'Executar Simulação',
        'tab_orbit': 'Órbita',
        'tab_impact': 'Impacto',
        'tab_effects': 'Efeitos',
        'orbit_info': 'Visualização da trajetória do asteroide em relação à Terra',
        'impact_info': 'Zona de impacto potencial baseada em cálculos de trajetória',
        'effect_crater': 'Cratera',
        'effect_energy': 'Energia Liberada',
        'effect_seismic': 'Magnitude Sísmica',
        'effect_tsunami': 'Altura do Tsunami',
        'effect_crater_desc': 'Diâmetro estimado da cratera',
        'effect_energy_desc': 'Equivalente em TNT',
        'effect_seismic_desc': 'Escala Richter',
        'effect_tsunami_desc': 'Em impactos oceânicos',
        'footer_title': 'Simulador de Impacto de Asteroides',
        'footer_description': 'Uma ferramenta educacional desenvolvida para o NASA Challenge',
        'footer_sources': 'Fontes de Dados',
        'footer_contact': 'Contato',
        'footer_copyright': 'Desenvolvido para fins educacionais'
    },
    'en': {
        'site_title': 'Asteroid Impact Simulator',
        'simulation_title': 'Impact Simulator',
        'simulation_params': 'Asteroid Parameters',
        'param_size': 'Size (diameter in meters)',
        'param_velocity': 'Velocity (km/s)',
        'param_composition': 'Composition',
        'comp_rocky': 'Rocky (density: 2.7 g/cm³)',
        'comp_metallic': 'Metallic (density: 7.9 g/cm³)',
        'comp_icy': 'Icy (density: 1.0 g/cm³)',
        'param_angle': 'Impact Angle',
        'param_location': 'Impact Location',
        'loc_ocean': 'Ocean',
        'loc_continent': 'Continent',
        'loc_urban': 'Urban Area',
        'loc_custom': 'Custom',
        'simulate_button': 'Run Simulation',
        'tab_orbit': 'Orbit',
        'tab_impact': 'Impact',
        'tab_effects': 'Effects',
        'orbit_info': 'Visualization of asteroid trajectory relative to Earth',
        'impact_info': 'Potential impact zone based on trajectory calculations',
        'effect_crater': 'Crater',
        'effect_energy': 'Energy Released',
        'effect_seismic': 'Seismic Magnitude',
        'effect_tsunami': 'Tsunami Height',
        'effect_crater_desc': 'Estimated crater diameter',
        'effect_energy_desc': 'TNT equivalent',
        'effect_seismic_desc': 'Richter scale',
        'effect_tsunami_desc': 'For ocean impacts',
        'footer_title': 'Asteroid Impact Simulator',
        'footer_description': 'An educational tool developed for the NASA Challenge',
        'footer_sources': 'Data Sources',
        'footer_contact': 'Contact',
        'footer_copyright': 'Developed for educational purposes'
    },
    'es': {
        'site_title': 'Simulador de Impacto de Asteroides',
        'simulation_title': 'Simulador de Impacto',
        'simulation_params': 'Parámetros del Asteroide',
        'param_size': 'Tamaño (diámetro en metros)',
        'param_velocity': 'Velocidad (km/s)',
        'param_composition': 'Composición',
        'comp_rocky': 'Rocoso (densidad: 2.7 g/cm³)',
        'comp_metallic': 'Metálico (densidad: 7.9 g/cm³)',
        'comp_icy': 'Helado (densidad: 1.0 g/cm³)',
        'param_angle': 'Ángulo de Impacto',
        'param_location': 'Ubicación de Impacto',
        'loc_ocean': 'Océano',
        'loc_continent': 'Continente',
        'loc_urban': 'Área Urbana',
        'loc_custom': 'Personalizado',
        'simulate_button': 'Ejecutar Simulación',
        'tab_orbit': 'Órbita',
        'tab_impact': 'Impacto',
        'tab_effects': 'Efectos',
        'orbit_info': 'Visualización de la trayectoria del asteroide en relación con la Tierra',
        'impact_info': 'Zona de impacto potencial basada en cálculos de trayectoria',
        'effect_crater': 'Cráter',
        'effect_energy': 'Energía Liberada',
        'effect_seismic': 'Magnitud Sísmica',
        'effect_tsunami': 'Altura del Tsunami',
        'effect_crater_desc': 'Diámetro estimado del cráter',
        'effect_energy_desc': 'Equivalente en TNT',
        'effect_seismic_desc': 'Escala de Richter',
        'effect_tsunami_desc': 'En impactos oceánicos',
        'footer_title': 'Simulador de Impacto de Asteroides',
        'footer_description': 'Una herramienta educativa desarrollada para el NASA Challenge',
        'footer_sources': 'Fuentes de Datos',
        'footer_contact': 'Contacto',
        'footer_copyright': 'Desarrollado con fines educativos'
    }
};

let currentLang = 'pt';

function changeLanguage(lang) {
    currentLang = lang;
    
    // Atualizar botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Atualizar textos
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
}

// Inicializar sistema de tradução
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos dos botões de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });
    
    // Inicializar com português
    changeLanguage('pt');
});