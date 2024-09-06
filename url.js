zokou({ nomCom: "url", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { msgRepondu, repondre } = commandeOptions;

  if (!msgRepondu) {
      repondre('mention a image or video');
      return;
  }

  let mediaPath;

  if (msgRepondu.videoMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
  } else if (msgRepondu.imageMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
  } else {
      repondre('mention a image or video');
      return;
  }

  try {
      const telegraphUrl = await uploadToTelegraph(mediaPath);
      fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

      repondre(telegraphUrl);
  } catch (error) {
      console.error('Erreur lors de la création du lien Telegraph :', error);
      repondre('Opps error');
  }
});
