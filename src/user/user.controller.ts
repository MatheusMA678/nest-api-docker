import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt'

type UserModel = Omit<User, 'id' | 'created_at' | 'updated_at'>

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get()
  async getUsers() {
    return await this.userService.users({})
  }

  @Post()
  async postUser(@Body() body: UserModel) {
    const { email, name, password, image_url } = body

    const hashedPassword = await hash(password, 8)

    return await this.userService.createUser({
      email,
      name,
      password: hashedPassword,
      image_url
    })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.deleteUser({
      id
    })
  }
}
