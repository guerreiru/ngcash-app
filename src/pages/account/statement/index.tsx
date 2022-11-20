import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../../components/button';
import { Input } from '../../../components/form/input';
import { Header } from '../../../components/header';
import { Container } from '../../../components/layout';
import { TransactionsList } from '../../../components/transactionsList';
import { api } from '../../../services/api';
import {
  ButtonGroup,
  Content,
  Filters,
  NoDataInfo,
} from '../../../styles/pages/statement';

type Trasaction = {
  id: string;
  value: 10;
  created_at: Date;
  fk_debited_account_id: string;
  fk_credited_account_id: string;
  type: 'credit' | 'debit';
};

export default function Statement() {
  const [filter, setFilter] = useState<null | string>(null);
  const [date, setDate] = useState('');
  const [transactions, setTransactions] = useState<Trasaction[]>([]);

  const handleGetListTransactions = useCallback(async () => {
    const res = await api.get(`/account/transactions-list?filter=${filter}`);

    if (res.status === 200) {
      setTransactions(res.data);
    }
  }, [filter]);

  const handleSetFilterByType = (filter: string) => {
    setFilter(filter);
    setDate('');
  };

  const handleSetFilterByDate = (date: string) => {
    const dateGMT = `${date}T03:52:21.731Z`;
    setFilter(dateGMT);
    setDate(date);
  };

  useEffect(() => {
    handleGetListTransactions();
  }, [handleGetListTransactions]);

  return (
    <>
      <Head>
        <title>G CASH | CONTA</title>
        <meta
          name='description'
          content='Formulario de transferência da g cash'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main>
        <Container>
          <Content>
            <h1>Extrato</h1>

            <Filters>
              <Input
                label='Data da transferência'
                type='date'
                name='date'
                value={date}
                className='inputFilter'
                onChange={({ target }) => handleSetFilterByDate(target.value)}
              />

              <ButtonGroup>
                <Button
                  label='Crédito'
                  onClick={() => handleSetFilterByType('credit')}
                />
                <Button
                  label='Débito'
                  onClick={() => handleSetFilterByType('debit')}
                />
              </ButtonGroup>
            </Filters>
            {!transactions.length && (
              <NoDataInfo>
                <p>Nenhuma transação encontrada</p>
              </NoDataInfo>
            )}
            {transactions.length > 0 && (
              <TransactionsList listTransactions={transactions} />
            )}
          </Content>
        </Container>
      </main>
    </>
  );
}
