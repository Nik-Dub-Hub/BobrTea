import  { useEffect, useState } from 'react'
import { TeaApi } from '../../entities/tea/TeaApi'
import TeasList from '../../widgets/TeasList/TeasList'
import Swal from 'sweetalert2'
import EditingFormTea from "../../widgets/EditingFormTea/EditingFormTea";
import styles from './AdminOffice.module.css'

export default function AdminOffice() {
  const [isCreate,setCreate] = useState(false)
    const[teas,setTeas] = useState([])

  const handleCreateClick = () => {
    setCreate(true);
  };

    useEffect(()=>{
        TeaApi.getAll().then(({statusCode,data,error:responseError,message})=>{
           if(responseError){
            Swal.fire("Ошибка!", responseError, "error");}
            setTeas(data)
        })
    },[])
  return (
    <div>
      <h1 className={styles.h1}>Личный кабинет</h1>
      <button className={styles.btn}onClick={handleCreateClick}>Создать карточку чая</button>
      {isCreate && <EditingFormTea setTeas={setTeas} setCreate={setCreate}/>}
      <TeasList teas={teas} setTeas={setTeas} />
    </div>
  );
}
