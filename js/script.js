// Estado do jogo
let gameState = {
    coins: 0,
    totalClicks: 0,
    coinsPerClick: 1,
    coinsPerSecond: 0,
    prestigeLevel: 0,
    prestigeMultiplier: 1,
    upgrades: {},
    achievements: {},
    lastSave: Date.now()
};

// Definições de upgrades
const upgradeDefinitions = [
    {
        id: 'cursor',
        name: '👆 Cursor Melhorado',
        description: '+1 moeda por clique',
        baseCost: 15,
        effect: { coinsPerClick: 1 },
        costMultiplier: 1.15
    },
    {
        id: 'autoClicker',
        name: '🤖 Auto Clicker',
        description: '+1 moeda por segundo',
        baseCost: 100,
        effect: { coinsPerSecond: 1 },
        costMultiplier: 1.15
    },
    {
        id: 'goldMine',
        name: '⛏️ Mina de Ouro',
        description: '+5 moedas por segundo',
        baseCost: 1100,
        effect: { coinsPerSecond: 5 },
        costMultiplier: 1.15
    },
    {
        id: 'factory',
        name: '🏭 Fábrica',
        description: '+25 moedas por segundo',
        baseCost: 12000,
        effect: { coinsPerSecond: 25 },
        costMultiplier: 1.15
    },
    {
        id: 'bank',
        name: '🏦 Banco',
        description: '+100 moedas por segundo',
        baseCost: 130000,
        effect: { coinsPerSecond: 100 },
        costMultiplier: 1.15
    },
    {
        id: 'temple',
        name: '🏛️ Templo',
        description: '+400 moedas por segundo',
        baseCost: 1400000,
        effect: { coinsPerSecond: 400 },
        costMultiplier: 1.15
    }
];

// Definições de conquistas
const achievementDefinitions = [
    {
        id: 'firstClick',
        name: 'Primeiro Clique',
        description: 'Clique pela primeira vez',
        condition: () => gameState.totalClicks >= 1
    },
    {
        id: 'hundred',
        name: 'Centena',
        description: 'Acumule 100 moedas',
        condition: () => gameState.coins >= 100
    },
    {
        id: 'thousand',
        name: 'Milhar',
        description: 'Acumule 1.000 moedas',
        condition: () => gameState.coins >= 1000
    },
    {
        id: 'tenThousand',
        name: 'Dez Mil',
        description: 'Acumule 10.000 moedas',
        condition: () => gameState.coins >= 10000
    },
    {
        id: 'hundredClicks',
        name: 'Clicador',
        description: 'Clique 100 vezes',
        condition: () => gameState.totalClicks >= 100
    },
    {
        id: 'thousandClicks',
        name: 'Clicador Experiente',
        description: 'Clique 1.000 vezes',
        condition: () => gameState.totalClicks >= 1000
    },
    {
        id: 'firstUpgrade',
        name: 'Primeira Compra',
        description: 'Compre seu primeiro upgrade',
        condition: () => Object.values(gameState.upgrades).some(count => count > 0)
    },
    {
        id: 'autoIncome',
        name: 'Renda Passiva',
        description: 'Tenha pelo menos 1 moeda por segundo',
        condition: () => gameState.coinsPerSecond >= 1
    }
];

// Elementos DOM
const elements = {
    coins: document.getElementById('coins'),
    coinsPerClick: document.getElementById('coins-per-click'),
    coinsPerSecond: document.getElementById('coins-per-second'),
    totalClicks: document.getElementById('total-clicks'),
    coinButton: document.getElementById('coin-button'),
    shopItems: document.getElementById('shop-items'),
    achievements: document.getElementById('achievements'),
    prestigeLevel: document.getElementById('prestige-level'),
    prestigeMultiplier: document.getElementById('prestige-multiplier'),
    prestigeButton: document.getElementById('prestige-button'),
    floatingNumbers: document.getElementById('floating-numbers')
};

