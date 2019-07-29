import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAbout(): string {
    return 'Share More API';
  }
}
