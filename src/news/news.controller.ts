import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../config/files.utils';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  private async findAll() {
    return this.newsService.findAll();
  }

  @Get('/:id')
  private async findById(@Param('id') id: number) {
    return this.newsService.findById(id);
  }

  @Get('getByGrup/:grup')
  private async findByGrup(@Param('grup') grup: string) {
    return this.newsService.findByGrup(grup);
  }

  // @Post('/')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // private async create(@Body() data, @UploadedFile() file) {
  //   return this.newsService.create(data, file);
  // }

  @Post('')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  private async createWithSomeImages(@Body() data, @UploadedFiles() files) {
    return this.newsService.createWithSomeImages(data, files);
  }

  @Put('/:id')
  private async update(@Param('id') id: number, @Body() data) {
    return this.newsService.update(id, data);
  }

  @Delete('/:id')
  private async destroy(@Param('id') id: number) {
    return this.newsService.destroy(id);
  }

  @Get('/getPhotosList/:id')
  private async getPhotosList(@Param('id') id: number) {
    return this.newsService.getPhotosList(id);
  }
}
