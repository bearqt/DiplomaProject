import { makeAutoObservable, runInAction } from "mobx";
import { LoginFormValues, RegisterFormValues, User } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "..";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: LoginFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/");
            console.log("User successfully logged in!", this.user);
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: RegisterFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/');

        } catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {
               
                this.user = user;
            });

        } catch (error) {
            console.log(error);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }


}