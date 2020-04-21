import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValues: number[] = [];
    const outcomeValues: number[] = [];

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeValues.push(transaction.value);
      } else {
        outcomeValues.push(transaction.value);
      }
    });

    const income = incomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const outcome = outcomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
