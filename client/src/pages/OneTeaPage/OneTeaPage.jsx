import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TeaApi } from '../../entities/tea/TeaApi';
import { CommentApi } from '../../entities/CommentApi/CommentApi';
import CommentList from '../../widgets/CommentList/CommentList';
import styles from './OneTeaPage.module.css'

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
    }, [id]);

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{tea.title}</h1>
        <img className={styles.image} src={tea.img} alt={tea.title} />
        <div className={styles.details}>
          <h3 className={styles.place}>Место происхождения: {tea.place}</h3>
          <p className={styles.description}>
            Описание прекрасного чая:
            <br />
            {tea.description}
          </p>
        </div>
        {user && (
          <CommentList
            comments={comments}
            id={id}
            user={user}
            setComments={setComments}
          />
        )}
      </div>
    );
}
