import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Result } from '../../../models/Result';
import { ConfigService } from '@nestjs/config';
import CommonException from '../../../models/CommonException';
import ErrorCodes from '../../../utils/ErrorCodes';
import { UploadImageMetadata } from './requests/UploadImageMetadata';




@Injectable()
export class ImageService {


  constructor(private configService: ConfigService) {}



  public async uploadImageToAws (file : any ,request : UploadImageMetadata) :  Promise<Result> {


    const filePathKey = `${request.folderName}/${request.subFolderName}/${request.fileName}`;

    const AWS_S3_BUCKET_NAME = this.configService.get("AWS_S3_BUCKET_NAME");

    const s3 = new AWS.S3({
      accessKeyId : this.configService.get("AWS_ACCESS_KEY_ID") ,
      secretAccessKey : this.configService.get("AWS_SECRET_ACCESS_KEY") ,
    });


    const params  = {
      Body : file.buffer ,
      Bucket : AWS_S3_BUCKET_NAME ,
      Key  : filePathKey
    }

    let signedURL = "url"
    await  s3
      .putObject(params)
      .promise()
      .then(
        data => {
          signedURL =  this.configService.get("AWS_S3_BASE_URL") + filePathKey
        } ,
        err => {
          throw new CommonException(ErrorCodes.AWS_IMAGE_UPLOAD_FAILED)
        }
      )
    return Result.success(signedURL);
  }

}
