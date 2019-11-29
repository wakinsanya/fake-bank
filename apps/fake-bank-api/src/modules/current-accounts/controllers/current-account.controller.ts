import { CurrentAccount } from '../models/current-account.model';
import { Request, Response } from 'express';
import { from } from 'rxjs';

export class CurrentAccountController {
  static createAccount(req: Request, res: Response) {
    const currentAccount = new CurrentAccount(req.body);
    from(currentAccount.save()).subscribe({
      next: account => res.status(200).json(account),
      error: e => res.status(500).json(e)
    });
  }

  static listAccounts(req: Request, res: Response) {
    from(CurrentAccount.find({})).subscribe({
      next: accounts => res.status(200).json(accounts),
      error: e => res.status(500).json(e)
    });
  }

  static getAccount(req: Request, res: Response) {
    const { currentAccountId } = req.params;
    from(CurrentAccount.findOne({ _id: currentAccountId })).subscribe({
      next: account => res.status(200).json(account),
      error: e => res.status(500).json(e)
    });
  }

  static updateAccount(req: Request, res: Response) {
    const { currentAccountId } = req.params;
    from(
      CurrentAccount.updateOne(
        { _id: currentAccountId },
        { $set: req.body },
        { new: true }
      )
    ).subscribe({
      next: account => res.status(200).json(account),
      error: e => res.status(500).json(e)
    });
  }

  static deleteAccount(req: Request, res: Response) {
    const { currentAccountId } = req.params;
    from(CurrentAccount.deleteOne({ _id: currentAccountId })).subscribe({
      next: () => res.status(200).json({ message: 'Current account deleted.' }),
      error: e => res.status(500).json(e)
    });
  }
}
