import React,{useState,useEffect} from 'react'
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CONTACT_MUTATION,CONTACTS_QUERY } from '../services/Query';
import {
    Form,
    Input,
    Card,
    Button,
    Typography,
    notification
  
} from 'antd';
const { Title } = Typography;


const AddContact = (props) => {
    const [addContact, { data:AddContactData,error, loading }] = useMutation(ADD_CONTACT_MUTATION,
        {
            update(cache, { data:{addContact} }) {
                let {person} = cache.readQuery({
                    query: CONTACTS_QUERY,
                   variables:{_id:addContact._id}
                })
              cache.writeQuery({
               
                query: CONTACTS_QUERY,
                 data: { person: [addContact,...person] },
              });
            }       
});
const openNotification = () => {
    notification.open({
      message: 'Success',
      description:
       'New contact succesfully added',
     
    });
  };

useEffect(() => {
    if( AddContactData&&  Object.keys(AddContactData).length){
        openNotification()
      
    }
}, [loading])

    const initialValues = {
        name:'',       
        email: '',
        phone: '',
        type: ''
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Minimum letters is 2')
            .max(50, 'You reached maximum of letters')
            .required("Name is required"),
        email: Yup.string()
            .label("Email")
            .email()
            .required("Email is required"),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
        type: Yup.string()
            .required("Type is required"),
    })

    return (

        <Card style={{ width: '600px', margin: '150px auto', }}>
            <Title level={2}>Add new contact</Title>
            <Formik
            enableReinitialize = {AddContactData&&  Object.keys(AddContactData).length?true:false}

                onSubmit={async(values,{resetForm}) => {

                   await addContact({
                        variables: { payload: values }
                    });
                    resetForm()
              
                }}
                initialValues={initialValues}
               validationSchema={validationSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    resetForm,
                    ...props
                }) => {
                  
                    return (

                        <FormikForm>
                            <Form.Item

                            >
                                <Input
                                    className={(errors.name && touched.name) ? 'border-red' : ''}
                                    placeholder="Name"
                                    id="contact_name"
                                    margin="normal"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    style={{
                                        border: (errors.name && touched.name) ? 'solid 1px red' : '',

                                    }}
                                />
                                {(errors.name && touched.name) || error ? (
                                    <span className="has-error ant-form-explain" style={{ color:'red' }}>
                                    {errors.name ||  error.networkError.result.errors.filter(item=>item.param ==='name')[0].msg}</span>
                                ) : null}

                            </Form.Item>

                            <Form.Item>
                                <Input
                                    className={(errors.name && touched.name) ? 'border-red' : ''}
                                    style={{
                                        border: (errors.name && touched.name) ? 'solid 1px red' : '',

                                    }}
                                    placeholder="Email"
                                    id="contact_email"
                                    margin="normal"
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}

                                />
                                {(errors.email && touched.email)  ? (
                                    <span className="has-error ant-form-explain" style={{ color:'red' }}>
                                    {errors.email || ""}</span>
                                ) : null}
                            </Form.Item>

                            <Form.Item>
                                <Input
                                    className={(errors.name && touched.name) ? 'border-red' : ''}
                                    style={{
                                        border: (errors.name && touched.name) ? 'solid 1px red' : '',

                                    }}
                                    placeholder="Phone"
                                    id="contact_phone"
                                    margin="normal"
                                    type="text"
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                                {(errors.phone && touched.phone)  ? (
                                    <span className="has-error ant-form-explain" style={{ color: 'red' }}>{errors.phone || ""}</span>
                                ) : null}

                            </Form.Item>

                            <Form.Item>

                            <select 
                           className={`ant-select-selection
                            ant-select-selection--single ant-select-selection__rendered
                           ${(errors.name && touched.name) ? 'border-red' : ''}`}
                         
                                    style={{
                                        border: (errors.name && touched.name) ? 'solid 1px red' : '',
                                        width: '100%',marginLeft:0
                                    }}
                          
                                 id="contact_type"

                                 name="type"
                                 onChange={handleChange}
                                //  onBlur={handleBlur}
                                 value={values.type} 
                              
                            >
                                <option defaultValue="Please select the type" >Please select the type</option>
                                <option 
                                value="personal">Personal</option>
                                <option value="professional">Professional</option>
                                
                            
                                </select>
                                {(errors.type && touched.type) || error ? (
                                    <span className="has-error ant-form-explain" style={{ color:  'red' }}>
                                    {errors.type || error.networkError.result.errors.filter(item=>item.param ==='type')[0].msg}</span>
                                ) : null}
                            </Form.Item>

                            <Button
                           
                            id='contact_submit' type="primary" htmlType="submit" size='large' >
                                Add Contact
                          </Button>

                        </FormikForm>
                    );
                }}
            </Formik>
        </Card>
    )
}

export default AddContact;