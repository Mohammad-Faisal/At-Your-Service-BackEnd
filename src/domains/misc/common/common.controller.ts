import {  Controller, HttpService, Post, Res } from '@nestjs/common';
import { SuccessResponse } from '../../../models/SuccessResponse';
import {  ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags("Common")
@Controller('common')
export class CommonController {

  constructor(private httpService: HttpService , private configService: ConfigService) {}

  @Post('produceHttpCall')
  async getIdToken(@Res() response) {

    const body ={
      email : "imransk96277@gmail.com",
      password :"123456" ,
      returnSecureToken : "true"
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.configService.get('FIREBASE_WEB_API_KEY')}`

    let idTokenResponse: any   = ""
    await this.httpService.post(url , body).subscribe(( signInResponse: any ) => {
      idTokenResponse  = signInResponse.data.idToken;
      response.json(new SuccessResponse(idTokenResponse));
    });
  }


}
