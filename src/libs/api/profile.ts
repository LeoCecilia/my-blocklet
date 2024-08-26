import { DataType, ProfileDataKeyType } from '../../components/Form/form-type';
import { PROFILE_KEYS } from '../../constants';
import api from './api';

export const setProfile = (data: any) => {
  const keys = Object.keys(data.data).filter((key) => PROFILE_KEYS.includes(key)) as Array<ProfileDataKeyType>;
  const result = keys.reduce(
    (res, key) => {
      res[key] = data.data[key];
      return res;
    },
    <DataType>{},
  );
  return api.post('/api/profile', { data: result, id: data.id });
};

export const getProfile = (id: string | null) => {
  return api.get(`/api/profile?id=${id}`);
};
