const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); // Carica le variabili di ambiente dal file .env

// Usa la variabile di ambiente per il token del bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Oggetto per tracciare la disponibilità degli utenti
let availableUsers = {};

// Gestisce il comando /info
bot.onText(/\/info/, (msg) => {
    bot.sendMessage(msg.chat.id, "Ciao! Sono un bot per la gestione delle richieste nel gruppo. Usa /aiuto o /help per avere maggiori informazioni su cosa posso fare.");
});

// Gestisce il comando /disponibile
bot.onText(/\/disponibile/, (msg) => {
    availableUsers[msg.from.id] = msg.from.username;
    bot.sendMessage(msg.chat.id, `${msg.from.username} è ora disponibile per gestire le richieste.`);
});

// Gestisce il comando /non_disponibile
bot.onText(/\/non_disponibile/, (msg) => {
    delete availableUsers[msg.from.id];
    bot.sendMessage(msg.chat.id, `${msg.from.username} non è più disponibile.`);
});

// Gestisce i comandi /help e /aiuto
bot.onText(/\/help|\/aiuto/, (msg) => {
    const helpMessage = `
Ciao! Sono il bot assistente di e-Nable Italia :-) sono qui per la gestione delle richieste nel gruppo. Ecco i comandi che puoi utilizzare:

/info - Informazioni sul bot
/community - Informazioni sulla community
/risorse - Fornisce un elenco delle risorse della community
/disponibile - Segnala che sei disponibile per gestire richieste di creazione device
/non_disponibile - Segnala che da questo momento non sei più disponibile a gestire richieste di creazione device
/help o /aiuto - Mostra questo messaggio di aiuto
    `;
    bot.sendMessage(msg.chat.id, helpMessage);
});

// /richiesta [testo] - Invia una richiesta che verrà assegnata a un utente disponibile

// Gestisce il comando /richiesta
bot.onText(/\/richiesta (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const requestText = match[1];

    if (Object.keys(availableUsers).length > 0) {
        // Assegna la richiesta al primo utente disponibile
        const userId = Object.keys(availableUsers)[0];
        const username = availableUsers[userId];

        bot.sendMessage(chatId, `La tua richiesta: "${requestText}" è stata assegnata a @${username}.`);
        bot.sendMessage(userId, `Hai ricevuto una nuova richiesta: "${requestText}"`);
    } else {
        bot.sendMessage(chatId, "Nessun utente disponibile al momento.");
    }
});

// Gestisce il comando /risorse
bot.onText(/\/risorse/, (msg) => {
    const resourcesMessage = `Ecco alcune risorse utili per i volontari:
- [Sito istituzionale di e-Nable Italia](https://e-nableitalia.it)
- [Portale della community mondiale](https://hub.e-nable.org/dashboard)
- [Archivio dei progetti della community su Git-Hub](https://github.com/e-nableitalia)
- [Wiki con la documentazione della community](https://dev.e-nableitalia.it/wiki/)
- [Google drive con il materiale della community](https://drive.google.com/drive/folders/0AIwZ6YMSsQLfUk9PVA)`;

    bot.sendMessage(msg.chat.id, resourcesMessage, {parse_mode: 'Markdown'});
});

bot.onText(/\/community/, (msg) => {
    const communityMessage = `
La community di e-Nable Italia è un gruppo di volontari che si occupa di creare dispositivi di assistenza per chi ne ha bisogno. Puoi trovare maggiori informazioni sul nostro sito web: [e-Nable Italia](https://www.e-nableitalia.it)
    `;
    bot.sendMessage(msg.chat.id, communityMessage);
});

// Gestisce i messaggi che non sono comandi
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const commands = ['/info', '/community', '/disponibile', '/non_disponibile', '/richiesta', '/help', '/aiuto', '/risorse'];
    
    if (commands.some(command => msg.text.startsWith(command))) {
        return; // Ignora questi comandi
    }
    // bot.sendMessage(chatId, 'Non ho capito il comando. Usa /aiuto per vedere i comandi disponibili.');
});
