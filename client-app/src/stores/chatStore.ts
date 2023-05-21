import agent from "../api/agent";
import { Chat } from "../models/chat";
import { action, makeAutoObservable, runInAction } from "mobx";
import { DetailedChat } from "../models/detailedChat";
import { CreateFormValues } from "../common/forms/createFormValues";
import { Message } from "../models/message";
import { history } from "..";

export default class ChatStore {
    chats: Chat[] | null = [];
    isLoading = false;
    selectedChat: Chat | undefined = undefined;
    detailedChatLoaded: DetailedChat | undefined = undefined;
    searchedChats: Chat[] | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    loadChats = async () => {
        this.isLoading = true;

        try {
            const result = await agent.Chats.list();
            runInAction(() => {
                this.chats = [...result];
                this.isLoading = false;
            })
            console.log("chats loaded");
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            })
            console.log("Error loading chats", error);
        }

    }

    joinChat = async (chatId: string) => {
        try {
            await agent.Chats.join(chatId);
            history.push(`/chats/${chatId}`);
        } catch (error) {
            console.log(error);
        }
    }

    searchChats = async (chatTitle: string) => {
        try {
            var result = await agent.Chats.search(chatTitle);
            console.log("CHATS SEARCHED", result);
            runInAction(() => this.searchedChats = result);
        } catch (error) {
            console.log(error);
        }
    }

    clearSearchedChats = () => {
        this.searchedChats = [];
    }

    selectChat = (id: string) => {
        const chat = this.chats?.find(x => x.id === id);
        this.selectedChat = chat;
    }

    loadChat = async (chatId: string) => {
        try {
            const result = await agent.Chats.details(chatId);
            runInAction(() => this.detailedChatLoaded = result);


        } catch (error) {
            console.log(error);
        }
    }

    createChat = async (values: CreateFormValues) => {
        try {
            console.log(values);
            await agent.Chats.create(values);

            //history.push(на homepage);

        } catch (error) {
            throw error;
        }
    }
}