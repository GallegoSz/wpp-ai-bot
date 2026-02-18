import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
})

export async function askAI(messagesHistory) {

    try {

        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "Você é um assistente inteligente que mantém contexto da conversa. Responda de forma clara, objetiva e no máximo 5 linhas."
                },
                ...messagesHistory
            ],
            temperature: 0.7,
            max_tokens: 400
        })

        const text = completion.choices[0].message.content

        return text

    } catch (error) {

        console.error("Erro ao chamar Groq:", error)

        if (error.status === 429) {
            return "Muitas mensagens enviadas. Aguarde alguns segundos."
        }

        return "Erro ao processar sua mensagem."
    }
}

export async function askForSummary(messagesHistory) {

    try {

        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "Resuma a conversa abaixo de forma clara e curta, mantendo apenas informações importantes para continuidade futura."
                },
                ...messagesHistory
            ],
            temperature: 0.3,
            max_tokens: 200
        })

        return completion.choices[0].message.content

    } catch (error) {
        console.error("Erro ao resumir:", error)
        return "Resumo indisponível."
    }
}