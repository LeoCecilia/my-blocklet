import { useEffect, useState } from 'react';
import { EXPIRE_TIME } from '../constants';
import { getProfile } from '../libs/api/profile';
import { getItem } from '../libs/forage';
import { ProfileType } from '../components/Form/form-type';

export const useFetchUser = () => {
  const [data, setData] = useState<ProfileType>(<ProfileType>{});
  useEffect(() => {
    let isFetched = true;
    const profile = getItem('profile');

    if (profile) {
      const updatedAt = new Date(profile.updatedAt ?? Date.now()).getTime();
      const currentTime = Date.now();
      if (currentTime - updatedAt < EXPIRE_TIME) {
        setData(profile);
        isFetched = false;
      }
    }
    if (isFetched) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const id = profile?._id;
      getProfile(id).then((res) => {
        setData(res.data.data);
      });
    }
  }, []);
  return data;
};
