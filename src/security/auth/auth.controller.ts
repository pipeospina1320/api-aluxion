import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/services/mail.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailService,
  ) {}

  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credentials are not valid' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: 201, description: 'user created', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('forgot-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    const { email } = recoverPasswordDto;
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    this.mailService.sendUserConfirmation(email, token);
  }
}
