import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { Button } from '../../../components/button';
import { Input } from '../../../components/form/input';
import { Header } from '../../../components/header';
import { Container } from '../../../components/layout';
import { api } from '../../../services/api';
import { checkTokenIsValid } from '../../../services/auth';
import { Content, Error, FormContainer } from '../../../styles/pages/register';
import { errorHandler } from '../../../utils/errorHandler';

const transactionFormSchema = z.object({
  username: z
    .string({
      required_error: 'Usuário deve conter no minimo 3 caracteres',
    })
    .min(3, { message: 'Usuário deve conter no minimo 3 caracteres' }),
  value: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Somente números',
  }),
});

type transactionFormInputs = z.infer<typeof transactionFormSchema>;

export default function Transaction() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<transactionFormInputs>({
    resolver: zodResolver(transactionFormSchema),
  });

  const handleTransaction = async (data: transactionFormInputs) => {
    const transaction = {
      creditedUsername: data.username,
      value: Number(data.value),
    };

    try {
      const res = await api.post('/account/transaction', transaction);
      if (res.status === 201) {
        toast.success('Transferência realizada! 😍');
        reset();
        router.push('/home');
        return;
      }
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage.message);
    }
  };

  return (
    <>
      <Head>
        <title>G CASH | TRANSFERÊNCIA</title>
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
            <h1>Fazer transferência</h1>

            <FormContainer onSubmit={handleSubmit(handleTransaction)}>
              <div>
                <Controller
                  render={({ field }) => (
                    <Input
                      label='Usuário recebedor'
                      type='text'
                      placeholder='Usuário recebedor'
                      error={!!errors.username}
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue=''
                  name='username'
                />

                {errors.username && <Error>{errors.username.message}</Error>}
              </div>

              <div>
                <Controller
                  render={({ field }) => (
                    <Input
                      label='Valor da transferência'
                      type='number'
                      placeholder='Ex: 50,55'
                      error={!!errors.value}
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue={''}
                  name='value'
                />

                {errors.value && <Error>{errors.value.message}</Error>}
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                label='Transferir'
              />
            </FormContainer>
          </Content>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  return {
    props: {},
  };
};
