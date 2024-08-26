export type DataType = {
  name: string;
  email: string;
  phone: string;
};

const data = <DataType & { _id: string; updateTime: string; createdTime: string }>{};
export type ProfileType = typeof data;

export type ProfileKeyType = keyof ProfileType;
export type ProfileDataKeyType = keyof DataType;
