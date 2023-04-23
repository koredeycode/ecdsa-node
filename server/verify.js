const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function verifyMessage(signature, data, publicKey) {
  const messageHash = keccak256(utf8ToBytes(JSON.stringify(data)));
  return secp256k1.verify(signature, messageHash, publicKey);
}
module.exports = { verifyMessage };

// for (let i = 0; i < 3; i++) {
//   const privateKey = secp256k1.utils.randomPrivateKey();
//   console.log("Priv:", toHex(privateKey));
//   const publicKey = secp256k1.getPublicKey(privateKey);
//   console.log("Pub:", toHex(publicKey));
// }

// Priv: 926abd704842e1ece2ee2f23e26b5a54987f11d2c7623978a64a86063f3bdfa3
// Pub: 03657043980622b0047f9bd539c9b1247b1a14f9c98080a54ce1d34b4dc124426d
// Priv: b4359a9e40e1d9248e7c5d8c941689348a99db6b333f6104411a68ac5c2d3f08
// Pub: 022b14cf28fe6a896acb319aa3fa06491629348705ce4dc051db3fb00a8ac113cb
// Priv: 50b107fd956ac571b9c3e1d22c16d0f50501ed5db69eabb23ba5ade084a6e37d
// Pub: 03f4fc81ab3fb3d201ae09ef0314b53277c1c570125ff6ac659b43db911f0a0308
