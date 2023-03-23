import React, {useState, useEffect, useCallback} from 'react';
import Card from '../UI/Card'


export default function UserList(props){

    const [curData, setCurData] = useState([])

    const getDataHandler = useCallback( async () => {
        const res = await fetch('https://szkola-284c0-default-rtdb.europe-west1.firebasedatabase.app/data.json')
        
        const data = await res.json()
        console.log(data)
        const loadedData = []
        for(const key in data){
            loadedData.push({
                key: key,
                name : data[key].name,
                age : data[key].age,
                email : data[key].email
            })
        }
        setCurData(loadedData)
    }
    )
  
    useEffect( () => {
      getDataHandler()
     }, [props.trigger])

    return (
        <>
            {
                curData.map(data => (
                <Card key={data.key}>
                        <p>Nazwa: {data.name}</p>
                        <p>Wiek: {data.age}</p>
                        <p>Email: {data.email}</p>
                </Card>
                ))
            }
        </>
    )
}