import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TeaApi } from '../../entities/tea/TeaApi';


export default function OneTeaPage() {
    let { id } = useParams();
    const [tea, setTea] = useState({})
    useEffect(() => {
        TeaApi.getById(id).then(({ statusCode, error, data, message }) => {
          console.log({ statusCode, error, data, message })
            if(error) alert(message)
            if(statusCode === 200) setTea(data)
            });
            // TeaApi.getById(id).then(console.log)
    }, [id]);
    // let [searchParams] = useSearchParams()
    // console.log(searchParams.get('test'));
    // console.log(searchParams.get('user'));
    return (
        <div>
          {!tea && <p>Загрузка...</p>}
        {tea && (
            <>
                <h3>{tea.title}</h3>
                <img src={tea.img} alt={tea.title} />
                <h3>{tea.place}</h3>
                <h3>{tea.description}</h3>
            </>
        )}
        </div>
    )
}
