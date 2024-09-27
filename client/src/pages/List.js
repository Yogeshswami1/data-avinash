// import React, { useState, useEffect } from 'react';
// import { Table, Button, Space, Card, message, Modal, Form, Input, Select, DatePicker } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './list.css';
// import Header from './Header';
// import Footer from './Footer';
// import Papa from 'papaparse'; // Import papaparse
// import { saveAs } from 'file-saver'; // To save the file
// import PieChartComponent from './PieChartComponent'; // Import PieChartComponent




// const { Option } = Select;
// const { RangePicker } = DatePicker;
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
//   const [dateRange, setDateRange] = useState([]); // Initialize as empty array
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(null);




//   useEffect(() => {
//     fetchData();
//   }, []);




//   useEffect(() => {
//     handleSearch(searchText); // Trigger search whenever search text changes
//   }, [searchText, data, dateRange, selectedMonth]); // Add dateRange and selectedMonth dependency




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


//   const handleSearch = (value) => {
//     console.log("Search Value:", value); // Debugging line
//     const searchValue = value.toLowerCase();
//     const isDateRangeSearch = /(\d{2}\/\d{2}\/\d{4})\s+to\s+(\d{2}\/\d{2}\/\d{4})/.test(searchValue);
//     const isDateRangeValid = Array.isArray(dateRange) && dateRange.length === 2;
//     const isMonthSelected = selectedMonth !== null;
//     const isYearSelected = selectedYear !== null;
//     const newFilteredData = data.filter(item => {
//       const itemDate = moment(item.date);
//       const itemYear = itemDate.year();
//       const itemMonth = itemDate.month(); // 0-based month (0 = January, 11 = December)
//       const itemFormattedDate = itemDate.format('DD/MM/YYYY');
//       // Date range search logic
//       let isInDateRange = false;
//       if (isDateRangeSearch) {
//         const [startDateStr, endDateStr] = searchValue.match(/(\d{2}\/\d{2}\/\d{4})\s+to\s+(\d{2}\/\d{2}\/\d{4})/).slice(1);
//         const startDate = moment(startDateStr, 'DD/MM/YYYY');
//         const endDate = moment(endDateStr, 'DD/MM/YYYY');
//         isInDateRange = itemDate.isBetween(startDate, endDate, 'day', '[]'); // inclusive of start and end dates
//       }
//       // Check if searchValue is a valid year
//       const isYearSearch = /^\d{4}$/.test(searchValue);
//       const isWithinDateRange = !isDateRangeValid || (
//         itemDate.isSameOrAfter(dateRange[0], 'day') && itemDate.isSameOrBefore(dateRange[1], 'day')
//       );
//       return (
//         (item.name?.toLowerCase().includes(searchValue) ||
//         item.username?.toLowerCase().includes(searchValue) ||
//         item.email?.toLowerCase().includes(searchValue) ||
//         item.primaryContact?.toLowerCase().includes(searchValue) ||
//         item.manager?.toLowerCase().includes(searchValue) ||
//         item.service?.toLowerCase().includes(searchValue) ||
//         item.enrollmentId?.toLowerCase().includes(searchValue) ||
//         isYearSearch && itemYear === parseInt(searchValue) ||
//         isInDateRange) &&
//         isWithinDateRange &&
//         (!isMonthSelected || itemMonth === selectedMonth.month()) &&
//         (!isYearSelected || itemYear === selectedYear.year())
//       );
//     });
//     setFilteredData(newFilteredData);
//   };


//   const handleEdit = (record) => {
//     setEditRecord(record);
//     editForm.setFieldsValue({
//       ...record,
//       date: moment(record.date, 'YYYY-MM-DD'),
//     });
//     setEditModalVisible(true);
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
//     // Extract only the columns that are displayed in the table
//     const csvData = filteredData.map((item) => ({
//       date: moment(item.date).format('DD/MM/YYYY'), // Format date for CSV
//       username: item.username,
//       manager: item.manager,
//       primaryContact: item.primaryContact,
//       secondaryContact: item.secondaryContact,
//       email: item.email,
//       service: item.service,
//       enrollmentId: item.enrollmentId, 
//     }));
//     // Convert data to CSV format using PapaParse
//     const csv = Papa.unparse(csvData);
//     // Create a Blob from the CSV data
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     // Save the file using file-saver
//     saveAs(blob, 'enrollment_list.csv');
//   };






//   const handleFilter = (service) => {
//     if (service === 'AMAZON_WEBSITE') {
//       const amazonEntries = data.filter(item => item.service === 'AMAZON');
//       const websiteEntries = data.filter(item => item.service === 'WEBSITE');
   
