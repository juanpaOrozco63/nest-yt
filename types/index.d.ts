declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        DB_HOST: String;
        DB_PORT: number;
        DB_USER: string;
        DB_PASSWORD:string
        DB_NAME :string;
}
}