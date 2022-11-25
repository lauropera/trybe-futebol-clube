import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserController } from '../interfaces/IUser';
import { UserService } from '../services';

class UserController implements IUserController {
  private _service: UserService;

  constructor() {
    this._service = new UserService();

    this.login = this.login.bind(this);
    this.getRole = this.getRole.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    const token = await this._service.login(req.body);
    res.status(StatusCodes.OK).json({ token });
  }

  async getRole(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.userIddentifier;
    const role = await this._service.getRole(id);
    res.status(StatusCodes.OK).json({ role });
  }
}

export default UserController;
