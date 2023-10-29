import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StautsOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any){

        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status optins!`)
        }

        return value;
    }

    private isStatusValid(status: any){
        const index = this.StautsOptions.indexOf(status);
        return index !== -1;
    }
}