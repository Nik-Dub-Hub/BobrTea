import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TeaApi } from '../../entities/tea/TeaApi';
import { CommentApi } from '../../entities/CommentApi/CommentApi';
import CommentList from '../../widgets/CommentList/CommentList';

export default function OneTeaPage({user}) {
    let { id } = useParams();
    const [tea, setTea] = useState({})
    const [comments, setComments] = useState([])
    useEffect(() => {
        TeaApi.getById(id).then(({ statusCode, error, data, message }) => {
            if(error) alert(message)
            if(statusCode === 200) {
                
                setTea(data);
                setComments(data['Comments'].map(el => el['Comment']))
            }
            });
            // CommentApi.getAllByTeaId(id).then(({ statusCode, error, data, message }) => {
            //             if(error) alert(message)
            //             if(statusCode === 200) setComments(data)
            //             });
    }, [id]);

    return (
        <div>
          {!tea && <p>Загрузка...</p>}
        {tea && (
            <>
        
                <h3>{tea.title}</h3>
                <img src={tea.img} alt={tea.title} />
                <h3>{tea.place}</h3>
                <h3>{tea.description}</h3>
                <CommentList comments={comments} id={id} user={user} setComments={setComments}/>
            </>
        )}
        </div>
    )
}
