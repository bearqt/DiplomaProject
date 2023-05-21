import { createContext, useContext } from "react";
import ChatStore from "./chatStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import MessageStore from "./messageStore";

interface Store {
    chatStore: ChatStore,
    commonStore: CommonStore,
    userStore: UserStore,
    profileStore: ProfileStore,
    messageStore: MessageStore
}

export const store : Store = {
    chatStore: new ChatStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
    messageStore: new MessageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}