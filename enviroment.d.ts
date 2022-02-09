declare global {
    namespace NodeJS {
        interface ProcessEnv {
            bottoken: string;
            guildID: string;
            enviroment: "dev" | "prod" | "debug";
        }
    }
}

export {};