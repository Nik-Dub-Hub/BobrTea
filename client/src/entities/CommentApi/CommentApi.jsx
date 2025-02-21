import { axiosInstance } from "../../shared/lib/axiosInstance";

export class CommentApi{
    static async getAll(){
        const {data} = await axiosInstance.get('/comment');
        return data
    }
    static async getAllByUserId(id){
        const {data} = await axiosInstance.get('/comment/user');
        return data
    }

    static async getAllByTeaId(id){
        const {data} = await axiosInstance.get(`/comment/tea/${id}`);
    //    console.log(data)
        return data
    }

    static async create(inputs,id){
        const {data} = await axiosInstance.post(`/comment/${id}`, inputs);
        return data
    }
    static async update(id){
        const {data} = await axiosInstance.put('/comment/:id');
        return data
    }
    static async delete(id){
        const {data} = await axiosInstance.delete(`/comment/${id}`);
        return data
    }
}

