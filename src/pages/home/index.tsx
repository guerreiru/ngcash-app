import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import StatementIcon from '../../assets/icons/statement.png';
import TransactionIcon from '../../assets/icons/transaction.png';
import { Card } from '../../components/card';
import { Header } from '../../components/header';
import { Container } from '../../components/layout';
import { TransactionsList } from '../../components/transactionsList';
import { AuthContext } from '../../context/AuthContext';
import { checkTokenIsValid } from '../../services/auth';
import { getAPIClient } from '../../services/axios';
import { Balance, MenuCards } from '../../styles/pages/home';
import { Content } from '../../styles/pages/register';
import { formatCurrency } from '../../utils/formatters';

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
  balance: number;
};

export default function Home({ listTransactions, balance }: Props) {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUser({
        username: user.username,
        balance,
      });
    }
  }, []);

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
            <h1>Olá {user?.username}!</h1>

            <Balance>
              <h2>Saldo disponível</h2>
              <p> R$ {formatCurrency(user?.balance || 0)}</p>
            </Balance>

            <MenuCards>
              <li>
                <Card
                  label='Transferir'
                  imgUrl={TransactionIcon.src}
                  onClick={() => router.push('/account/transaction')}
                />
              </li>
              <li>
                <Card
                  label='Extrato'
                  imgUrl={StatementIcon.src}
                  onClick={() => router.push('/account/statement')}
                />
              </li>
            </MenuCards>

            {!listTransactions.length && (
              <div>
                <p>Nenhuma transação encontrada</p>
              </div>
            )}
            {listTransactions.length > 0 && (
              <TransactionsList listTransactions={listTransactions} />
            )}
          </Content>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { '@@ngcash-app.token': dataFromCookiesStringify } = parseCookies(ctx);
  const tokenIsValid = await checkTokenIsValid(dataFromCookiesStringify);

  if (!tokenIsValid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const handleGetListTransactions = async () => {
    return await apiClient.get('/account/transactions-list?filter=');
  };

  const handleGetBalance = async () => {
    return await apiClient.get('/account/balance', {});
  };

  let [transactions, { data: balance }] = await Promise.all([
    handleGetListTransactions(),
    handleGetBalance(),
  ]);

  return {
    props: {
      listTransactions: transactions.data,
      balance: balance,
    },
  };
};
