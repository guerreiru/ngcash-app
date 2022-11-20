import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import IconBack from '../../assets/icons/chevron-left.png';
import Logo from '../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { Dialog } from '../dialog';
import {
  ButtonBack,
  HeaderStyled,
  LogoContainer,
  LogOutButton,
} from './styles';

export function Header() {
  const { logOut, isAuthenticated } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const router = useRouter();

  const RenderButtonBack = () => {
    if (router.pathname === '/' || router.pathname === '/home') {
      return null;
    }
    return (
      <ButtonBack onClick={() => router.back()}>
        <Image src={IconBack} alt='' width={32} height={32} />
      </ButtonBack>
    );
  };

  return (
    <HeaderStyled>
      <RenderButtonBack />

      <LogoContainer>
        <Image src={Logo} alt='' priority />
      </LogoContainer>

      {isAuthenticated && (
        <LogOutButton
          label='Sair'
          variant='secondary'
          onClick={() => setDialogOpen(true)}
        />
      )}

      <Dialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onConfirm={logOut}
        headerTitle='Tem certeza disso?  🤔'
      />
    </HeaderStyled>
  );
}
