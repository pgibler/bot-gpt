# Bot-GPT

A discord bot for sending prompts to the GPT systems using the OpenAI API.

## Prerequisites

- [NodeJS](https://github.com/nodejs/node)

## Usage

1. Checkout the repo `git clone https://github.com/pgibler/bot-gpt`
2. Add a bot in your discord developer portal. Ask ChatGPT for help how to do this.
3. Get the Discord bot API key & bot invite URL and use it in the next step.
4. Create a .env in your `bot-gpt` folder using the `.env.example` file.
5. Add in the API key for Discord bot, your OpenAI API key, and your Discord server ID you want to deploy it in.
6. Invite the bot to your server using the bot invite URL from step 3.
7. Run the bot file using `node bot.js`

Once the bot is in your server and the bot.js file is running, you can send commands to it using the following format

`/gpt Your prompt here`

Then watch the GPT magic happen!