import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length, MaxLength, isString } from "class-validator"

export default class UpdatePetControllerInput {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	type: string;

	@IsString()
	@IsNotEmpty()
	size: string;

	@IsString()
	@IsNotEmpty()
	gender: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1024)
	bio: string;
}