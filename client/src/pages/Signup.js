// import React from 'react';
// import { Form, Input, Button, Select, Card } from 'antd';
// import axios from 'axios';
// import './signup.css';

// const { Option } = Select;
// const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const Signup = () => {
//   const [form] = Form.useForm();
  
//   const onFinish = (values) => {
//     axios.post(`${apiUrl}/api/auth/signup`, values)
//       .then(response => {
//         console.log('Signup successful', response);
//       })
//       .catch(error => {
//         console.error('There was an error signing up!', error);
//       });
//   };

//   return (
//     <div className="signup-container">
//       <Card title="Sign Up" className="signup-card">
//         <Form
//           form={form}
//           name="signup"
//           onFinish={onFinish}
//           layout="vertical"
//         >
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please input your username!' }]}
//           >
//             <Input placeholder="Enter your username" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password placeholder="Enter your password" />
//           </Form.Item>
//           <Form.Item
//             name="usertype"
//             label="User Type"
//             rules={[{ required: true, message: 'Please select a user type!' }]}
//           >
//             <Select placeholder="Select a user type">
//               <Option value="marketing">Marketing</Option>
//               <Option value="telesales">Telesales</Option>
//               <Option value="managerwebsite">Manager Website</Option>
//               <Option value="manageramazon">Manager Amazon</Option>
//               <Option value="admin">Admin</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//               Sign Up
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default Signup;
