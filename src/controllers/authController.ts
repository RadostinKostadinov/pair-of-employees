import { genSalt, hash } from 'bcrypt';
import { Post, JsonController, Body } from 'routing-controllers';
import Container from 'typedi';
import { sign } from 'jsonwebtoken';

import { userDTO } from '@/interfaces/dtos/userDTO';
import { userService } from '@/services/userService';

@JsonController('/auth')
export class authController {
  private userServiceI = Container.get(userService);

  @Post('/login')
  async login(@Body() user: userDTO) {
    const { username, password } = user;

    const storedUser = this.userServiceI.getUser(username);
    if (!storedUser) {
      return 'Invalid username or password';
    }

    const hashedPassword = await hash(
      password,
      storedUser.passwordSalt + process.env.USERS_PASSWORD_SALT
    );

    if (hashedPassword === storedUser.passwordHash) {
      const jwt = sign(
        { username: storedUser.username },
        process.env.JWT_SECRET_KEY as string
      );
      return { username: storedUser.username, accessToken: jwt };
    }

    return 'Invalid username or password';
  }

  @Post('/register')
  async register(@Body() user: userDTO) {
    const { username, password } = user;

    if (this.userServiceI.doesUserExist(user.username)) {
      return 'User already exists';
    }

    const passwordSalt = await genSalt();
    const passwordHash = await hash(
      password,
      passwordSalt + process.env.USERS_PASSWORD_SALT
    );

    this.userServiceI.addUser({
      username,
      passwordHash,
      passwordSalt,
    });

    return 'User created';
  }
}
