import { axiosInstance } from '../../shared/lib/axiosInstance';

export class TeaApi {
  static async getAll() {
    const { data } = await axiosInstance.get('/tea');
    return data;
  }

  static async getById(id) {
    const { data } = await axiosInstance.get(`/tea/${id}`);
    return data;
  }

  static async create(inputs) {
    const { data } = await axiosInstance.post('/tea', inputs);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/tea/${id}`);
    return data;
  }

  static async update(id,teaData){
    const {data} = await axiosInstance.put(`/tea/${id}`,teaData)
    return data
  }
}