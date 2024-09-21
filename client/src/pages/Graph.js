import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, Spin, message } from 'antd';
import moment from 'moment';


const { Option } = Select;
const apiUrl = process.env.REACT_APP_BACKEND_URL;


const EnrollmentGraph = () => {
 const [data, setData] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [filter, setFilter] = useState('last7days'); // Default filter


 const fetchData = () => {
   axios
     .get(`${apiUrl}/api/enrollments`)
     .then((response) => {
       const sortedData = response.data.sort(
         (a, b) => new Date(b.date) - new Date(a.date)
       );
       setData(sortedData);
       setFilteredData(filterData(sortedData, filter));
       setLoading(false);
     })
     .catch((error) => {
       message.error('Error fetching data');
       setLoading(false);
     });
 };


 const filterData = (data, filter) => {
   const now = moment();
   let filtered;
   switch (filter) {
     case 'today':
       filtered = data.filter((item) =>
         moment(item.date).isSame(now, 'day')
       );
       break;
     case 'last7days':
       filtered = data.filter((item) =>
         moment(item.date).isAfter(now.clone().subtract(7, 'days'))
       );
       break;
     case 'month':
       filtered = data.filter((item) =>
         moment(item.date).isSame(now, 'month')
       );
       break;
     case 'last30days':
       filtered = data.filter((item) =>
         moment(item.date).isAfter(now.clone().subtract(30, 'days'))
       );
       break;
     case 'lastMonth':
       filtered = data.filter((item) =>
         moment(item.date).isSame(now.clone().subtract(1, 'month'), 'month')
       );
       break;
     case '6months':
       filtered = data.filter((item) =>
         moment(item.date).isAfter(now.clone().subtract(6, 'months'))
       );
       break;
     case 'yearly':
       filtered = data.filter((item) =>
         moment(item.date).isSame(now, 'year')
       );
       break;
     default:
       filtered = data;
   }
   return filtered;
 };


 const handleFilterChange = (value) => {
   setFilter(value);
   setFilteredData(filterData(data, value));
 };


 useEffect(() => {
   fetchData();
 }, []);


 const getServiceCounts = () => {
   const counts = { AMAZON: 0, FRANCHISE: 0, WEBSITE: 0 };
   filteredData.forEach((item) => {
     if (item.service === 'AMAZON') counts.AMAZON += 1;
     if (item.service === 'FRANCHISE') counts.FRANCHISE += 1;
     if (item.service === 'WEBSITE') counts.WEBSITE += 1;
   });
   return [
     { name: 'AMAZON', users: counts.AMAZON },
     { name: 'FRANCHISE', users: counts.FRANCHISE },
     { name: 'WEBSITE', users: counts.WEBSITE },
   ];
 };


 return (
   <div>
     <h2>Enrollment Service Statistics</h2>
     <Select value={filter} onChange={handleFilterChange} style={{ width: 200, marginBottom: 20 }}>
       <Option value="today">Today</Option>
       <Option value="last7days">Last 7 Days</Option>
       <Option value="month">This Month</Option>
       <Option value="last30days">Last 30 Days</Option>
       <Option value="lastMonth">Last Month</Option>
       <Option value="6months">Last 6 Months</Option>
       <Option value="yearly">This Year</Option>
     </Select>


     {loading ? (
       <Spin tip="Loading..." />
     ) : (
       <ResponsiveContainer width="100%" height={400}>
         <BarChart data={getServiceCounts()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip />
           <Legend />
           <Bar dataKey="users" fill="#8884d8" />
         </BarChart>
       </ResponsiveContainer>
     )}
   </div>
 );
};


export default EnrollmentGraph;



