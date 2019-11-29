import { SavingsAccount } from '../models/savings-accout.model';
import { Request, Response } from 'express';
import { from } from 'rxjs';

export class SavingsAccountController {
  public createAccount(req: Request, res: Response) {
    const savingsAccount = new SavingsAccount(req.body);
    from(savingsAccount.save()).subscribe({
      next: account => res.status(200).json(account),
      error: e => res.status(500).json(e)
    });
  }

  public getAccount(req: Request, res: Response) {
    const { savingsAccountId } = req.params;
    from(SavingsAccount.findOne({ _id: savingsAccountId })).subscribe({
      next: account => res.status(200).json(account),
      error: e => res.status(500).json(e)
    });
  }

  public updateAccount(req: Request, res: Response) {
    const { savingsAccountId } = req.params;
    from(
      SavingsAccount.updateOne(
        { _id: savingsAccountId },
        { $set: req.body },
        { new: true }
      )
    ).subscribe({
      next: account => res.status(200).json(account),
      error: e => res.status(500).json(e)
    });
  }

  public deleteAccount(req: Request, res: Response) {
    const { savingsAccountId } = req.params;
    from(SavingsAccount.deleteOne({ _id: savingsAccountId })).subscribe({
      next: () => res.status(200).json({ message: 'Savings account deleted.' }),
      error: e => res.status(500).json(e)
    });
  }
}
