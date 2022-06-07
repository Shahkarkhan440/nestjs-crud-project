import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
export declare function Match(property: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
