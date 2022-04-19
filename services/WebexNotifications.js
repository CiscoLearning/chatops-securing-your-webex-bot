export class WebexNotifications {
    constructor(appConfig) {
        this.botToken = appConfig.botToken;
    }

    async sendNotification(messageBody, success=false) {
        // we'll start a response by tagging the person who created the message
        let responseToUser = `<@personEmail:${messageBody.data.personEmail}>`;
        // determine if the notification is being sent due to a successful or failed authz check
        if (success === false) {
            responseToUser += ` Uh oh! You're not authorized to make requests.`;
        } else {
            responseToUser += ` Thanks for your message!`;
        }
        // send a message creation request on behalf of the Bot
        const res = await fetch("https://webexapis.com/v1/messages", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.botToken}`
            },
            method: "POST",
            body: JSON.stringify({
                roomId: messageBody.data.roomId,
                markdown: responseToUser
            })
        });
        return res.json();
    }
}
