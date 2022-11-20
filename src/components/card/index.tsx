import Image from 'next/image';
import { Container } from './styles';

interface IcardProps {
  imgUrl: string;
  label: string;
  onClick?: () => void;
}

export function Card({ imgUrl, label, onClick }: IcardProps) {
  return (
    <Container onClick={onClick}>
      <div>
        <Image src={imgUrl} alt='' width={44} height={44} />
      </div>
      <p>{label}</p>
    </Container>
  );
}
