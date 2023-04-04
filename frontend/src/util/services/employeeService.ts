import { AxiosResponse } from 'axios';

import { Employee, PopulatedEmployee } from '../types/employee';

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
  await api.post<
    PopulatedEmployee,
    AxiosResponse<PopulatedEmployee, any>,
    RegisterData
  >('/employees/signup', {
    name: formData.name,
    username: formData.username,
    password: formData.password
  });
};

const login = async (formData: FormData) => {
  const response = await api.post<
    PopulatedEmployee,
    AxiosResponse<PopulatedEmployee, any>,
    LoginData
  >('/employees/login', {
    username: formData.username,
    password: formData.password
  });

  return response.data;
};

const getAll = async (cafeId: string) => {
  const response = await api.get<Array<Employee>>('/employees', {
    params: {
      cafe: cafeId
    }
  });

  return response.data;
};

interface EmployeeFormData {
  name: string;
  username: string;
  password: string;
}

const createNew = async (
  formData: EmployeeFormData,
  user: PopulatedEmployee
) => {
  const response = await api.post<
    Employee,
    AxiosResponse<Employee, any>,
    RegisterData
  >(
    '/employees',
    {
      name: formData.name,
      username: formData.username,
      password: formData.password
    },
    {
      params: { cafe: user.cafe.id },
      headers: { Authorization: `bearer ${user.token}` }
    }
  );

  return response.data;
};

const removeOne = async (id: string, user: PopulatedEmployee) => {
  await api.delete(`/employees/${id}`, {
    params: {
      cafe: user.cafe.id
    },
    headers: {
      Authorization: `bearer ${user.token}`
    }
  });
};

export default { signUp, login, getAll, createNew, removeOne };
