import { formatCurrency, formatDate } from '../../utils/formatters';
import { Table } from './styles';

type Trasaction = {
  id: string;
  value: 10;
  created_at: Date;
  fk_debited_account_id: string;
  fk_credited_account_id: string;
  type: 'credit' | 'debit';
};

type Props = {
  listTransactions: Trasaction[];
};

export function TransactionsList({ listTransactions }: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th scope='col'>
            <p>Tipo</p>
          </th>
          <th scope='col'>
            <p>Data</p>
          </th>
          <th scope='col'>
            <p>Valor</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {listTransactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>
              <p className='text'>
                {transaction.type === 'credit' ? 'Crédito' : 'Débito'}
              </p>
            </td>

            <td>
              <p className='text'>
                {formatDate(transaction.created_at.toString())}
              </p>
            </td>

            <td>
              <p className='text'>{formatCurrency(transaction.value)}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
