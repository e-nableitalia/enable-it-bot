# Telegram Bot for Managing Requests in the e-Nable Italia Group

This project is a Telegram bot developed to assist in managing requests within the e-Nable Italia group. The bot allows users to indicate their availability to handle device creation requests and automatically assigns requests to available users.

## Features

The bot provides the following functionalities:

- `/info`: Displays general information about the bot.
- `/disponibile`: Indicates that the user is available to handle requests.
- `/non_disponibile`: Indicates that the user is no longer available.
- `/help` or `/aiuto`: Displays a list of available commands and a brief description of their functionalities.
- `/richiesta [text]`: Allows users to send a request that will be assigned to the first available user.
- `/community`: Provides information about the e-Nable Italia community.
- `/risorse`: Provides a list of useful resources for community volunteers.

## Requirements

- [Node.js](https://nodejs.org/) v14 or higher.
- A Telegram bot created through [BotFather](https://core.telegram.org/bots#botfather).
- A `.env` file in the project's root directory containing the bot token. Example:

  ```env
  TELEGRAM_BOT_TOKEN=your_telegram_bot_token
