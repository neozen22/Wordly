import { CommandType } from "../typings/Command";

export class Command {
    constructor(commandoptions: CommandType){
        Object.assign(this, commandoptions);
    }
}