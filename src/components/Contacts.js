import React, { useEffect, useState } from 'react'
import { CONTACTS_QUERY, DELETE_CONTACT_MUTATION } from '../services/Query'
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table, Button,  Spin, Card,notification } from 'antd';
const Contacts = () => {
   
    let userId;
   
    const { loading, error, data } = useQuery(CONTACTS_QUERY);
    const [deleteContact,{loading:DeleteLoading,data:deleteData}] = useMutation(DELETE_CONTACT_MUTATION, {
        update(proxy) {
            
            const data = proxy.readQuery({
                query: CONTACTS_QUERY
            })
      
                
          let deleted =  data.person.filter(p => p._id !== userId)
            //console.log('state id ', userId)
           proxy.writeQuery({ query: CONTACTS_QUERY, data:{person:deleted}  })
            userId = "";
            
        }
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
        },
    ]
    const openNotification = () => {
        notification.open({
          message: 'Success',
          description:`User deleted `
            ,
          
        });
      };
     useEffect(()=>{
        if(deleteData?.delete?.true === null){
            
 openNotification()

        }
       
     },[DeleteLoading])

    
       return (
        <Card style={{ width: '80%', margin: '30px auto', }}>
            {loading ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>  <Spin tip="Loading..." ></Spin></div> :
                <>
                    <h1>Contacts</h1>
                    <Table

                        columns={columns}
                        dataSource={data?.person.map(item => {
                            return ({
                                key: item._id,
                                name: item.name,
                                email: item.email,
                                phone: item.phone,
                                type: item.type,
                                delete: <Button type="danger" size='large' onClick={() => {
                                    deleteContact({
                                        variables: { payload: item._id }
                                    })
                                    userId=item._id

                                }}>
                                   Delete
                                  
                                 
                    </Button>
                            }
                            )
                        })}

                    />
                </>

            }
        </Card>

    )
}

export default Contacts;