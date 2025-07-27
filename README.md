# CryptLink: End-to-End Encrypted Communication System.

## Overview:

CryptLink is a secure communication platform enabling encrypted, authenticated, and tamper-proof message exchanges. It uses end-to-end encryption (E2EE), digital signatures, and replay protection mechanisms to ensure data security, privacy, and authenticity.

## Features:
- End-to-End Encryption
- Key Exchange
- Digital Signatures
- Replay Attack Prevention (Timestamp + Noances)
- Automatically resume message tranfer in case of failure
- Web based secure chat system

## System Architecture:
![Sequence Diagram](./images/Sequence%20diagram.png)

## How to Run:

```
cd backend
pip install requirements.py
python main.py
```

```
cd frontend
pnpm i 
pnpm run dev
```