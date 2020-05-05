const cfg = require("../.cfg.json")
const twilio = require("twilio");
const client = new twilio(cfg.sid, cfg.token);

client.messages.create({
    body: "Hello from Node",
    to: cfg.to_phone,
    from: cfg.from_phone,
})
.then((message) => console.log(message.sid));
