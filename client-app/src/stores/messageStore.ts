import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Message, MessageBody } from "../models/message";

export default class MessageStore {
    hubConnection: HubConnection | null = null;
    messages: Message[] | null = null;

    /**
     *
     */
    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (chatId: string) => {
        if (store.chatStore.detailedChatLoaded) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5286/chatHub" + "?chatId=" + chatId, {
                    accessTokenFactory: () => {

                        return store.userStore.user?.token!;
                    }
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            this.hubConnection.start().catch(error => console.log("error establising the conneection: ", error));

            // this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
            //     runInAction(() => {
            //         comments.forEach(comment => {
            //             comment.createdAt = new Date(comment.createdAt + 'Z');
            //         })
            //         this.comments = comments;
            //     } )
            // })

            this.hubConnection.on("LoadMessages", (messages: Message[]) => {
                runInAction(() => {
                    this.messages = messages;
                });
            });

            this.hubConnection.on("ReceiveMessage", (message: Message) => {
                runInAction(() => {
                    console.log("MESSAGE RECEIVED", message);
                        this.messages!.push(message);
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error stopping connection: ", error));
    }

    clearMessages = () => {
        // store.chatStore.detailedChatLoaded?.messages.clear();
        this.stopHubConnection();
    }

    addMessage = async (messageBody: string) => {
        const message = new MessageBody(messageBody, store.chatStore.detailedChatLoaded?.id!);

        try {
            await this.hubConnection?.invoke("SendMessage", message);

        }
        catch (error) {
            console.log(error);
        }
    }
}