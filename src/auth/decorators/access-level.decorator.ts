import { SetMetadata } from "@nestjs/common";
import { ACCCESS_LEVEL_KEY } from "src/constants/key-decorators";

export const AccessLevel = (level:number) => SetMetadata(ACCCESS_LEVEL_KEY,level)