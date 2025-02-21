import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TeaApi } from '../../entities/tea/TeaApi';
import { CommentApi } from '../../entities/CommentApi/CommentApi';
import CommentCard  from '../../widgets/CommentCard/CommentCard'

export default function OneTeaPage({user}) {
    let { id } = useParams();
    const [tea, setTea] = useState({})
    const [comments, setComments] = useState([])
    useEffect(() => {
        TeaApi.getById(id).then(({ statusCode, error, data, message }) => {

            // const dataUser = data[0]
            // console.log(dataUser)
            if(error) alert(message)
            if(statusCode === 200) setTea(data)
            });
            CommentApi.getAllByTeaId(id).then(({ statusCode, error, data, message }) => {

            
                console.log(data);
                        // console.log(id)
                        if(error) alert(message)
                        if(statusCode === 200) setComments(data)
                            
                        });
    }, [id]);
        
    // useEffect(() => {
    //     CommentApi.getAllByTeaId(id).then(({ statusCode, error, data, message }) => {

            
    //         // console.log(id)
    //         if(error) alert(message)
    //         if(statusCode === 200) setTea(data)
    //         });
    // }, [id]);
    

    return (
        <div>
          {!tea && <p>Загрузка...</p>}
        {tea && (
            <>
                <h3>{tea.title}</h3>
                <img src={tea.img} alt={tea.title} />
                <h3>{tea.place}</h3>
                <h3>{tea.description}</h3>
                <div>
                {comments &&
                    comments.map((comment,index) => (
                        <CommentCard comment={comment} key={index+1} user={user}/> )) 
                }
                </div>
            </>
        )}
        </div>
    )
}
