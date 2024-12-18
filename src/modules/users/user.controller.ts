import { Request, Response } from 'express';
import { validation } from '../../utilites';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UserService } from './user.service';

const UserController = {
  registration(req: Request, res: Response) {
    const dto = validation(RegistrationUserDto, req.body);

    const result = UserService.registration(dto);

    res.json(result);
  },
};

export default UserController;
