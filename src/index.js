import wpp from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import { getPuppeteerConfig } from "./get-puppeteer-config.js"
import { askAI, askForSummary } from "./groq.js"

const localAuthConfiguration = { dataPath: '../wpp' }
const puppeteerConfig = getPuppeteerConfig()

const cliente = new wpp.Client({
    authStrategy: new wpp.LocalAuth(localAuthConfiguration),
    puppeteer: puppeteerConfig,
})

const cooldown = new Map()
const conversations = new Map()

const COOLDOWN_TIME = 5000
const SUMMARY_TRIGGER = 12
const RECENT_MESSAGES = 4

cliente.on("qr", (qr) => qrcode.generate(qr, { small: true }))
cliente.on("ready", () => console.log("✅ BOT Conectado!"))

cliente.on("message", async (message) => {
    if (message.fromMe) return
    
    const msgTimestamp = message.timestamp * 1000
    if (Date.now() - msgTimestamp > 120000) return

    if (message.isStatus || !message.body) return

    const isGroup = message.from.includes("@g.us")
    let pergunta = message.body.trim()

    if (isGroup) {
        if (!pergunta.toLowerCase().includes("gallego")) return
        pergunta = pergunta.replace(/gallego/gi, "").trim()
        if (!pergunta) return
    }

    if (pergunta.toLowerCase() === "!reset") {
        conversations.delete(message.from)
        return message.reply("🧹 Memória apagada.")
    }

    const now = Date.now()
    const lastTime = cooldown.get(message.from)
    if (lastTime && (now - lastTime < COOLDOWN_TIME)) return
    cooldown.set(message.from, now)

    pergunta = pergunta.slice(0, 1000)
    let history = conversations.get(message.from) || []

    history.push({ role: "user", content: pergunta })

    if (history.length >= SUMMARY_TRIGGER) {
        console.log(`[${message.from}] Sumarizando histórico antigo...`)
        const recent = history.slice(-RECENT_MESSAGES)
        const oldMessages = history.slice(0, -RECENT_MESSAGES)

        try {
            const resumo = await askForSummary(oldMessages)
            history = [
                { role: "system", content: `Contexto anterior: ${resumo}` },
                ...recent
            ]
        } catch (e) {
            history = recent
        }
    }

    conversations.set(message.from, history)

    try {
        const resposta = await askAI(history)
        
        history.push({ role: "assistant", content: resposta })
        conversations.set(message.from, history)

        await message.reply(resposta)
    } catch (error) {
        console.error("Erro geral:", error)
        await message.reply("❌ Erro ao processar.")
    }
})

console.log("🚀 Inicializando...")
cliente.initialize()