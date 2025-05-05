import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './database/schema/user.schema';
import { PostSchema } from './database/schema/post.schema';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:1234@localhost:27017/mydb?authSource=admin',
      {
        autoCreate: true, // 앱 시작할 때 스키마 기반으로 컬렉션 생성
        autoIndex: true, // 스키마에 정의된 인덱스도 같이 생성
      },
    ),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
