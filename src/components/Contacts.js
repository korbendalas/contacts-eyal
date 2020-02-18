import React, { useEffect } from "react";
import { CONTACTS_QUERY, DELETE_CONTACT_MUTATION } from "../services/query";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table, Button, Spin, Card } from "antd";
import openNotification from "../services/notification";
const Contacts = () => {
  let userId;
  const { loading, error, data } = useQuery(CONTACTS_QUERY);
  const [
    deleteContact,
    { loading: deleteLoading, data: deleteData }
  ] = useMutation(DELETE_CONTACT_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({
        query: CONTACTS_QUERY
      });

      let deleted = data.person.filter(p => p._id !== userId);
      proxy.writeQuery({ query: CONTACTS_QUERY, data: { person: deleted } });
      userId = "";
    }
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete"
    }
  ];

  useEffect(() => {
    if (deleteData?.delete?.true === null) {
      openNotification("Success", "Contact successfully deleted");
    }
  }, [deleteLoading]);

  return (
    <Card style={{ width: "80%", margin: "30px auto" }}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin tip="Loading..."></Spin>
        </div>
      ) : (
        <>
          <h1>Contacts</h1>
          <Table
            columns={columns}
            dataSource={data?.person.map(item => {
              return {
                key: item._id,
                name: item.name,
                email: item.email,
                phone: item.phone,
                type: item.type,
                delete: (
                  <Button
                    type="danger"
                    size="large"
                    onClick={() => {
                      deleteContact({
                        variables: { payload: item._id }
                      });
                      userId = item._id;
                    }}
                  >
                    Delete
                  </Button>
                )
              };
            })}
          />
        </>
      )}
    </Card>
  );
};

export default Contacts;