// Inicializar upgrades no estado do jogo
upgradeDefinitions.forEach(upgrade => {
    if (!(upgrade.id in gameState.upgrades)) {
        gameState.upgrades[upgrade.id] = 0;
    }
});

// Inicializar conquistas no estado do jogo
achievementDefinitions.forEach(achievement => {
    if (!(achievement.id in gameState.achievements)) {
        gameState.achievements[achievement.id] = false;
    }
});

// Função para formatar números grandes
function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    return (num / 1000000000000).toFixed(1) + 'T';
}

// Função para calcular o custo de um upgrade
function getUpgradeCost(upgradeId) {
    const upgrade = upgradeDefinitions.find(u => u.id === upgradeId);
    const count = gameState.upgrades[upgradeId];
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, count));
}

// Função para criar números flutuantes
function createFloatingNumber(value, x, y) {
    const floatingNumber = document.createElement('div');
    floatingNumber.className = 'floating-number';
    floatingNumber.textContent = '+' + formatNumber(value);
    floatingNumber.style.left = x + 'px';
    floatingNumber.style.top = y + 'px';
    
    elements.floatingNumbers.appendChild(floatingNumber);
    
    setTimeout(() => {
        if (floatingNumber.parentNode) {
            floatingNumber.parentNode.removeChild(floatingNumber);
        }
    }, 1000);
}

// Função de clique na moeda
function clickCoin(event) {
    const earnedCoins = gameState.coinsPerClick * gameState.prestigeMultiplier;
    gameState.coins += earnedCoins;
    gameState.totalClicks++;
    
    // Criar número flutuante
    const rect = elements.coinButton.getBoundingClientRect();
    const containerRect = elements.floatingNumbers.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) - containerRect.left;
    const y = (rect.top + rect.height / 2) - containerRect.top;
    
    createFloatingNumber(earnedCoins, x - 25, y - 25);
    
    updateDisplay();
    checkAchievements();
}

// Função para comprar upgrade
function buyUpgrade(upgradeId) {
    const cost = getUpgradeCost(upgradeId);
    if (gameState.coins >= cost) {
        gameState.coins -= cost;
        gameState.upgrades[upgradeId]++;
        
        const upgrade = upgradeDefinitions.find(u => u.id === upgradeId);
        if (upgrade.effect.coinsPerClick) {
            gameState.coinsPerClick += upgrade.effect.coinsPerClick;
        }
        if (upgrade.effect.coinsPerSecond) {
            gameState.coinsPerSecond += upgrade.effect.coinsPerSecond;
        }
        
        updateDisplay();
        updateShop();
        checkAchievements();
    }
}

// Função para verificar conquistas
function checkAchievements() {
    achievementDefinitions.forEach(achievement => {
        if (!gameState.achievements[achievement.id] && achievement.condition()) {
            gameState.achievements[achievement.id] = true;
            showAchievementNotification(achievement);
        }
    });
    updateAchievements();
}

