export interface Profile {
    userName: string | null;
    displayName: string;
    bio: string;
}

export class Profile implements Profile {
    /**
     *
     */
    constructor(userName: string, displayName: string) {
        this.userName = userName;
        this.displayName = displayName;
    }
}