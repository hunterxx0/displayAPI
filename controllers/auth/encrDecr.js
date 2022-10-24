// Encryption and Decryption module
import { Buffer } from 'node:buffer';
import * as crypto from 'crypto';

const encryption = process.env.ENCRYPT;
const key = Buffer.from(process.env.ENCRYPT_KEY, 'hex');
const iv = Buffer.from(process.env.IV, 'hex');

export function encrDecr(word, Operation = 'encode') {
    if (encryption && key && iv &&
        (Operation === 'encode' || Operation === 'decode')) {
        let encrypted = word;
        if (Operation === 'decode') return decrypt(encrypted)
        return encrypt(encrypted);

    } else return null;

}


//Encrypting text
function encrypt(text) {
    let cipher = crypto.createCipheriv(encryption, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}


// Decrypting text
function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
