import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '@bank/entities/bank.entity';
import { BankController } from '@bank/bank.controller';
import { BankService } from '@bank/bank.service';
import { MinioClientModule } from 'minio-client/minio-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bank]), MinioClientModule],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
