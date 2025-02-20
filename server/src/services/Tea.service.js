const { Tea, User } = require('../db/models');

class TeaService {
    static async getAll() {
        return await Tea.findAll();
    }
    static async getById(id){
        return await Tea.findByPk(id, { include: { model: User}})
    }
    
    static async create(data){
        return await Tea.create(data)
    }

    static async update(id,data){
        const tea = await this.getById(id)
        if (tea){
            tea.title = data.title;
            tea.place = data.place
            tea.img = data.img;
            tea.description = data.description
            tea.longitude = data.longitude
            tea.width = data.width
            await tea.save()
        }
        return tea
    }
    static async delete(id){
        const tea = await this.getById(id);
        if (tea) {
            await tea.destroy()
        }
        return tea
    }
    
}


module.exports = TeaService

// const placeObject = {
//     title: 'Example Title',
//     place: 'Example Place',
//     img: 'example_image.jpg',
//     description: 'Example Description',
//     longitude: 55.123456,
//     width:  37.654321
// };



// TeaService.getAll()
// .then((createdTea) => {
//     console.log('Чай успешно создан:', createdTea);
// })
// .catch((error) => {
//     console.error('Ошибка при создании чая:', error);
// });