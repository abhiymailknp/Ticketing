import { CustomError } from "./custom-error";

export class BadInputError extends CustomError {

    statusCode: number = 400; 
    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this, BadInputError.prototype)
    }

    serializeErrors(){
        return [{message:this.message}];
    }

}