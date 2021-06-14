import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuccessResponse } from '../../../models/SuccessResponse';
import { UploadImageMetadata } from './requests/UploadImageMetadata';

@ApiHeader({name :"authtoken"})
@ApiTags("Image")
@Controller('image')
export class ImageController {

  constructor(private imageService: ImageService ) {}

  @Post('uploadSingle')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        folderName : { type : 'string' , },
        subFolderName : { type : 'string' } ,
        fileName : { type : 'string' },
      },
    },
    description :"the image should be multipart form data"
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleFile(@UploadedFile() image: any , @Body() request : UploadImageMetadata  , @Res() response) {
    const result = await this.imageService.uploadImageToAws(image ,request );
    return  response.json(new SuccessResponse(result.getValue()));
  }
}
