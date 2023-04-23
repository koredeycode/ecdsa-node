const express = require("express");
const { verifyMessage } = require("./verify");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03657043980622b0047f9bd539c9b1247b1a14f9c98080a54ce1d34b4dc124426d": 100,
  "022b14cf28fe6a896acb319aa3fa06491629348705ce4dc051db3fb00a8ac113cb": 50,
  "03f4fc81ab3fb3d201ae09ef0314b53277c1c570125ff6ac659b43db911f0a0308": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { data, signature } = req.body;
  const { address, recipient, amount } = data;
  const sender = address;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (!verifyMessage(signature, data, sender)) {
    res.status(400).send({ message: "Signature is not valid!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
