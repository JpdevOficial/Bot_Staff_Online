# 🛰️ Jpdev Staff Online Bot

![GitHub repo size](https://img.shields.io/github/repo-size/JpdevOficial/Bot_Staff_Online?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/JpdevOficial/Bot_Staff_Online?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/JpdevOficial/Bot_Staff_Online?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/JpdevOficial/Bot_Staff_Online?style=for-the-badge)

> Um bot funcional para monitoramento de Staffs online no Discord, com atualizações dinâmicas via Embed.

## 📌 Funcionalidades

✅ Monitora canais de voz para verificar se há Staffs disponíveis  
✅ Atualiza automaticamente um Embed informativo em um canal configurado  
✅ Exibe número de Staffs online e fornece acesso ao canal de suporte  
✅ Personalização via arquivo JSON de configuração  
✅ Atualizações a cada minuto ou em tempo real com movimentação de usuários  

---

## 🖥️ Demonstração

Exemplo de Embed gerado:

![Exemplo de Embed](https://i.imgur.com/CMgKcpV.png)

---

## ⚙️ Configuração

Edite o arquivo `Jpdev_cfg.json` com os IDs e URLs correspondentes do seu servidor:

```json
{
  "targetChannelId": "ID_DO_CANAL_ONDE_O_EMBED_APARECE",
  "monitoredChannelId": "ID_DO_CANAL_DE_VOZ_DOS_STAFFS",
  "supportChannelId": "ID_DO_CANAL_DE_SUPORTE",
  "bannerImage": "URL_DO_BANNER",
  "thumbnailIcon": "URL_DO_ICONE",
  "TOKEN": "TOKEN_DO_SEU_BOT"
}
