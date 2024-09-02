// import React, { useState, useEffect } from 'react';
// import { Table, Button, Space, Card, message, Modal, Form, Input, Select, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './list.css';
// import Header from './Header';
// import Footer from './Footer';

// import Papa from 'papaparse'; // Import papaparse
// import { saveAs } from 'file-saver'; // To save the file

// const { Option } = Select;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const services = ['AMAZON', 'MEESHO', 'FLIPKART', 'EBAY', 'WEBSITE', 'FRANCHISE'];

// const servicePrefixes = {
//   AMAZON: 'AZ',
//   MEESHO: 'M',
//   FLIPKART: 'FL',
//   EBAY: 'EB',
//   WEBSITE: 'WB',
//   FRANCHISE: 'F',
// };

// const managers = Array.from({ length: 20 }, (_, i) => `TL${i + 1}`);

// const List = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editForm] = Form.useForm();
//   const [editRecord, setEditRecord] = useState(null);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [searchText, setSearchText] = useState(''); // New state for search text

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     handleSearch(searchText); // Trigger search whenever search text changes
//   }, [searchText, data]); // Add data dependency to refresh the filter when data is fetched

//   const fetchData = () => {
//     axios
//       .get(`${apiUrl}/api/enrollments`)
//       .then((response) => {
//         const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setData(sortedData);
//         setFilteredData(sortedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         message.error('Error fetching data');
//         setLoading(false);
//       });
//   };

//   // Function to handle search
//   const handleSearch = (value) => {
//     const filtered = data.filter(
//       (item) =>
//         item.enrollmentId.toLowerCase().includes(value.toLowerCase()) ||
//         item.username.toLowerCase().includes(value.toLowerCase()) ||
//         item.email.toLowerCase().includes(value.toLowerCase()) ||
//         item.primaryContact.toLowerCase().includes(value.toLowerCase()) ||
//         item.manager.toLowerCase().includes(value.toLowerCase()) ||
//         item.service.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleEdit = (record) => {
//     setEditRecord(record);
//     editForm.setFieldsValue({
//       ...record,
//       date: moment(record.date, 'YYYY-MM-DD'),
//     });
//     setEditModalVisible(true);
//   };


//     const handleStatusChange = (record) => {
//     const updatedStatus = record.status === 'done' ? 'pending' : 'done';
//     axios.put(`${apiUrl}/api/enrollments/${record._id}`, { status: updatedStatus })
//       .then(response => {
//         message.success('Status updated successfully');
//         record.status = updatedStatus;
//         setData([...data]);
//         setFilteredData([...filteredData]);
//       })
//       .catch(error => {
//         message.error('Failed to update status');
//       });
//   };
//   const handleEditSubmit = () => {
//     editForm
//       .validateFields()
//       .then((values) => {
//         values.date = values.date.format('YYYY-MM-DD');
//         axios
//           .put(`${apiUrl}/api/enrollments/${editRecord._id}`, values)
//           .then((response) => {
//             message.success('Enrollment updated successfully');
//             setEditModalVisible(false);
//             fetchData();
//           })
//           .catch((error) => {
//             message.error('Failed to update enrollment');
//           });
//       })
//       .catch((error) => {
//         message.error('Validation failed');
//       });
//   };


  
//   const exportToCSV = () => {
//     const csv = Papa.unparse(filteredData);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'enrollment_list.csv');
//   };
  

//   const handleFilter = (service) => {
//     let filtered;
    
//     if (service === 'AMAZON_WEBSITE') {
//       filtered = data.filter(item => 
//         item.enrollmentId.startsWith(servicePrefixes['AMAZON']) || 
//         item.enrollmentId.startsWith(servicePrefixes['WEBSITE'])
//       );
//     } else {
//       const prefix = servicePrefixes[service];
//       filtered = data.filter(item => item.enrollmentId.startsWith(prefix));
//     }
    
//     setFilteredData(filtered);
//   };
//   const handleDelete = (id) => {
//     axios
//       .delete(`${apiUrl}/api/enrollments/${id}`)
//       .then((response) => {
//         message.success('Enrollment deleted successfully');
//         fetchData();
//       })
//       .catch((error) => {
//         message.error('Failed to delete enrollment');
//       });
//   };

