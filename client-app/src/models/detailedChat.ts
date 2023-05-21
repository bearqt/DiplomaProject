import { Message } from "./message";
import { Profile } from "./profile";

export interface DetailedChat {
    id: string;
    title: string;
    description: string;
    isPrivate: boolean;
    adminUsername: string;
    photo: string;
    createdAt: string;
    messages: Message[];
    members: Profile[];
}