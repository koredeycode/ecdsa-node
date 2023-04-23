import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

export function signMessage(data, privateKey) {
  const messageHash = keccak256(utf8ToBytes(JSON.stringify(data)));
  return secp256k1.sign(messageHash, privateKey).toCompactHex();
}