// Função para mostrar notificação de conquista
function showAchievementNotification(achievement) {
    // Criar uma notificação simples
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    `;
    notification.innerHTML = `
        <strong>🏆 Conquista Desbloqueada!</strong><br>
        ${achievement.name}: ${achievement.description}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Função para atualizar a exibição
function updateDisplay() {
    elements.coins.textContent = formatNumber(gameState.coins);
    elements.coinsPerClick.textContent = formatNumber(gameState.coinsPerClick * gameState.prestigeMultiplier);
    elements.coinsPerSecond.textContent = formatNumber(gameState.coinsPerSecond * gameState.prestigeMultiplier);
    elements.totalClicks.textContent = formatNumber(gameState.totalClicks);
    elements.prestigeLevel.textContent = gameState.prestigeLevel;
    elements.prestigeMultiplier.textContent = gameState.prestigeMultiplier.toFixed(1) + 'x';
    
    // Atualizar botão de prestígio
    const prestigeThreshold = 1000000; // 1 milhão
    elements.prestigeButton.disabled = gameState.coins < prestigeThreshold;
}

// Função para atualizar a loja
function updateShop() {
    elements.shopItems.innerHTML = '';
    
    upgradeDefinitions.forEach(upgrade => {
        const cost = getUpgradeCost(upgrade.id);
        const count = gameState.upgrades[upgrade.id];
        const canAfford = gameState.coins >= cost;
        
        const shopItem = document.createElement('button');
        shopItem.className = 'shop-item';
        shopItem.disabled = !canAfford;
        shopItem.onclick = () => buyUpgrade(upgrade.id);
        
        shopItem.innerHTML = `
            <div class="shop-item-name">${upgrade.name} (${count})</div>
            <div class="shop-item-description">${upgrade.description}</div>
            <div class="shop-item-cost">Custo: ${formatNumber(cost)} moedas</div>
        `;
        
        elements.shopItems.appendChild(shopItem);
    });
}

// Função para atualizar conquistas
function updateAchievements() {
    elements.achievements.innerHTML = '';
    
    achievementDefinitions.forEach(achievement => {
        const isUnlocked = gameState.achievements[achievement.id];
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${isUnlocked ? 'unlocked' : ''}`;
        
        achievementElement.innerHTML = `
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        
        elements.achievements.appendChild(achievementElement);
    });
}

// Função de prestígio
function prestige() {
    if (gameState.coins >= 1000000) {
        gameState.prestigeLevel++;
        gameState.prestigeMultiplier = 1 + (gameState.prestigeLevel * 0.5);
        
        // Reset do jogo
        gameState.coins = 0;
        gameState.totalClicks = 0;
        gameState.coinsPerClick = 1;
        gameState.coinsPerSecond = 0;
        
        // Reset dos upgrades
        Object.keys(gameState.upgrades).forEach(key => {
            gameState.upgrades[key] = 0;
        });
        
        updateDisplay();
        updateShop();
    }
}

// Função de renda passiva
function passiveIncome() {
    if (gameState.coinsPerSecond > 0) {
        const earned = (gameState.coinsPerSecond * gameState.prestigeMultiplier) / 10; // 10 FPS
        gameState.coins += earned;
        updateDisplay();
    }
}

// Event listeners
elements.coinButton.addEventListener('click', clickCoin);
elements.prestigeButton.addEventListener('click', prestige);

// Inicialização
updateDisplay();
updateShop();
updateAchievements();

// Loop de renda passiva (10 FPS)
setInterval(passiveIncome, 100);

// Salvamento automático a cada 5 segundos
setInterval(() => {
    localStorage.setItem('clickerGameSave', JSON.stringify(gameState));
}, 5000);

// Carregar jogo salvo
function loadGame() {
    const savedGame = localStorage.getItem('clickerGameSave');
    if (savedGame) {
        const loadedState = JSON.parse(savedGame);
        
        // Mesclar estado carregado com estado padrão
        Object.keys(loadedState).forEach(key => {
            if (key in gameState) {
                gameState[key] = loadedState[key];
            }
        });
        
        // Garantir que todos os upgrades e conquistas existam
        upgradeDefinitions.forEach(upgrade => {
            if (!(upgrade.id in gameState.upgrades)) {
                gameState.upgrades[upgrade.id] = 0;
            }
        });
        
        achievementDefinitions.forEach(achievement => {
            if (!(achievement.id in gameState.achievements)) {
                gameState.achievements[achievement.id] = false;
            }
        });
        
        // Recalcular valores derivados
        gameState.coinsPerClick = 1;
        gameState.coinsPerSecond = 0;
        
        upgradeDefinitions.forEach(upgrade => {
            const count = gameState.upgrades[upgrade.id];
            if (upgrade.effect.coinsPerClick) {
                gameState.coinsPerClick += upgrade.effect.coinsPerClick * count;
            }
            if (upgrade.effect.coinsPerSecond) {
                gameState.coinsPerSecond += upgrade.effect.coinsPerSecond * count;
            }
        });
        
        updateDisplay();
        updateShop();
        updateAchievements();
    }
}

// Carregar jogo ao iniciar
loadGame();