//       const amazonContacts = new Set(amazonEntries.map(item => item.primaryContact));
//       const commonContacts = websiteEntries
//         .filter(item => amazonContacts.has(item.primaryContact))
//         .map(item => item.primaryContact);
//       const filtered = data.filter(item => commonContacts.includes(item.primaryContact));
//       setFilteredData(filtered);
//     } else {
//       const prefix = servicePrefixes[service];
//       const filtered = data.filter(item => item.enrollmentId.startsWith(prefix));
//       setFilteredData(filtered);
//     }
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
//   const handleMonthChange = (date) => {
//     if (date) {
//       setSelectedMonth(date.startOf('month'));
//     } else {
//       setSelectedMonth(null);
//     }
//   };
//   const handleYearChange = (date) => {
//     if (date) {
//       setSelectedYear(date.year());
//     } else {
//       setSelectedYear(null);
//     }
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




//       <PieChartComponent data={filteredData} /> {/* Display the pie chart */}




//       <div className="list-container">
//         <Card title="Service Filter" className="filter-card">
//           <Space>
//             {services.map((service) => (
//               <Button key={service} onClick={() => handleFilter(service)}>
//                 {service}
//               </Button>
//             ))}
//             <Button key="AMAZON_WEBSITE" onClick={() => handleFilter('AMAZON_WEBSITE')}>
//               AMAZON & WEBSITE
//             </Button>
//           </Space>
//         </Card>
     
//         <Card title="Filters" className="filter-card">
//   <Space>
//     <DatePicker
//       picker="month"
//       onChange={handleMonthChange}
//       format="MM/YYYY"
//     />
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
//             <Button onClick={exportToCSV}>
//               Export to CSV
//             </Button>
//           </Space>
//           <Input.Search
//   placeholder="Search by Enrollment ID, Name, Email, Contact, or Year"
//   allowClear
//   enterButton="Search"
//   onSearch={handleSearch}
//   style={{ marginBottom: 16 }}
// />
//           <Table
//             columns={columns}
//             dataSource={filteredData}
//             loading={loading}
//             rowSelection={rowSelection}
//             rowKey="_id"
//             pagination={{ pageSize: 10 }}
//           />
//         </Card>
   
//         <Footer />
//       </div>


