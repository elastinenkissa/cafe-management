import { AxiosResponse } from 'axios';

import { Employee } from '../types/employee';

import { FormData } from '../hooks/useLogin';

import { api } from './api';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

const signUp = async (formData: FormData) => {
  await api.post<Employee, AxiosResponse<Employee, any>, RegisterData>(
    '/employees/signup',
    {
      name: formData.name,
      username: formData.username,
      password: formData.password
    }
  );
};

const login = async (formData: FormData) => {
  const response = await api.post<
    Employee,
    AxiosResponse<Employee, any>,
    LoginData
  >('/employees/login', {
    username: formData.username,
    password: formData.password
  });

  return response.data;
};

export default { signUp, login };
