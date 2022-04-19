import crypto from "crypto";

export class Auth {
    constructor(appConfig) {
        this.encryptionSecret = appConfig.encryptionSecret;
        this.encryptionAlgorithm = appConfig.encryptionAlgorithm;
        // ADDING AUTHORIZED USERS
        this.authorizedUsers = [
            "colacy@cisco.com"
        ];
    }

    isProperlyEncrypted(signedValue, messageBody) {
        // create an encryption stream
        const hmac = crypto.createHmac(this.encryptionAlgorithm, this.encryptionSecret);
        // write the POST body into the encryption stream
        hmac.write(JSON.stringify(messageBody));
        // close the stream to make its resulting string readable
        hmac.end();
        // read the encrypted value
        const hash = hmac.read().toString('hex');
        // compare the freshly encrypted value to the POST header value
        return hash === signedValue;
    }

    // ADDING AUTHZ CHECK METHOD
    isUserAuthorized(messageBody) {
        return this.authorizedUsers.indexOf(messageBody.data.personEmail) !== -1
    }

}
