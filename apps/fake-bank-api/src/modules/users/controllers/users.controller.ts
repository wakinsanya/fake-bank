import { User } from '../models/users.model';
import { Request, Response } from 'express';
import { from } from 'rxjs';

export class UsersController {
  public createUser(req: Request, res: Response) {
    const newUser = new User(req.body);
    from(newUser.save()).subscribe({
      next: user => res.status(200).json(user),
      error: e => res.status(500).json(e)
    });
  }

  public getUser(req: Request, res: Response) {
    const { userId } = req.params;
    from(User.findOne({ _id: userId })).subscribe({
      next: user => res.status(200).json(user),
      error: e => res.status(500).json(e)
    });
  }

  public updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    from(
      User.updateOne({ _id: userId }, { $set: req.body }, { new: true })
    ).subscribe({
      next: user => res.status(200).json(user),
      error: e => res.status(500).json(e)
    });
  }

  public deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    from(User.deleteOne({ _id: userId })).subscribe({
      next: () => res.status(200).json({ message: 'User deleted.' }),
      error: e => res.status(500).json(e)
    });
  }
}
