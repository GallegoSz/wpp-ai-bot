import wpp from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import { getPuppeteerConfig } from "./get-puppeteer-config.js"
import { askAI, askForSummary } from "./groq.js"

const localAuthConfiguration = {
    dataPath: '../wpp'
}

const puppeteerConfig = getPuppeteerConfig()

const wppClientConfiguration = {
    authStrategy: new wpp.LocalAuth(localAuthConfiguration),
    puppeteer: puppeteerConfig,
}

const cliente = new wpp.Client(wppClientConfiguration)

const cooldown = new Map()
const COOLDOWN_TIME = 5000

const conversations = new Map()
const MAX_HISTORY = 8
const SUMMARY_TRIGGER = 12


cliente.on("qr", function(qr) {
    qrcode.generate(qr, { small: true })
})


cliente.on("ready", async function() {
    console.log("BOT Conectado")
})


cliente.on("message", async function(message) {

    if (message.fromMe) return
    if (!message.body) return

    const isGroup = message.from.includes("@g.us")

    let pergunta = message.body.trim()

    if (isGroup) {

        const texto = pergunta.toLowerCase()

        if (!texto.includes("gallego")) return

        pergunta = pergunta.replace(/gallego/gi, "").trim()

        if (!pergunta) return
    }


    if (pergunta.toLowerCase() === "!reset") {
        conversations.delete(message.from)
        return message.reply("Memória apagada.")
    }


    const now = Date.now()
    const lastMessageTime = cooldown.get(message.from)

    if (lastMessageTime && now - lastMessageTime < COOLDOWN_TIME) {
        return
    }

    cooldown.set(message.from, now)


    pergunta = pergunta.slice(0, 1000)


    let history = conversations.get(message.from) || []

    history.push({
        role: "user",
        content: pergunta
    })

    if (history.length >= SUMMARY_TRIGGER) {

        const resumo = await askForSummary(history)

        history = [
            {
                role: "system",
                content: `Resumo da conversa até agora: ${resumo}`
            }
        ]
    }

    if (history.length > MAX_HISTORY) {
        history = history.slice(-MAX_HISTORY)
    }

    conversations.set(message.from, history)

    try {

        const resposta = await askAI(history)

        history.push({
            role: "assistant",
            content: resposta
        })

        conversations.set(message.from, history)

        await message.reply(resposta)

    } catch (error) {
        console.error("Erro geral:", error)
        await message.reply("Erro ao processar sua mensagem.")
    }
})

console.log("BOT Inicializado!")
cliente.initialize()