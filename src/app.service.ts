import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'jangsen bank!';
  }

  // @Cron('* * * * * *')
  test() {
    return console.log('스케줄러 테스트');
  }
}