//       <Modal
//         title="Edit Enrollment"
//         visible={editModalVisible}
//         onOk={handleEditSubmit}
//         onCancel={() => setEditModalVisible(false)}
//       >
//         <Form form={editForm} layout="vertical">
//           <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input the username!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="manager" label="Manager" rules={[{ required: true, message: 'Please select the manager!' }]}>
//             <Select>
//               {managers.map((manager) => (
//                 <Option key={manager} value={manager}>
//                   {manager}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item name="primaryContact" label="Primary Contact" rules={[{ required: true, message: 'Please input the primary contact!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="secondaryContact" label="Secondary Contact">
//             <Input />
//           </Form.Item>
//           <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
//             <DatePicker format="DD/MM/YYYY" />
//           </Form.Item>
//           <Form.Item name="service" label="Service" rules={[{ required: true, message: 'Please select the service!' }]}>
//             <Select>
//               {services.map((service) => (
//                 <Option key={service} value={service}>
//                   {service}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
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
import AmazonWebsiteTable from './AmazonWebsiteTable';




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
 const [selectedYear, setSelectedYear] = useState(null);
 const [showAmazonWebsiteTable, setShowAmazonWebsiteTable] = useState(false); // New state to toggle table visibility
 const [amazonWebsiteData, setAmazonWebsiteData] = useState([]); // New state for AMAZON_WEBSITE data
 const [isAmazonOnly, setIsAmazonOnly] = useState(false); // State to toggle Amazon-only filter
 const [isWebsiteOnly, setIsWebsiteOnly] = useState(false); // State to toggle Website-only filter








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


 const handleSearch = (value) => {
   console.log("Search Value:", value); // Debugging line
   const searchValue = value.toLowerCase();
   const isDateRangeSearch = /(\d{2}\/\d{2}\/\d{4})\s+to\s+(\d{2}\/\d{2}\/\d{4})/.test(searchValue);
   const isDateRangeValid = Array.isArray(dateRange) && dateRange.length === 2;
   const isMonthSelected = selectedMonth !== null;
   const isYearSelected = selectedYear !== null;
   const newFilteredData = data.filter(item => {
     const itemDate = moment(item.date);
     const itemYear = itemDate.year();
     const itemMonth = itemDate.month(); // 0-based month (0 = January, 11 = December)
     const itemFormattedDate = itemDate.format('DD/MM/YYYY');
     // Date range search logic
     let isInDateRange = false;
     if (isDateRangeSearch) {
       const [startDateStr, endDateStr] = searchValue.match(/(\d{2}\/\d{2}\/\d{4})\s+to\s+(\d{2}\/\d{2}\/\d{4})/).slice(1);
       const startDate = moment(startDateStr, 'DD/MM/YYYY');
       const endDate = moment(endDateStr, 'DD/MM/YYYY');
       isInDateRange = itemDate.isBetween(startDate, endDate, 'day', '[]'); // inclusive of start and end dates
     }
     // Check if searchValue is a valid year
     const isYearSearch = /^\d{4}$/.test(searchValue);
     const isWithinDateRange = !isDateRangeValid || (
       itemDate.isSameOrAfter(dateRange[0], 'day') && itemDate.isSameOrBefore(dateRange[1], 'day')
     );
     return (
       (item.name?.toLowerCase().includes(searchValue) ||
       item.username?.toLowerCase().includes(searchValue) ||
       item.email?.toLowerCase().includes(searchValue) ||
       item.primaryContact?.toLowerCase().includes(searchValue) ||
       item.manager?.toLowerCase().includes(searchValue) ||
       item.service?.toLowerCase().includes(searchValue) ||
       item.enrollmentId?.toLowerCase().includes(searchValue) ||
       isYearSearch && itemYear === parseInt(searchValue) ||
       isInDateRange) &&
       isWithinDateRange &&
       (!isMonthSelected || itemMonth === selectedMonth.month()) &&
       (!isYearSelected || itemYear === selectedYear.year())
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
 //   if (service === 'AMAZON_WEBSITE') {
 //     const amazonEntries = data.filter(item => item.service === 'AMAZON');
 //     const websiteEntries = data.filter(item => item.service === 'WEBSITE');
   
 //     const amazonContacts = new Set(amazonEntries.map(item => item.primaryContact));
 //     const commonContacts = websiteEntries
 //       .filter(item => amazonContacts.has(item.primaryContact))
 //       .map(item => item.primaryContact);
 //     const filtered = data.filter(item => commonContacts.includes(item.primaryContact));
 //     setFilteredData(filtered);
 //   } else {
 //     const prefix = servicePrefixes[service];
 //     const filtered = data.filter(item => item.enrollmentId.startsWith(prefix));
 //     setFilteredData(filtered);
 //   }
 // };




  // Amazon-only filter function
  const handleAmazonOnlyFilter = () => {
   const amazonEntries = data.filter(item => item.service === 'AMAZON');
   const websiteEntries = data.filter(item => item.service === 'WEBSITE');
   const websiteContacts = new Set(websiteEntries.map(item => item.primaryContact));


   // Filter Amazon entries where primaryContact is not in websiteContacts
   const amazonOnly = amazonEntries.filter(item => !websiteContacts.has(item.primaryContact));
  
   setFilteredData(amazonOnly);
   setIsAmazonOnly(true); // Set Amazon-only flag to true
 };


  // Website-only filter function
  const handleWebsiteOnlyFilter = () => {
   const websiteEntries = data.filter(item => item.service === 'WEBSITE');
   const amazonEntries = data.filter(item => item.service === 'AMAZON');
   const amazonContacts = new Set(amazonEntries.map(item => item.primaryContact));


   // Filter Amazon entries where primaryContact is not in websiteContacts
   const websiteOnly = websiteEntries.filter(item => !amazonContacts.has(item.primaryContact));
  
   setFilteredData(websiteOnly);
   setIsWebsiteOnly(true); // Set Amazon-only flag to true
 };


 // Reset filter to show all data
 const resetFilter = () => {
   setFilteredData(data);
   setIsAmazonOnly(false);
   setIsWebsiteOnly(false);
 };




 const handleFilter = (service) => {
   if (service === 'AMAZON_WEBSITE') {
     const amazonEntries = data.filter(item => item.service === 'AMAZON');
     const websiteEntries = data.filter(item => item.service === 'WEBSITE');
   
     const amazonContacts = new Set(amazonEntries.map(item => item.primaryContact));
     const commonContacts = websiteEntries
       .filter(item => amazonContacts.has(item.primaryContact))
       .map(item => item.primaryContact);
     // Filter data for display in the custom table
     const combinedData = commonContacts.map(contact => ({
       primaryContact: contact,
       amazonEntry: amazonEntries.find(item => item.primaryContact === contact),
       websiteEntry: websiteEntries.find(item => item.primaryContact === contact),
     }));
     setAmazonWebsiteData(combinedData);
     setShowAmazonWebsiteTable(true);
   } else {
     setShowAmazonWebsiteTable(false);
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
 const handleMonthChange = (date) => {
   if (date) {
     setSelectedMonth(date.startOf('month'));
   } else {
     setSelectedMonth(null);
   }
 };
 const handleYearChange = (date) => {
   if (date) {
     setSelectedYear(date.year());
   } else {
     setSelectedYear(null);
   }
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
          
         <Button onClick={handleAmazonOnlyFilter}>Amazon Only</Button>
         <Button onClick={handleWebsiteOnlyFilter}>Website Only</Button>
         <Button onClick={resetFilter}>Reset Filter</Button>
      
         </Space>
       </Card>
     
       <Card title="Filters" className="filter-card">
 <Space>
   <DatePicker
     picker="month"
     onChange={handleMonthChange}
     format="MM/YYYY"
   />
 </Space>
</Card>
{showAmazonWebsiteTable ? (
         <AmazonWebsiteTable data={amazonWebsiteData} /> // Display the new table for AMAZON & WEBSITE
       ) : (
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
 placeholder="Search by Enrollment ID, Name, Email, Contact, or Year"
 allowClear
 enterButton="Search"
 onSearch={handleSearch}
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
       )}
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

































