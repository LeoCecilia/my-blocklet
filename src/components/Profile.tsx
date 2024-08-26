import { useMemo } from 'react';
import { useFetchUser } from '../hooks/useUser';
import { ProfileKeyType } from './Form/form-type';
import { PROFILE_KEYS } from '../constants';
import { Container } from './Container';

export const Profile = () => {
  const data = useFetchUser();
  const keys = useMemo(() => {
    const arr = Object.keys(data) as ProfileKeyType[];
    return arr.filter((item) => PROFILE_KEYS.includes(item));
  }, [data]);

  if (!keys.length) {
    return <div>暂无信息，可点击编辑按钮补充信息</div>;
  }
  return (
    <div>
      {keys.map((item) => {
        return (
          <Container key={item}>
            <label htmlFor={item}>{item}</label>
            <div>{data[item]}</div>
          </Container>
        );
      })}
    </div>
  );
};
