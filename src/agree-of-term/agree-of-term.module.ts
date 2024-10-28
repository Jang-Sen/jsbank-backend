import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgreeOfTerm } from '@root/agree-of-term/entities/agree-of-term.entity';
import { AgreeOfTermService } from '@root/agree-of-term/agree-of-term.service';
import { AgreeOfTermController } from '@root/agree-of-term/agree-of-term.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AgreeOfTerm])],
  controllers: [AgreeOfTermController],
  providers: [AgreeOfTermService],
})
export class AgreeOfTermModule {}
