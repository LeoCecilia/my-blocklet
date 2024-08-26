import { ChangeEvent, Reducer, useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import './edit-form.css';
import { Form } from '../components/Form/Form';
import { TextField } from '../components/InputField';
import { ProfileType, ProfileDataKeyType } from '../components/Form/form-type';
import { SubmitButton } from '../components/SubmitButton';
import { setProfile } from '../libs/api/profile';
import { STORAGE_PROFILE } from '../constants';
import { getItem, setItem } from '../libs/forage';
import { useFetchUser } from '../hooks/useUser';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';

type ValidateFunction = (value: unknown) => string | false;

function Edit() {
  const navigate = useNavigate();

  const initialData = useFetchUser();
  const toast = useToast({ interval: 3000 });

  const validateErrorMap: Record<ProfileDataKeyType, ValidateFunction> = {
    name: (value: unknown) => {
      if (!value || !(value as string).match(/^[\u4e00-\u9fa5a-zA-Z]+$/)) {
        return '请输入中英文字符';
      }
      return false;
    },
    email: (value: unknown) => {
      // eslint-disable-next-line no-useless-escape
      if (!value || !(value as string).match(/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/)) {
        return '请输入合乎规则的邮箱';
      }
      return false;
    },
    phone: (value: unknown) => {
      if (
        !value ||
        !(value as string).match(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
      ) {
        return '请输入合乎规则的电话号码';
      }
      return false;
    },
  };

  const [data, setData] = useReducer<Reducer<ProfileType, Partial<ProfileType>>>(
    (state, updates) => ({ ...state, ...updates }),
    initialData,
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleValueChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement>, key: string) => {
      setData({ [key]: event.target.value });
    },
    [setData],
  );

  const onSubmit = useCallback(() => {
    const storage = getItem(STORAGE_PROFILE);
    const id = storage?._id;

    setProfile({ data, id })
      .then((res) => {
        if (res.data.data._id) {
          setItem(STORAGE_PROFILE, res.data.data);
        }
        navigate({ pathname: '/home' });
      })
      .catch((err) => {
        toast(err.response.data.errorMsg);
      });
  }, [data, navigate, toast]);

  const onBack = useCallback(() => {
    navigate({ pathname: '/home' });
  }, [navigate]);

  return (
    <Form onSubmit={onSubmit}>
      <TextField
        onChange={(e) => {
          handleValueChanged(e, 'name');
        }}
        label="Name"
        value={data.name}
        id="name"
        validateError={validateErrorMap.name}
      />
      <TextField
        onChange={(e) => {
          handleValueChanged(e, 'email');
        }}
        label="Email"
        value={data.email}
        id="email"
        validateError={validateErrorMap.email}
      />
      <TextField
        onChange={(e) => {
          handleValueChanged(e, 'phone');
        }}
        label="Phone"
        value={data.phone}
        id="phone"
        validateError={validateErrorMap.phone}
      />
      <div>
        <Button onClick={onBack} type="button">
          Back
        </Button>
        <SubmitButton />
      </div>
    </Form>
  );
}

export default Edit;