//   const handleDeleteSelected = () => {
//     const promises = selectedRowKeys.map((id) => axios.delete(`${apiUrl}/api/enrollments/${id}`));
//     Promise.all(promises)
//       .then(() => {
//         message.success('Selected enrollments deleted successfully');
//         fetchData();
//         setSelectedRowKeys([]);
//       })
//       .catch((error) => {
//         message.error('Failed to delete selected enrollments');
//       });
//   };

//   const columns = [
//     {
//       title: 'Enrollment ID',
//       dataIndex: 'enrollmentId',
//       key: 'enrollmentId',
//     },
//     {
//       title: 'Username',
//       dataIndex: 'username',
//       key: 'username',
//     },
//     {
//       title: 'Manager Name',
//       dataIndex: 'manager',
//       key: 'manager',
//     },
//     {
//       title: 'Primary Contact',
//       dataIndex: 'primaryContact',
//       key: 'primaryContact',
//     },
//     {
//       title: 'Secondary Contact',
//       dataIndex: 'secondaryContact',
//       key: 'secondaryContact',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date',
//       render: (text) => moment(text).format('DD/MM/YYYY'),
//     },
//     {
//       title: 'Service',
//       dataIndex: 'service',
//       key: 'service',
//     },
//     // {
//     //   title: 'Status',
//     //   key: 'status',
//     //   render: (text, record) => (
//     //     <Button
//     //       type={record.status === 'done' ? 'primary' : 'default'}
//     //       style={{ backgroundColor: record.status === 'done' ? 'green' : '' }}
//     //       onClick={() => handleStatusChange(record)}
//     //     >
//     //       {record.status === 'done' ? 'Done' : 'Pending'}
//     //     </Button>
//     //   ),
//     // },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <Button type="link" onClick={() => handleEdit(record)}>
//             Edit
//           </Button>
//           <Button type="link" onClick={() => handleDelete(record._id)}>
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//   };

//   return (
//     <>
//       <Header />

//       <div className="list-container">
//       <Card title="Service Filter" className="filter-card">
//   <Space>
//     {services.map((service) => (
//       <Button key={service} onClick={() => handleFilter(service)}>
//         {service}
//       </Button>
//     ))}
//     <Button key="AMAZON_WEBSITE" onClick={() => handleFilter('AMAZON_WEBSITE')}>
//       AMAZON & WEBSITE
//     </Button>
//   </Space>
// </Card>
//         <Card title="Enrollment List" className="table-card">
//           <Space style={{ marginBottom: 16 }}>
//             <Button
//               type="primary"
//               onClick={handleDeleteSelected}
//               disabled={selectedRowKeys.length === 0}
//             >
//               Delete Selected
//             </Button>
//             <Input
//               placeholder="Search"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               style={{ width: 200 }}
//             />
//             <Button type="primary" onClick={exportToCSV}>
//               Download CSV
//             </Button>
//           </Space>
//           <Table
//             columns={columns}
//             dataSource={filteredData}
//             rowKey="_id"
//             loading={loading}
//             rowSelection={rowSelection}
//           />
//         </Card>

