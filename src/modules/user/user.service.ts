import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // 1. 생성
    async create(dto: CreateUserDto): Promise<User> {
        const created = new this.userModel(dto);
        return created.save();
    }

    // 2. 전체 조회
    async findAll(): Promise<UserDto[]> {
        const users = await this.userModel
            .find({}, { name: 1, email: 1, age: 1, roles: 1 })
            .lean()
            .exec();
        const newUsers: UserDto[] = users.map((user) => {
            return {
                name: user.name,
                email: user.email,
                age: user.age,
                roles: user.roles,
            };
        });
        return newUsers;
    }

    // 3. 단건 조회
    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('User 없음 ㅠ');
        return user;
    }

    // 4. 업데이트
    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const updated = await this.userModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated) throw new NotFoundException('User 없음 ㅠ');
        return updated;
    }

    // 5. 삭제
    async remove(id: string): Promise<void> {
        const res = await this.userModel.findByIdAndDelete(id).exec();
        if (!res) throw new NotFoundException('User 없음 ㅠ');
    }
}
