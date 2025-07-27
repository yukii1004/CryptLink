# CryptLink

## Connection Flow:

1. The server is a `dumb relay` that only forwards encrypted messages from the User to the Bank and vice versa. The server allows a chat session only between one User and one Bank. If a user tries to connect to another user (or bank-to-bank), the server rejects it.

2. The User sends a connection request to the server after they login.

3. The Bank gets shown incoming connection requests from Users by the server. Since the requests are refreshed and shown, the Bank doesn't have to connect before the User to see the incoming requests.

4. The Bank generates a RSA key-pair and sends the public key to the server, which then forwards it to the User.

5. The User upon receiving the public key, also generates a RSA key-pair and sends the public key to the Server, which then forwards it to the Bank.

6. After bth paties have each other's public key, the bank then generates a AES key and Nonce and encrypts it with the User's RSA Public Key, then sends it to the User through the Server.

7. The User then decrypts it using their Private key, and secure key exchange process is complete.

8. Now both parties can encrypt their plaintext with the AES key and then share it over the chat platform.

9. The connection tunnel is terminated after use.

## Sequence diagram:

![Sequence Diagram](./images/Sequence%20diagram.png)

## Example Exchange:

1. User connects via WebSocket with role `user`
2. Server assigns `session_id` and adds to pending queue
3. Bank connects with role `bank` and sees pending user list
4. Bank accepts a user → session established
5. Key Exchange:
   - Public RSA keys exchanged via server relay
   - Bank encrypts AES key using User’s public key
   - AES key is used by both sides for message encryption
6. Secure messaging begins:
   - Each message includes ciphertext, nonce, timestamp
   - Server only relays, does not decrypt

## Cryptographic Protocol Design:

### Key Exchange
- Each client generates an **RSA-3072 keypair** on startup.
- Keys are exchanged through the WebSocket tunnel via server relay.
- After key exchange:
  - Bank generates a random **AES-256-GCM session key**
  - Encrypts AES key with User’s public RSA key
  - Sends it through server → User decrypts using private key

### Secure Messaging
- Messages encrypted with **AES-256-GCM**
- Each message includes:
  - ciphertext
  - nonce
  - auth tag
  - timestamp (for replay protection)

### Replay Protection
- Each message includes a Unix timestamp
- Clients reject messages:
  - If timestamp is too far in the past
  - If nonce was reused

## How Security Goals Are Achieved:

| Security Goal     | Technique Used                                               |
|-------------------|--------------------------------------------------------------|
| Confidentiality   | AES-256-GCM for message encryption                           |
| Integrity         | AES-GCM auth tag; tamper detection                           |
| Authenticity      | Optional RSA signature or role validation via server pairing |
| Replay Resistance | Timestamps + nonce caching                                   |
| E2EE              | RSA key exchange + client-side AES session                   |
| Server Zero Trust | Relay sees no decrypted messages or keys                     |

---

## Limitations and Future Work:

| Limitation                     | Future Work Proposal                                |
|--------------------------------|-----------------------------------------------------|
| Must have both parties online  | Implement local `.msgdb` queue to retry delivery    |
| No persistent sessions         | Add key rotation / forward secrecy with ratcheting  |
| No file transfer support       | Add AES-encrypted file chunking                     |
| Manual reconnection            | Implement session resume with authentication tokens |
| No mobile/web push UX yet      | Build full UI for responsive encrypted chat         |

