import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class UploadImageMetadata {


  @ApiModelProperty()
  @IsNotEmpty()
  folderName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  subFolderName: string;


  @ApiModelProperty()
  @IsNotEmpty()
  fileName: string;


}