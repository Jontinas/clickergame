# 🪙 Clicker Game - Jogo de Moedas

Um jogo completo de clicker desenvolvido em HTML, CSS e JavaScript puro, com todas as funcionalidades modernas de um idle game.

## 🎮 Como Jogar

1. **Clique na moeda dourada** para ganhar moedas
2. **Compre upgrades** na loja para aumentar sua eficiência
3. **Desbloqueie conquistas** completando objetivos específicos
4. **Use o sistema de prestígio** para multiplicar seus ganhos
5. **Seu progresso é salvo automaticamente** a cada 5 segundos

## ✨ Funcionalidades

### 🎯 Mecânica Principal
- Sistema de clique para gerar moedas
- Contador de moedas em tempo real
- Contador de cliques totais
- Animações de números flutuantes

### 🏪 Sistema de Loja
- **6 tipos de upgrades diferentes:**
  - 👆 Cursor Melhorado (+1 moeda por clique)
  - 🤖 Auto Clicker (+1 moeda por segundo)
  - ⛏️ Mina de Ouro (+5 moedas por segundo)
  - 🏭 Fábrica (+25 moedas por segundo)
  - 🏦 Banco (+100 moedas por segundo)
  - 🏛️ Templo (+400 moedas por segundo)

- **Custos crescentes:** Cada upgrade fica 15% mais caro a cada compra
- **Upgrades infinitos:** Você pode comprar quantos quiser de cada tipo

### 🏆 Sistema de Conquistas
- **8 conquistas diferentes:**
  - Primeiro Clique
  - Centena (100 moedas)
  - Milhar (1.000 moedas)
  - Dez Mil (10.000 moedas)
  - Clicador (100 cliques)
  - Clicador Experiente (1.000 cliques)
  - Primeira Compra
  - Renda Passiva

- **Notificações visuais** quando desbloqueadas
- **Verificação automática** de progresso

### ⭐ Sistema de Prestígio
- **Reset do jogo** quando você tem 1 milhão de moedas
- **Multiplicador de bônus** que aumenta com cada prestígio
- **Progressão infinita** através dos níveis de prestígio

### 💾 Salvamento Automático
- **Salvamento a cada 5 segundos** no LocalStorage do navegador
- **Carregamento automático** ao abrir o jogo
- **Persistência completa** de todo o progresso

### 🎨 Interface e Animações
- **Design moderno** com gradientes e efeitos visuais
- **Interface responsiva** para desktop e mobile
- **Animações suaves** em botões e interações
- **Números flutuantes** ao clicar na moeda
- **Feedback visual** para todas as ações

## 🚀 Como Executar

1. **Baixe todos os arquivos** do projeto
2. **Abra o arquivo `index.html`** em qualquer navegador moderno
3. **Comece a jogar!** Não é necessária instalação

### Estrutura de Arquivos
```
clicker_game/
├── index.html          # Arquivo principal
├── css/
│   └── style.css       # Estilos do jogo
├── js/
│   └── script.js       # Lógica do jogo
└── images/             # Pasta para imagens (opcional)
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Lógica do jogo
- **LocalStorage** - Salvamento de dados

## 🎯 Estratégias de Jogo

1. **Início:** Foque em comprar Cursors Melhorados para aumentar moedas por clique
2. **Meio:** Invista em Auto Clickers para renda passiva
3. **Avançado:** Compre upgrades mais caros para acelerar o progresso
4. **Prestígio:** Quando chegar a 1 milhão de moedas, considere fazer prestígio para multiplicar ganhos futuros

## 🔧 Personalização

O jogo foi desenvolvido de forma modular, permitindo fácil personalização:

- **Adicionar novos upgrades:** Edite o array `upgradeDefinitions` em `script.js`
- **Criar novas conquistas:** Adicione ao array `achievementDefinitions`
- **Modificar custos:** Ajuste `baseCost` e `costMultiplier` dos upgrades
- **Alterar visual:** Edite os estilos em `style.css`

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (iOS/Android)

## 🎉 Divirta-se!

Este é um jogo completo e funcional que oferece horas de entretenimento. O sistema de progressão infinita garante que sempre há algo novo para alcançar!

---

**Desenvolvido com ❤️ usando tecnologias web modernas**

