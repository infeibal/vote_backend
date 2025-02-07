import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VoteService } from './vote.service';
import { CreateVoteDTO, UpdateVoteDTO } from './dto/vote.dto';
import { VoteEntity } from './entities/vote.entity';

@ApiTags('Голосования')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @ApiOperation({ summary: 'Возвращает множество голосований' })
  @ApiOkResponse({
    description: 'Множество голосований',
  })
  @Get()
  private async findAll(): Promise<VoteEntity[]> {
    return this.voteService.findAll();
  }

  @Get('getAllByGrup/:grup')
  private async getAllByGrup(
    @Param('grup') grup: string,
  ): Promise<VoteEntity[]> {
    return this.voteService.getAllByGrup(grup);
  }

  @ApiOperation({ summary: 'Возвращает голосование' })
  @ApiOkResponse({
    description: 'Голосование, согласно заданному запросу',
  })
  @ApiNotFoundResponse({ description: 'Запрошенное голосование не найдено' })
  @Get(':id')
  private async findById(@Param('id') id: number): Promise<VoteEntity> {
    return this.voteService.findById(id);
  }

  @ApiOperation({ summary: 'Создает голосование' })
  @ApiOkResponse({
    description: 'Созданное голосование в соответствии заданному запросу',
  })
  @Post()
  private async create(@Body() data: CreateVoteDTO): Promise<VoteEntity> {
    return this.voteService.create(data);
  }

  @ApiOperation({ summary: 'Возвращает голосование' })
  @ApiOkResponse({
    description: 'Голосование, согласно заданному запросу',
  })
  @ApiNotFoundResponse({ description: 'Запрошенное голосование не найдено' })
  @Get('toVote/:voteId/:userId/:elected')
  private async toVote(
    @Param('voteId') voteId: number,
    @Param('userId') userId: number,
    @Param('elected') elected: string,
  ) {
    return this.voteService.toVote(voteId, userId, elected);
  }

  @ApiOperation({ summary: 'Обновляет запрашиваемое голосование' })
  @ApiOkResponse({ description: 'Обновленное голосование' })
  @ApiNotFoundResponse({ description: 'Запрашиваемое голосование не найдено' })
  @Put(':id')
  private async update(
    @Param('id') id: number,
    @Body() data: UpdateVoteDTO,
  ): Promise<VoteEntity> {
    return this.voteService.update(id, data);
  }

  @ApiOperation({ summary: 'Удаляет запрашиваемое голосование' })
  @ApiOkResponse({ description: 'Удаленное голосование' })
  @ApiNotFoundResponse({ description: 'Запрашиваемое голосование не найдено' })
  @Delete(':id')
  private async destroy(@Param('id') id: number): Promise<VoteEntity> {
    return this.voteService.destroy(id);
  }

  @Get('getWinner/:id')
  private async getWinner(@Param('id') id: number) {
    return this.voteService.getWinner(id);
  }

  @Get('getVotesCountByEmail/:voteId/:email')
  private getVotesCountByEmail(
    @Param('email') email: string,
    @Param('voteId') voteId: number,
  ) {
    return this.voteService.getVotesCountByEmail(email, voteId);
  }

  @Get('getVotesByGrup/:voteId/:grup')
  private getVotesByGrup(
    @Param('voteId') voteId: number,
    @Param('grup') grup: string | number,
  ) {
    return this.voteService.getVotesByGrup(voteId, grup);
  }
}
