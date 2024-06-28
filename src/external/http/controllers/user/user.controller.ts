import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { CreateUserBody } from '@external/http/dtos/user/create-user-body';
import { UserViewModel } from '@external/http/view-models/user/user-created-view-model';
import { UserEmailAlreadyInUse } from '@app/use-cases/user/errors/user-email-already-in-use-error';
import { UpdateUserBody } from '@external/http/dtos/user/update-user-body';
import { UserNotFound } from '@app/use-cases/user/errors/user-not-found-error';
import { UserAlreadyDeleted } from '@app/use-cases/user/errors/user-already-deleted-error';
import { UserService } from '@app/use-cases/user/user.service';
import { IsPublic } from '@app/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@app/entities/user/user';
import { JwtService } from '@nestjs/jwt';

interface GetUserByIdWithTokenRequest {
  user: User
}
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService, private jwt: JwtService) {}
  @IsPublic()
  @Post()
  async create(@Body() body: CreateUserBody) {

    const { name, email, password, company_id, user_cpf, user_level } = body;
    try {
      const { user } = await this.userService.create({
        name,
        email,
        password,
        company_id,
        user_cpf,
        user_level
      });
  
      return { message: 'Usuário criado com sucesso!' }
    } catch (error) {
      console.log('Erro:', error);
      console.log('Tipo do erro:', error.constructor.name);
      if (error instanceof UserEmailAlreadyInUse) {
        
        throw new HttpException('Este email de usuário já está em uso.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
//     if (!body || Object.keys(body).length === 0) {
//       throw new HttpException('At least one of the fields (email, name, or password) must be provided.', HttpStatus.BAD_REQUEST);
//     }
//     try {
//       const { name, email, password } = body;
//       await this.userService.update({
//         id,
//         name,
//         email,
//         password
//       }); 
//       return;
//     } catch (error) {
//       if (error instanceof UserNotFound) {
//         throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
//       } else {
//         throw error;
//       }
//     }
//   };

//   @Get('')
//   async get(@Request() req: any) {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = this.jwt.decode(token).sub
//     const id = decodedToken
//     try {
//     const { user } =  await this.userService.getById({ id });
//     return { user: UserViewModel.toHTTP(user) }
//     } catch (error) {
//       if (error instanceof UserNotFound) {
//         throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
//       } else {
//         throw error;
//       }
//     }
//   };
//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     try {
//       await this.userService.deleteById({ id });
//     } catch (error) {
//       if (error instanceof UserNotFound) {
//         throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
//       } else if (error instanceof UserAlreadyDeleted) {
//         throw new HttpException('This user has already been deleted.', HttpStatus.BAD_REQUEST);
//       } else {
//         throw error;
//       }
//     }
//   }
}
