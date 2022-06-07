import { SetMetadata } from "@nestjs/common";

export const isPublicRoute = () => SetMetadata('isPublicRoute', true) 