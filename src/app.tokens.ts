import { InjectionToken } from "@nestjs/common";

export default class AppTokens {
    static fileService = 'fileService'
	static getPetsUseCase: InjectionToken;
}