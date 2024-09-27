// import React from 'react';
// import { Table } from 'antd';
// import moment from 'moment';


// const AmazonWebsiteTable = ({ data }) => {
//   const columns = [
//     {
//       title: 'Primary Contact',
//       dataIndex: 'primaryContact',
//       key: 'primaryContact',
//     },
//     {
//       title: 'Enrollment ID (AMAZON)',
//       dataIndex: 'enrollmentIdAmazon',
//       key: 'enrollmentIdAmazon',
//     },
//     {
//       title: 'Enrollment ID (WEBSITE)',
//       dataIndex: 'enrollmentIdWebsite',
//       key: 'enrollmentIdWebsite',
//     },
//     {
//       title: 'Date (AMAZON)',
//       dataIndex: 'dateAmazon',
//       key: 'dateAmazon',
//       render: (text) => text ? moment(text).format('DD/MM/YYYY') : 'N/A',
//     },
//     {
//       title: 'Date (WEBSITE)',
//       dataIndex: 'dateWebsite',
//       key: 'dateWebsite',
//       render: (text) => text ? moment(text).format('DD/MM/YYYY') : 'N/A',
//     },
//     {
//       title: 'Manager (AMAZON)',
//       dataIndex: 'managerAmazon',
//       key: 'managerAmazon',
//     },
//     {
//       title: 'Manager (WEBSITE)',
//       dataIndex: 'managerWebsite',
//       key: 'managerWebsite',
//     },
//     {
//       title: 'Email (AMAZON)',
//       dataIndex: 'emailAmazon',
//       key: 'emailAmazon',
//     },
//     {
//       title: 'Email (WEBSITE)',
//       dataIndex: 'emailWebsite',
//       key: 'emailWebsite',
//     },
//   ];


//   // Prepare the table data
//   const tableData = data.map(item => ({
//     key: item.primaryContact,
//     primaryContact: item.primaryContact,
//     enrollmentIdAmazon: item.amazonEntry?.enrollmentId || 'N/A',
//     enrollmentIdWebsite: item.websiteEntry?.enrollmentId || 'N/A',
//     dateAmazon: item.amazonEntry?.date || null,
//     dateWebsite: item.websiteEntry?.date || null,
//     managerAmazon: item.amazonEntry?.manager || 'N/A',
//     managerWebsite: item.websiteEntry?.manager || 'N/A',
//     emailAmazon: item.amazonEntry?.email || 'N/A',
//     emailWebsite: item.websiteEntry?.email || 'N/A',
//   }));


//   return (
//     <Table
//       columns={columns}
//       dataSource={tableData}
//       pagination={{ pageSize: 10 }}
//       rowKey="primaryContact"
//     />
//   );
// };


// export default AmazonWebsiteTable;






import React, { useState, useEffect } from 'react';
import { Table, Input, Card } from 'antd';
import moment from 'moment';


const { Search } = Input;


const AmazonWebsiteTable = ({ data }) => {
 const [filteredData, setFilteredData] = useState(data);
 const [searchText, setSearchText] = useState('');


 // Prepare the table data
 const tableData = data.map(item => ({
   key: item.primaryContact,
   primaryContact: item.primaryContact,
   enrollmentIdAmazon: item.amazonEntry?.enrollmentId || 'N/A',
   enrollmentIdWebsite: item.websiteEntry?.enrollmentId || 'N/A',
   dateAmazon: item.amazonEntry?.date || null,
   dateWebsite: item.websiteEntry?.date || null,
   managerAmazon: item.amazonEntry?.manager || 'N/A',
   managerWebsite: item.websiteEntry?.manager || 'N/A',
   emailAmazon: item.amazonEntry?.email || 'N/A',
   emailWebsite: item.websiteEntry?.email || 'N/A',
 }));


 // Filter table data by primary contact
 useEffect(() => {
   const newFilteredData = tableData.filter(item =>
     item.primaryContact.toLowerCase().includes(searchText.toLowerCase())
   );
   setFilteredData(newFilteredData);
 }, [searchText, tableData]);


 // Count the number of common entries
 const commonEntriesCount = tableData.filter(
   item => item.enrollmentIdAmazon !== 'N/A' && item.enrollmentIdWebsite !== 'N/A'
 ).length;


 const columns = [
   {
     title: 'Primary Contact',
     dataIndex: 'primaryContact',
     key: 'primaryContact',
   },
   {
     title: 'Enrollment ID (AMAZON)',
     dataIndex: 'enrollmentIdAmazon',
     key: 'enrollmentIdAmazon',
   },
   {
     title: 'Enrollment ID (WEBSITE)',
     dataIndex: 'enrollmentIdWebsite',
     key: 'enrollmentIdWebsite',
   },
   {
     title: 'Date (AMAZON)',
     dataIndex: 'dateAmazon',
     key: 'dateAmazon',
     render: (text) => (text ? moment(text).format('DD/MM/YYYY') : 'N/A'),
   },
   {
     title: 'Date (WEBSITE)',
     dataIndex: 'dateWebsite',
     key: 'dateWebsite',
     render: (text) => (text ? moment(text).format('DD/MM/YYYY') : 'N/A'),
   },
   {
     title: 'Manager (AMAZON)',
     dataIndex: 'managerAmazon',
     key: 'managerAmazon',
   },
   {
     title: 'Manager (WEBSITE)',
     dataIndex: 'managerWebsite',
     key: 'managerWebsite',
   },
   {
     title: 'Email (AMAZON)',
     dataIndex: 'emailAmazon',
     key: 'emailAmazon',
   },
   {
     title: 'Email (WEBSITE)',
     dataIndex: 'emailWebsite',
     key: 'emailWebsite',
   },
 ];


 return (
   <Card title={`Total Common Entries: ${commonEntriesCount}`}>
     <Search
       placeholder="Search by Primary Contact"
       enterButton="Search"
       allowClear
       onSearch={(value) => setSearchText(value)}
       style={{ marginBottom: 16 }}
     />
     <Table
       columns={columns}
       dataSource={filteredData}
       pagination={{ pageSize: 10 }}
       rowKey="primaryContact"
     />
   </Card>
 );
};


export default AmazonWebsiteTable;



