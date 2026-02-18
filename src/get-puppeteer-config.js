export function getPuppeteerConfig() {
    return {
        executablePath: "/usr/bin/google-chrome",
        headless: true,
        timeout: 20 * 1000,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
}