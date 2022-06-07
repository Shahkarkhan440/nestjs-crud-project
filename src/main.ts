import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {AccessTokenGuard} from './common/guards/access_token.gaurd'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  //*** This below 2 lines uses for reflector which uses by acces token gaurd but we did via app.module file inside */
  // const reflector = new Reflector()
  // app.useGlobalGuards(new AccessTokenGuard(reflector) )
   //it will global protect all the routes for public non token routes we use meta
  //*** */

  await app.listen(3000); 
}
bootstrap(); 
