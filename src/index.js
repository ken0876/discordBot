const { Client } = require("discord.js");
const client = new Client();
const { token } = require("../config.json");
const say = require("say");
const fs = require("fs");

const prefix = {
  beleidige: "beleidige ",
};

const shit = [
  "Opfer",
  "Hodenkobold",
  "Gesichtsgrätsche",
  "Evolutionsbremse",
  "Intelligenzallergiker",
  "Analbanane",
  "Bratzenprinzessin",
  "Perückenschaf",
  "Steckdosenbefruchter",
  "Telefongesicht",
  "Gehirnakrobat",
  "Arschkrampe",
  "Bucklige Brotspinne",
  "Klotaucher",
  "Fratzengulasch",
  "Clerasiltestgelände",
  "Pimmelotter",
  "Popelnascher",
  "Schwingtitte",
  "Analdelfin"
];

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function getRandomShit() {
  let random = Math.floor(Math.random() * shit.length);
  return shit[random];
}

client.on("message", async (msg) => {
  if (!msg.channel.type == "dm") return;
  if (!msg.content.toLowerCase().startsWith(prefix.beleidige)) {
    console.log("Wrong Prefix - " + msg.content.toLowerCase());
    return;
  }

  const guild = client.guilds.cache.first();
  const user = await guild.members.fetch(msg.author);
  if (!user.voice.channel) {
    message.reply("You need to join a voice channel first!");
    return;
  }
  const victim = msg.content.slice(prefix.beleidige.length).toLowerCase();
  var shit = getRandomShit();

  await saveWAV(victim);

  const voiceConnection = await user.voice.channel.join();
  const wav = `./resources/beleidigungen/${victim}/${shit}.wav`;
  const dispatcher = voiceConnection.play(wav);
  dispatcher.setVolume("2");
  dispatcher.on("error", err => console.log(err))
});

async function saveWAV(victim) {
  if (fs.existsSync(`./resources/beleidigungen/${victim}/`)) {
    return;
  } else {
    fs.mkdir(`./resources/beleidigungen/${victim}/`, null, (err, path) => console.log(err + "at " + path));
    shit.forEach(shit =>
      say.export(
        `${victim}, du ${shit}`,
        null,
        1,
        `./resources/beleidigungen/${victim}/${shit}.wav`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      ))
  }
}

client.login(token);