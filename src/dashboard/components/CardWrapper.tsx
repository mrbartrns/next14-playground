import classNames from 'classnames';
import { styled } from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

const CardWrapper = ({ children }: Props) => {
  return (
    <Container>
      <div className={classNames('popover-section')} />
      {children}
    </Container>
  );
};

export default CardWrapper;

const Container = styled.div`
  position: relative;

  & {
    .popover-section {
      position: absolute;

      &:hover {
      }
    }
  }
`;
