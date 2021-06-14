import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

  constructor() {}

  fillObjectWithDetails  (requestObject  : any , modelObject : any) {
    for (const [key, value] of Object.entries(requestObject)) {
      if(modelObject.hasOwnProperty(key)) modelObject[`${key}`] = value;
    }
    return modelObject;
  }


}
