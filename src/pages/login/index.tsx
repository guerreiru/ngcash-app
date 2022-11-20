import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { Button } from '../../components/button';
import { Input } from '../../components/form/input';
import { Header } from '../../components/header';
import { Container } from '../../components/layout';
import { AuthContext } from '../../context/AuthContext';
import { checkTokenIsValid } from '../../services/auth';
import { Content, Error, FormContainer } from '../../styles/pages/register';
import { errorHandler } from '../../utils/errorHandler';
import { regex } from '../../utils/validation';

const loginFormSchema = z.object({
  username: z
    .string({
      required_error: 'Usuário deve conter no minimo 3 caracteres',
    })
    .min(3, { message: 'Usuário deve conter no minimo 3 caracteres' }),
  password: z
    .string({
      required_error: 'A senha deve ser composta por pelo menos 8 caracteres',
    })
    .min(8, {
      message: 'A senha deve ser composta por pelo menos 8 caracteres',
    })
    .regex(regex.password, {
      message:
        'A senha deve ser composta por pelo menos 8 caracteres, um número e uma letra maiúscula',
    }),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const login = async (data: LoginFormInputs) => {
    try {
      const res = await signIn(data);
      if (res.token) {
        reset();
        router.push('/home');
      }
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage.message);
    }
  };

  return (
    <>
      <Head>
        <title>G CASH | LOGIN</title>
        <meta name='description' content='Formulario de login da g cash' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <Container>
          <Content>
            <FormContainer onSubmit={handleSubmit(login)}>
              <div>
                <Controller
                  render={({ field }) => (
                    <Input
                      label='Usuário de acesso'
                      type='text'
                      placeholder='Usuário'
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
                      label='Senha'
                      type='password'
                      placeholder='Senha'
                      error={!!errors.password}
                      {...field}
                    />
                  )}
                  control={control}
                  defaultValue=''
                  name='password'
                />
                {errors.password && <Error>{errors.password.message}</Error>}
              </div>

              <Button type='submit' disabled={isSubmitting} label='Entrar' />

              <Link href='/register'>Criar conta</Link>
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

  if (tokenIsValid) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