//         {/* Edit Modal */}
//         <Modal
//           title="Edit Enrollment"
//           open={editModalVisible}
//           onCancel={() => setEditModalVisible(false)}
//           onOk={handleEditSubmit}
//         >
//           <Form form={editForm} layout="vertical">
//             <Form.Item
//               name="date"
//               label="Date"
//               rules={[{ required: true, message: 'Please select the date' }]}
//             >
//               <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
//             </Form.Item>
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true, message: 'Please enter username' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="manager"
//               label="Manager Name"
//               rules={[{ required: true, message: 'Please select manager' }]}
//             >
//               <Select>
//                 {Array.from({ length: 20 }, (_, i) => (
//                   <Option key={`TL${i + 1}`} value={`TL${i + 1}`}>
//                     TL{i + 1}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item
//               name="primaryContact"
//               label="Primary Contact"
//               rules={[{ required: true, message: 'Please enter primary contact' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="secondaryContact"
//               label="Secondary Contact"
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[{ required: true, message: 'Please enter email' }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="service"
//               label="Service"
//               rules={[{ required: true, message: 'Please select service' }]}
//             >
//               <Select>
//                 {services.map((service) => (
//                   <Option key={service} value={service}>
//                     {service}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             {/* <Form.Item
//               name="status"
//               label="Status"
//               rules={[{ required: true, message: 'Please select status' }]}
//             >
//               <Select>
//                 <Option value="done">Done</Option>
//                 <Option value="pending">Pending</Option>
//               </Select>
//             </Form.Item> */}
//           </Form>
//         </Modal>
//       </div>
//       <Footer/>
//     </>
//   );
// };

// export default List;


import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, message, Modal, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './list.css';
import Header from './Header';
import Footer from './Footer';
import Papa from 'papaparse'; // Import papaparse
import { saveAs } from 'file-saver'; // To save the file
import PieChartComponent from './PieChartComponent'; // Import PieChartComponent

const { Option } = Select;
const { RangePicker } = DatePicker;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const services = ['AMAZON', 'MEESHO', 'FLIPKART', 'EBAY', 'WEBSITE', 'FRANCHISE'];

const servicePrefixes = {
  AMAZON: 'AZ',
  MEESHO: 'M',
  FLIPKART: 'FL',
  EBAY: 'EB',
  WEBSITE: 'WB',
  FRANCHISE: 'F',
};

const managers = Array.from({ length: 20 }, (_, i) => `TL${i + 1}`);

const List = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editRecord, setEditRecord] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(''); // New state for search text
  const [dateRange, setDateRange] = useState([]); // Initialize as empty array
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchText); // Trigger search whenever search text changes
  }, [searchText, data, dateRange, selectedMonth]); // Add dateRange and selectedMonth dependency

  const fetchData = () => {
    axios
      .get(`${apiUrl}/api/enrollments`)
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
        setFilteredData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        message.error('Error fetching data');
        setLoading(false);
      });
  };

  // Function to handle search
  // Function to handle search
  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
  
    const newFilteredData = data.filter(item => {
      const isDateRangeValid = Array.isArray(dateRange) && dateRange.length === 2;
      const itemDate = moment(item.date);
  
      const isWithinDateRange = !isDateRangeValid || (
        itemDate.isSameOrAfter(dateRange[0], 'day') && itemDate.isSameOrBefore(dateRange[1], 'day')
      );
  
      // Ensure properties are defined before calling toLowerCase
      const itemName = item.name ? item.name.toLowerCase() : '';
      const itemUsername = item.username ? item.username.toLowerCase() : '';
      const itemEmail = item.email ? item.email.toLowerCase() : '';
      const itemPrimaryContact = item.primaryContact ? item.primaryContact.toLowerCase() : '';
      const itemManager = item.manager ? item.manager.toLowerCase() : '';
      const itemService = item.service ? item.service.toLowerCase() : '';
  
      return (
        itemName.includes(searchValue) ||
        itemUsername.includes(searchValue) ||
        itemEmail.includes(searchValue) ||
        itemPrimaryContact.includes(searchValue) ||
        itemManager.includes(searchValue) ||
        itemService.includes(searchValue) &&
        isWithinDateRange
      );
    });
  
    setFilteredData(newFilteredData);
  };
  


  const handleEdit = (record) => {
    setEditRecord(record);
    editForm.setFieldsValue({
      ...record,
      date: moment(record.date, 'YYYY-MM-DD'),
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    editForm
      .validateFields()
      .then((values) => {
        values.date = values.date.format('YYYY-MM-DD');
        axios
          .put(`${apiUrl}/api/enrollments/${editRecord._id}`, values)
          .then((response) => {
            message.success('Enrollment updated successfully');
            setEditModalVisible(false);
            fetchData();
          })
          .catch((error) => {
            message.error('Failed to update enrollment');
          });
      })
      .catch((error) => {
        message.error('Validation failed');
      });
  };

  const exportToCSV = () => {
    // Extract only the columns that are displayed in the table
    const csvData = filteredData.map((item) => ({
      date: moment(item.date).format('DD/MM/YYYY'), // Format date for CSV
      username: item.username,
      manager: item.manager,
      primaryContact: item.primaryContact,
      secondaryContact: item.secondaryContact,
      email: item.email,
      service: item.service,
      enrollmentId: item.enrollmentId,  
    }));
  
    // Convert data to CSV format using PapaParse
    const csv = Papa.unparse(csvData);
  
    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
    // Save the file using file-saver
    saveAs(blob, 'enrollment_list.csv');
  };
  

  // const handleFilter = (service) => {
  //   let filtered;
  //   if (service === 'AMAZON_WEBSITE') {
  //     filtered = data.filter(item => 
  //       item.enrollmentId.startsWith(servicePrefixes['AMAZON']) || 
  //       item.enrollmentId.startsWith(servicePrefixes['WEBSITE'])
  //     );
  //   } else {
  //     const prefix = servicePrefixes[service];
  //     filtered = data.filter(item => item.enrollmentId.startsWith(prefix));
  //   }
  //   setFilteredData(filtered);
  // };


  const handleFilter = (service) => {
    if (service === 'AMAZON_WEBSITE') {
      // Get entries for AMAZON and WEBSITE services
      const amazonEntries = data.filter(item => item.service === 'AMAZON');
      const websiteEntries = data.filter(item => item.service === 'WEBSITE');
      
      // Find common primaryContacts between AMAZON and WEBSITE entries
      const amazonContacts = new Set(amazonEntries.map(item => item.primaryContact));
      const commonContacts = websiteEntries
        .filter(item => amazonContacts.has(item.primaryContact))
        .map(item => item.primaryContact);
  
      // Filter data to include only entries with common primaryContacts
      const filtered = data.filter(item => commonContacts.includes(item.primaryContact));
  
      setFilteredData(filtered);
    } else {
      // Original filtering logic for other services
      const prefix = servicePrefixes[service];
      const filtered = data.filter(item => item.enrollmentId.startsWith(prefix));
      setFilteredData(filtered);
    }
  };

  
  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/api/enrollments/${id}`)
      .then((response) => {
        message.success('Enrollment deleted successfully');
        fetchData();
      })
      .catch((error) => {
        message.error('Failed to delete enrollment');
      });
  };

  const handleDeleteSelected = () => {
    const promises = selectedRowKeys.map((id) => axios.delete(`${apiUrl}/api/enrollments/${id}`));
    Promise.all(promises)
      .then(() => {
        message.success('Selected enrollments deleted successfully');
        fetchData();
        setSelectedRowKeys([]);
      })
      .catch((error) => {
        message.error('Failed to delete selected enrollments');
      });
  };

  const columns = [
    {
      title: 'Enrollment ID',
      dataIndex: 'enrollmentId',
      key: 'enrollmentId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Manager Name',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Primary Contact',
      dataIndex: 'primaryContact',
      key: 'primaryContact',
    },
    {
      title: 'Secondary Contact',
      dataIndex: 'secondaryContact',
      key: 'secondaryContact',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <>
      <Header />

      <PieChartComponent data={filteredData} /> {/* Display the pie chart */}

      <div className="list-container">
        <Card title="Service Filter" className="filter-card">
          <Space>
            {services.map((service) => (
              <Button key={service} onClick={() => handleFilter(service)}>
                {service}
              </Button>
            ))}
            <Button key="AMAZON_WEBSITE" onClick={() => handleFilter('AMAZON_WEBSITE')}>
              AMAZON & WEBSITE
            </Button>
          </Space>
        </Card>
        
        <Card title="Date and Month Filter" className="filter-card">
          <Space>
            <RangePicker
              onChange={(dates, dateStrings) => setDateRange(dates)}
              format="DD/MM/YYYY"
            />
            {/* <DatePicker
              picker="month"
              onChange={(date, dateString) => setSelectedMonth(date)}
              format="MM/YYYY"
            /> */}
          </Space>
        </Card>

        <Card title="Enrollment List" className="table-card">
          <Space style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0}
            >
              Delete Selected
            </Button>
            <Button onClick={exportToCSV}>
              Export to CSV
            </Button>
          </Space>

          <Input.Search
            placeholder="Search by Enrollment ID, Name, Email, or Contact"
            allowClear
            enterButton="Search"
            onSearch={setSearchText}
            style={{ marginBottom: 16 }}
          />

          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            rowSelection={rowSelection}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

       
        
        <Footer />
      </div>

      <Modal
        title="Edit Enrollment"
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input the username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="manager" label="Manager" rules={[{ required: true, message: 'Please select the manager!' }]}>
            <Select>
              {managers.map((manager) => (
                <Option key={manager} value={manager}>
                  {manager}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="primaryContact" label="Primary Contact" rules={[{ required: true, message: 'Please input the primary contact!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="secondaryContact" label="Secondary Contact">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item name="service" label="Service" rules={[{ required: true, message: 'Please select the service!' }]}>
            <Select>
              {services.map((service) => (
                <Option key={service} value={service}>
                  {service}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default List;

