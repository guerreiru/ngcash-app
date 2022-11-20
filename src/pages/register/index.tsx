import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import Head from 'next/head';

import * as z from 'zod';
import { api } from '../../services/api';
import { regex } from '../../utils/validation';
import { errorHandler } from '../../utils/errorHandler';
import { Container } from '../../components/layout';
import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Input } from '../../components/form/input';
import {
  Content,
  Error,
  FormContainer,
  InfoHeader,
} from '../../styles/pages/register';

const accountFormSchema = z.object({
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

type AccountFormInputs = z.infer<typeof accountFormSchema>;

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<AccountFormInputs>({
    resolver: zodResolver(accountFormSchema),
  });

  const registerAccount = async (data: AccountFormInputs) => {
    try {
      const res = await api.post('/users', data);
      if (res.data) {
        reset();
        toast.success('Cadastrado com sucesso 😍');
      }
    } catch (error) {
      const errorMessage = errorHandler(error);
      toast.error(errorMessage.message);
    }
  };

  return (
    <>
      <Head>
        <title>G CASH | CADASTRE-SE</title>
        <meta name='description' content='Formulario de cadastro da g cash' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <Container>
          <Content>
            <InfoHeader>
              <h1>
                Pra começar, informe qual usário deseja utilizar, e a senha :)
              </h1>
              <h2>
                A senha deve ser composta por pelo menos 8 caracteres, um número
                e uma letra maiúscula
              </h2>
            </InfoHeader>

            <FormContainer onSubmit={handleSubmit(registerAccount)}>
              <div>
                <Controller
                  render={({ field }) => (
                    <Input
                      label='Nome de usuário'
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

              <Button
                type='submit'
                disabled={isSubmitting}
                label='criar conta'
                variant='secondary'
              />
            </FormContainer>
          </Content>
        </Container>
      </main>
    </>
  );
}
