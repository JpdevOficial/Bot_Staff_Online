const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./Jpdev_cfg.json', 'utf8'));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates 
    ]
});

let lastMessageId = null;

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    await startMonitoring();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    const isRelevantChange =
        (oldState.channelId === config.monitoredChannelId || newState.channelId === config.monitoredChannelId) &&
        oldState.channelId !== newState.channelId;

    if (isRelevantChange) {
        console.log('Movimentação detectada no canal monitorado. Atualizando embed...');
        await updateStatusMessage();
    }
});

async function startMonitoring() {
    const targetChannel = client.channels.cache.get(config.targetChannelId);
    if (!targetChannel) {
      console.error('Canal de destino não encontrado!');
      return;
    }
  
    try {
      const messages = await targetChannel.messages.fetch({ limit: 100 });
      const botMessages = messages.filter(msg => msg.author.id === client.user.id);
      for (const message of botMessages.values()) {
        await message.delete().catch(err => console.error('Erro ao apagar mensagem antiga:', err));
      }
      lastMessageId = null;
    } catch (error) {
      console.error('Erro ao buscar/apagar mensagens antigas:', error);
    }
  
    await updateStatusMessage();
    setInterval(updateStatusMessage, 60 * 1000);
}

async function updateStatusMessage() {
    const targetChannel = client.channels.cache.get(config.targetChannelId);
    if (!targetChannel) {
      console.error('Canal de destino não encontrado!');
      return;
    }
  
    const embed = getSupportEmbed();
  
    try {
      if (lastMessageId) {
        const lastMessage = await targetChannel.messages.fetch(lastMessageId).catch(() => null);
        if (lastMessage) {
          await lastMessage.edit({ content: '||@here||', embeds: [embed] });
        } else {
          const newMessage = await targetChannel.send({ content: '||@here||', embeds: [embed] });
          lastMessageId = newMessage.id;
        }
      } else {
        const newMessage = await targetChannel.send({ content: '||@here||', embeds: [embed] });
        lastMessageId = newMessage.id;
      }
    } catch (error) {
      console.error('Erro ao atualizar a mensagem:', error);
    }
}

function getSupportEmbed() {
    const embed = new EmbedBuilder()
      .setTitle('✨ Suporte da Cidade: Online!')
      .setColor('#00BFFF')
      .setImage(config.bannerImage)
      .setThumbnail(config.thumbnailIcon)
      .setFooter({ text: 'Conecte-se agora! ⚡️ | Atualizado em' })
      .setTimestamp();
  
    const supportChannel = client.channels.cache.get(config.supportChannelId);
    const monitoredChannel = client.channels.cache.get(config.monitoredChannelId);
  
    if (!supportChannel || !supportChannel.isVoiceBased()) {
      embed
        .setDescription('⚠️ **Erro**: Canal de suporte não encontrado. Contate um administrador.')
        .setColor('#FF0000');
      return embed;
    }
  
    if (!monitoredChannel || !monitoredChannel.isVoiceBased()) {
      embed
        .setDescription('⚠️ **Erro**: Canal monitorado não encontrado. Contate um administrador.')
        .setColor('#FF0000');
      return embed;
    }
  
    const memberCount = monitoredChannel.members.size;
    if (memberCount > 0) {
      const staffText = memberCount === 1 ? 'Staff' : 'Staffs';
      embed
        .setDescription('**Sistema de Ajuda e Monitoramento!**')
        .addFields(
          { name: '🌌 Status', value: `**Temos ${memberCount} ${staffText} Ativos**`, inline: true },
          { name: '📡 Suporte', value: `Entre no canal ${supportChannel} para ajuda imediata!`, inline: true },
          { name: '─ Informações ─', value: 'Nossa equipe está pronta para te ajudar na Cidade!' }
        );
    } else {
      embed
        .setDescription('**Sistema de Ajuda e Monitoramento!**')
        .addFields(
          { name: '🌌 Status', value: `**Nenhum Staff Disponível**`, inline: true },
          { name: '📡 Suporte', value: `Entre no canal ${supportChannel} e aguarde!`, inline: true },
          { name: '─ Informações ─', value: 'Volte em breve ou aguarde um Staff!' }
        );
    }
  
    return embed;
}

client.login(config.TOKEN);