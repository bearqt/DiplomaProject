export interface Message {
    id: string;
    authorDisplayName: string;
    authorUsername: string;
    chatId: string;
    body: string;
    createdAt: string;
}

export class MessageBody {
    body: string;
    chatId: string;

    constructor(body: string, chatId: string) {
        this.body = body;
        this.chatId = chatId;
    }
}