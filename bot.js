require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { DISCORD_TOKEN, OPENAI_API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', async () => {
  client.guilds.cache.forEach(async (guild) => {
    await registerCommands(guild);
  });
})

client.on('guildCreate', async guild => {
  await registerCommands(guild)
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.commandName;

  if (command === 'gpt') {
    try {
      await interaction.deferReply();

      // Parse conversation ID from the command options
      const prompt = interaction.options.getString('prompt');

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false,
      });

      const responseMessage = response.data.choices[0].text;

      // Output messages to Discord channel
      await interaction.editReply(responseMessage);
    } catch (error) {
      console.error(error);
      await interaction.reply('Error retrieving messages from OpenAI API.');
    }
  }
});

client.login(DISCORD_TOKEN);

async function registerCommands(guild) {
  const commandData = {
    name: 'gpt',
    description: 'Send a prompt to OpenAI and get a response.',
    options: [
      {
        name: 'prompt',
        type: 'STRING',
        description: 'The prompt to send to OpenAI',
        required: true,
      },
    ],
  };

  const commandManager = guild.commands;
  const command = await commandManager.create(commandData);

  console.log(`Guild: ${guild.name} - Registered slash command: ${command.name}. `);
}