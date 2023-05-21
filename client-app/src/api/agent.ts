import axios, { AxiosResponse } from "axios";
import { Chat } from "../models/chat";
import { DetailedChat } from "../models/detailedChat";
import { CreateFormValues } from "../common/forms/createFormValues";
import { LoginFormValues, RegisterFormValues, User } from "../models/user";
import { store } from "../stores/store";
import { Profile } from "../models/profile";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "http://localhost:5286/api";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Chats = {
    list: () => requests.get<Chat[]>("/chats"),
    details: (id: string) => requests.get<DetailedChat>(`/chats/${id}`),
    create: (values: CreateFormValues) => requests.post("/chats", values),
    join: (chatId: string) => requests.post(`/chats/join/${chatId}`, {}),
    search: (chatTitle: string) => requests.get<Chat[]>(`chats/search/${chatTitle}`)
};

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: LoginFormValues) => requests.post<User>('/account/login', user),
    register: (user: RegisterFormValues) => requests.post<User>('/account/register', user)
};

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`)
};

const agent = {
    Account,
    Chats,
    Profiles
};

export default agent;