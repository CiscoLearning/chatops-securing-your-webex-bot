import process from 'process';

export class AppConfig {
    constructor() {
        // ADD THE BOT'S TOKEN
        this.botToken = process.env['WEBEX_BOT_TOKEN'];
        // ADD THE ENCRYPTION CHECK VALUES
        this.encryptionSecret = process.env['WEBEX_ENCRYPTION_SECRET'];
        this.encryptionAlgorithm = process.env['WEBEX_ENCRYPTION_ALGO'];
        this.encryptionHeader = process.env['WEBEX_ENCRYPTION_HEADER'];
    }
}
