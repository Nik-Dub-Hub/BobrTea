const {Comment} = require('../db/models')

class CommentService{

    static async getAll(){
        return await Comment.findAll();
    }

    static async getAllByUserId(user_id) {
        return await Comment.findAll({where:{user_id}});
    }

    static async create(data) {
        return await Comment.create(data);
    }  
    
    static async update(id, data) {
        const comment = await Comment.findByPk(id);
        if (comment) {
            comment.content = data.content;
          await comment.save();
        }
        return comment; 
      }
    
      static async delete(id) {
        const comment = await Comment.findByPk(id);
        if (comment) {
          await comment.destroy();
        }
        return comment; 
      }

}

module.exports= CommentService