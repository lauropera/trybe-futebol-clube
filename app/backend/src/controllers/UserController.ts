import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
import { IUserController } from '../interfaces';
import { UserService } from '../services';

class UserController implements IUserController {
  constructor(private _service: UserService) {
    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response): Promise<void> {
    const token = await this._service.login(req.body);
    res.status(200).json({ token });
  }

  public async getUserRole(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.userIddentifier;
    const role = await this._service.getRole(id);
    res.status(200).json({ role });
  }
}

export default UserController;
