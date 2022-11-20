import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../components/button';
import { Header } from '../components/header';
import { Container } from '../components/layout';
import { Content, ButtonsSection, HeadersSection } from '../styles/pages/start';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>G CASH | START</title>
        <meta name='description' content='Aplicação para teste da g cash' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <Header />
        <main>
          <Container>
            <Content>
              <section>
                <HeadersSection>
                  <h1>Processo Seletivo NG TRYBE</h1>
                  <h2>Desafio:</h2>
                </HeadersSection>

                <p>
                  Estruturar uma aplicação web fullstack, dockerizada, cujo
                  objetivo seja possibilitar que usuários da NG consigam
                  realizar transferências internas entre si.
                </p>
              </section>

              <ButtonsSection>
                <div>
                  <Button
                    label='criar conta'
                    onClick={() => router.push('/register')}
                  />
                </div>

                <Link href='/login'>acessar minha conta</Link>
              </ButtonsSection>
            </Content>
          </Container>
        </main>
      </div>
    </div>
  );
}
