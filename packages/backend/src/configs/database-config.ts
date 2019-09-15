import { ConfigBase } from "cardboard-config";

export class DatabaseConfig extends ConfigBase {
    public username: string = "";
    public password: string = "";
    public url: string = "mongodb://localhost/tutoring-hub";
    public useNewUrlParser: boolean = true;
}
