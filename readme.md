<div align="center">

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Parrot.png" width="100" alt="Gallego Bot"/>

<h1>
  <img src="https://readme-typing-svg.demolab.com?font=Syne&weight=700&size=40&pause=1000&color=25D366&center=true&vCenter=true&width=600&lines=Gallego+Bot+%F0%9F%A4%96;WhatsApp+AI+Assistant;Powered+by+Llama+3.1" alt="Typing SVG"/>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>
  <img src="https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white"/>
  <img src="https://img.shields.io/badge/Llama_3.1-0467DF?style=for-the-badge&logo=meta&logoColor=white"/>
</p>

<p align="center">
  <strong>Um bot inteligente para WhatsApp que traz o poder do Llama 3.1 direto para suas conversas.</strong><br/>
  Suporte a grupos, histórico de contexto, sumarização automática e muito mais.
</p>

</div>

---

## ✨ Sobre o Projeto

**Gallego Bot** é um assistente de IA para WhatsApp construído com [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js), conectado à API da [Groq](https://groq.com/) com o modelo **Llama 3.1 8B Instant** — respondendo em milissegundos com inteligência de última geração.

Funciona tanto em **conversas privadas** quanto em **grupos**, com memória contextual e sumarização automática para conversas longas.

---

## 🚀 Funcionalidades

| Feature | Descrição |
|:---|:---|
| 🧠 **IA Contextual** | Mantém histórico da conversa para respostas coerentes |
| 📝 **Sumarização Automática** | Comprime o histórico antigo sem perder o contexto |
| 👥 **Suporte a Grupos** | Responde ao ser mencionado pelo nome ("Gallego") |
| ⏱️ **Cooldown Inteligente** | Evita spam com rate-limiting por usuário |
| 🧹 **Reset de Memória** | Comando `!reset` limpa o histórico instantaneamente |
| 🛡️ **Sessão Persistente** | Login via QR Code com autenticação local salva |
| ⚡ **Ultra Rápido** | Groq API com latência inferior a 1 segundo |

---

## 🗂️ Estrutura do Projeto

```
ws-js/
└── 📁 src
     ├── 📄 index.js                  # Entry point — lógica principal do bot
     ├── 🤖 groq.js                   # Integração com a API Groq (LLM)
     └── ⚙️ get-puppeteer-config.js   # Configuração do Chrome headless
├── 🔒 .env                      # Variáveis de ambiente (não versionar!)
├── 📦 package.json
└── 📁 ../wpp/                   # Sessão local do WhatsApp (gerada automaticamente)
```

---

## ⚙️ Instalação e Uso

### Pré-requisitos

- [Node.js](https://nodejs.org/) `>= 24`
- [Google Chrome](https://www.google.com/chrome/) instalado e com o **caminho correto configurado**
- Uma conta na [Groq](https://console.groq.com/) para obter sua API Key

### 🔍 Encontrando o caminho do Google Chrome

O bot precisa saber **onde o Chrome está instalado** no seu sistema. O caminho varia conforme o método de instalação:

| Sistema | Método | Caminho típico |
|:---|:---|:---|
| Linux | APT (Debian/Ubuntu) | `/usr/bin/google-chrome` |
| Linux | **Snap (Ubuntu)** | `/snap/bin/chromium` |
| Linux | Flatpak | `/var/lib/flatpak/exports/bin/com.google.Chrome` |
| Linux | Binário manual | `/opt/google/chrome/google-chrome` |
| **Windows** | Instalador padrão (64-bit) | `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| **Windows** | Instalador padrão (32-bit) | `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe` |
| **Windows** | Instalação por usuário | `C:\Users\<SeuUsuário>\AppData\Local\Google\Chrome\Application\chrome.exe` |

Para descobrir o caminho exato no **seu** sistema:

**🐧 Linux — rode no terminal:**
```bash
# Tenta localizar o Chrome ou Chromium automaticamente
which google-chrome || which chromium || which chromium-browser

# Alternativa mais detalhada
find /usr /snap /opt -name "google-chrome" -o -name "chromium" 2>/dev/null | head -5
```

**🪟 Windows — rode no PowerShell:**
```powershell
# Localiza o Chrome automaticamente
Get-Command chrome | Select-Object -ExpandProperty Source

# Ou verifique diretamente nos caminhos mais comuns
dir "C:\Program Files\Google\Chrome\Application\chrome.exe"
dir "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
```

Após descobrir o caminho, atualize o arquivo `get-puppeteer-config.js`:

```js
// 🐧 Linux (Snap):
executablePath: "/snap/bin/chromium"

// 🐧 Linux (APT):
executablePath: "/usr/bin/google-chrome"

// 🪟 Windows (64-bit):
executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
```

Exemplo completo do arquivo `get-puppeteer-config.js` para Windows:

```js
export function getPuppeteerConfig() {
    return {
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // 👈 altere aqui
        headless: true,
        timeout: 20 * 1000,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
}
```

> ⚠️ **Usuários Snap:** O Chromium via Snap pode ter restrições de sandbox. Caso encontre erros, certifique-se de que os args `--no-sandbox` e `--disable-setuid-sandbox` estejam presentes na configuração — eles já vêm habilitados por padrão neste projeto.

### 1. Clone o repositório

```bash
git clone https://github.com/gallegosz/wpp-ai-bot.git
cd wpp-ai-bot
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
GROQ_API_KEY=sua_chave_groq_aqui
```

> 🔑 Obtenha sua API Key gratuita em [console.groq.com](https://console.groq.com/)

### 4. Inicie o bot

```bash
npm start
```

### 5. Escaneie o QR Code

Um QR Code será exibido no terminal. Escaneie com o seu WhatsApp em **Dispositivos Conectados**.

```
🚀 Inicializando...
█▀▀▀▀▀█  ████▀ █▀▀▀▀▀█
█ ███ █ █ ▀█▄▀ █ ███ █
...
✅ BOT Conectado!
```

---

## 💬 Como Usar

### Em conversas privadas

Basta enviar qualquer mensagem normalmente — o Gallego responde diretamente.

```
Você:    Qual é a capital da França?
Gallego: A capital da França é Paris, uma das cidades mais visitadas
         do mundo, conhecida pela Torre Eiffel, o Louvre e sua rica...
```

### Em grupos

Mencione **"gallego"** em qualquer parte da mensagem:

```
Você:    ei gallego, me explica o que é machine learning
Gallego: Machine learning é uma área da IA onde sistemas aprendem
         padrões a partir de dados sem serem explicitamente programados...
```

### Comandos especiais

| Comando | Ação |
|:---|:---|
| `!reset` | 🧹 Apaga o histórico da conversa atual |

---

## 🧠 Como Funciona a Memória

```
Mensagens 1–12  →  Histórico completo mantido em memória
                        ↓
Mensagem 12+    →  Sumarização automática das mensagens antigas
                        ↓
                   [ Resumo compacto ] + [ Últimas 4 mensagens ]
                        ↓
                   Contexto preservado com custo mínimo de tokens
```

O bot mantém as **últimas 4 mensagens** integrais e comprime o restante em um resumo conciso, garantindo continuidade sem estourar o limite de contexto.

---

## 🔧 Configurações Avançadas

Você pode ajustar as constantes no `index.js`:

```js
const COOLDOWN_TIME    = 5000  // ms entre respostas por usuário (anti-spam)
const SUMMARY_TRIGGER  = 12    // nº de mensagens antes de sumarizar
const RECENT_MESSAGES  = 4     // mensagens recentes preservadas no resumo
```

E o comportamento da IA em `groq.js`:

```js
model:       "llama-3.1-8b-instant"   // modelo utilizado
temperature: 0.7                      // criatividade (0.0 – 1.0)
max_tokens:  400                      // tamanho máximo da resposta
```

---

## 🛡️ Boas Práticas de Segurança

- ✅ Nunca versione o arquivo `.env`
- ✅ Adicione `.env`, `node_modules/` e `.wwebjs_cache/` ao `.gitignore`
- ✅ Não compartilhe sua `GROQ_API_KEY` publicamente

```bash
# .gitignore recomendado
.env
.wwebjs_cache/
node_modules/
```

---

## 📦 Dependências Principais

| Pacote | Versão | Descrição |
|:---|:---|:---|
| `whatsapp-web.js` | latest | Interface com o WhatsApp Web |
| `openai` | latest | SDK para APIs compatíveis com OpenAI |
| `puppeteer` | latest | Automação do Chrome headless |
| `qrcode-terminal` | latest | Renderização do QR Code no terminal |
| `dotenv` | latest | Carregamento de variáveis de ambiente |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Faça um **fork** do projeto
2. Crie sua branch: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona minha feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](LICENSE) para mais informações.

---

<div align="center">

<img src="https://img.shields.io/badge/WhatsApp-Gallego_Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>

*Se esse projeto te ajudou, deixa uma ⭐ no repositório!*

</div>
