import React, { ReactNode } from 'react';
import {
  Body,
  ButtonFooter,
  Container,
  Content,
  Footer,
  Header,
} from './styles';

interface IDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'accent' | 'secondary';
  headerTitle?: string;
  children?: ReactNode;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Dialog({
  variant,
  headerTitle,
  children,
  onConfirm,
  dialogOpen,
  setDialogOpen,
}: IDialogProps) {
  if (!dialogOpen) {
    return null;
  }
  return (
    <Container>
      <Content variant={variant}>
        {headerTitle && (
          <Header>
            <p>{headerTitle}</p>
          </Header>
        )}
        {children && <Body>{children}</Body>}

        <Footer>
          <ButtonFooter
            label='Cancelar'
            variant='secondary'
            onClick={() => setDialogOpen(false)}
          />
          <ButtonFooter label='Confirmar' onClick={onConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}
