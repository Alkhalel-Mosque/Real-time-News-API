import { IsString, IsMongoId } from "class-validator";

export class IdParamsDto {
    @IsMongoId() @IsString()
    id: string;
}