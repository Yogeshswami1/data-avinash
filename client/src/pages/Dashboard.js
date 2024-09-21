// import React from 'react';
// import { Form, Input, Button, DatePicker, Select, Upload, message, Card, Row, Col } from 'antd';
// import { DownloadOutlined, UploadOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './dashboard.css';
// import sample from './Sample.csv';
// import Footer from './Footer';
// import Header from './Header';

// const { Option } = Select;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Dashboard = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const handleFormSubmit = (values) => {
//     axios.post(`${apiUrl}/api/enroll`, values)
//       .then(response => {
//         message.success('Form submitted successfully');
//       })
//       .catch(error => {
//         if (error.response && error.response.data) {
//           message.error(error.response.data.message);
//         } else {
//           message.error('There was an error submitting the form');
//         }
//       });
//   };

//   const handleFileUpload = ({ file }) => {
//     const formData = new FormData();
//     formData.append('file', file);
  
//     axios.post(`${apiUrl}/api/upload`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(response => {
//         if (response.data.skippedEntries && response.data.skippedEntries.length > 0) {
//           message.warning(`File uploaded successfully, but ${response.data.skippedEntries.length} entries were skipped because they already existed.`);
//         } else {
//           message.success('File uploaded successfully');
//         }
//       })
//       .catch(error => {
//         message.error('File upload failed');
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//     message.success("Successfully Logged out");
//   };

//   const navigateToList = () => {
//     navigate('/list');
//   };

//   return (
//     <>
//     <Header/>
    
//     <div className="dashboard-container">
      
//       <Row justify="space-between" align="middle" className="dashboard-header">
//         <Col>
//           <Button icon={<LogoutOutlined />} onClick={handleLogout}>
//             Logout
//           </Button>
//         </Col>
//         <Col>
//           <Button icon={<UnorderedListOutlined />} onClick={navigateToList}>
//             List
//           </Button>
//         </Col>
//       </Row>

//       <Card title="Welcome Admin" className="dashboard-card">
//         <Form
//           form={form}
//           name="enrollment"
//           onFinish={handleFormSubmit}
//           layout="vertical"
//         >
//           <Form.Item
//             name="date"
//             label="Date"
//             rules={[{ required: true, message: 'Please select the date!' }]}
//           >
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please input the username!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="manager"
//             label="Manager Name"
//             rules={[{ required: true, message: 'Please select a manager!' }]}
//           >
//             <Select style={{ width: '100%' }}>
//               {Array.from({ length: 20 }, (_, i) => (
//                 <Option key={`TL${i + 1}`} value={`TL${i + 1}`}>
//                   TL{i + 1}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="primaryContact"
//             label="Primary Contact"
//             rules={[{ required: true, message: 'Please input the primary contact!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="secondaryContact"
//             label="Secondary Contact"
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[{ required: true, message: 'Please input the email!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="service"
//             label="Service"
//             rules={[{ required: true, message: 'Please select a service!' }]}
//           >
//             <Select style={{ width: '100%' }}>
//               <Option value="AMAZON">AMAZON</Option>
//               <Option value="MEESHO">MEESHO</Option>
//               <Option value="WEBSITE">WEBSITE</Option>
//               <Option value="FRANCHISE">FRANCHISE</Option>
//               <Option value="EBAY">EBAY</Option>
//               <Option value="FLIPKART">FLIPKART</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="enrollmentId"
//             label="Enrollment ID"
//             rules={[{ required: true, message: 'Please input the enrollment ID!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>

//       <Card title="Download Sample CSV" className="dashboard-card">
//         <a href={sample} download="Sample.csv">
//           <Button icon={<DownloadOutlined />} style={{ width: '100%' }}>Download Sample CSV</Button>
//         </a>
//       </Card>

//       <Card title="Import CSV Data" className="dashboard-card">
//         <Upload
//           name="file"
//           customRequest={handleFileUpload}
//           showUploadList={false}
//         >
//           <Button icon={<UploadOutlined />} style={{ width: '100%' }}>Click to Upload</Button>
//         </Upload>
//       </Card>
     
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Form, Input, Button, DatePicker, Select, Upload, message, Card, Row, Col } from 'antd';
import { DownloadOutlined, UploadOutlined, LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import sample from './Sample.csv';
import Footer from './Footer';
import Header from './Header';
import video from './bg.mp4';
import Graph from "./Graph.js";
const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    axios.post(`${apiUrl}/api/enroll`, values)
      .then(response => {
        message.success('Form submitted successfully');
        form.resetFields(); // Clear the form entries after successful submission
      })
      .catch(error => {
        if (error.response && error.response.data) {
          message.error(error.response.data.message);
        } else {
          message.error('There was an error submitting the form');
        }
      });
  };

  const handleFileUpload = ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
  
    axios.post(`${apiUrl}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (response.data.skippedEntries && response.data.skippedEntries.length > 0) {
          message.warning(`File uploaded successfully, but ${response.data.skippedEntries.length} entries were skipped because they already existed.`);
        } else {
          message.success('File uploaded successfully');
        }
      })
      .catch(error => {
        message.error('File upload failed');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    message.success("Successfully Logged out");
  };

  const navigateToList = () => {
    navigate('/list');
  };

  return (
    <>
      <Header/>
      
      <div className="dashboard-container">
        {/* Background Video */}
        <video autoPlay muted loop className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Row justify="space-between" align="middle" className="dashboard-header">
          <Col>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </Col>
          <Col>
            <Button icon={<UnorderedListOutlined />} onClick={navigateToList}>
              List
            </Button>
          </Col>
        </Row>

        <Card title="Welcome Admin" className="dashboard-card">
          <Graph/>
          <Form
            form={form}
            name="enrollment"
            onFinish={handleFormSubmit}
            layout="vertical"
          >
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select the date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input the username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="manager"
              label="Manager Name"
              rules={[{ required: true, message: 'Please select a manager!' }]}
            >
              <Select style={{ width: '100%' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <Option key={`TL${i + 1}`} value={`TL${i + 1}`}>
                    TL{i + 1}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="primaryContact"
              label="Primary Contact"
              rules={[{ required: true, message: 'Please input the primary contact!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="secondaryContact"
              label="Secondary Contact"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="service"
              label="Service"
              rules={[{ required: true, message: 'Please select a service!' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value="AMAZON">AMAZON</Option>
                <Option value="MEESHO">MEESHO</Option>
                <Option value="WEBSITE">WEBSITE</Option>
                <Option value="FRANCHISE">FRANCHISE</Option>
                <Option value="EBAY">EBAY</Option>
                <Option value="FLIPKART">FLIPKART</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="enrollmentId"
              label="Enrollment ID"
              rules={[{ required: true, message: 'Please input the enrollment ID!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="Download Sample CSV" className="dashboard-card">
          <a href={sample} download="Sample.csv">
            <Button icon={<DownloadOutlined />} style={{ width: '100%' }}>Download Sample CSV</Button>
          </a>
        </Card>

        <Card title="Import CSV Data" className="dashboard-card">
          <Upload
            name="file"
            customRequest={handleFileUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} style={{ width: '100%' }}>Click to Upload</Button>
          </Upload>
        </Card>
        <Footer/>
      </div>
     
    </>
  );
};

export default Dashboard;
