import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Radio, Space } from 'antd';
import 'chart.js/auto';

const PieChartComponent = ({ data }) => {
  const [chartType, setChartType] = useState('services');

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const getChartData = () => {
    if (chartType === 'services') {
      const serviceCounts = data.reduce((acc, enrollment) => {
        acc[enrollment.service] = (acc[enrollment.service] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(serviceCounts),
        datasets: [
          {
            data: Object.values(serviceCounts),
            backgroundColor: [
              '#FF6384', // Amazon
              '#36A2EB', // Meesho
              '#FFCE56', // Flipkart
              '#4BC0C0', // eBay
              '#9966FF', // Website
              '#FF9F40', // Franchise
            ],
          },
        ],
      };
    } else if (chartType === 'contacts') {
      const primaryContacts = data.reduce((acc, enrollment) => {
        if (!acc[enrollment.primaryContact]) {
          acc[enrollment.primaryContact] = new Set();
        }
        acc[enrollment.primaryContact].add(enrollment.service);
        return acc;
      }, {});

      const contactCounts = Object.keys(primaryContacts).reduce((acc, contact) => {
        const serviceCount = primaryContacts[contact].size;
        acc[serviceCount] = (acc[serviceCount] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(contactCounts).map(count => `${count} services`),
        datasets: [
          {
            data: Object.values(contactCounts),
            backgroundColor: [
              '#FF6384', 
              '#36A2EB', 
              '#FFCE56', 
              '#4BC0C0', 
              '#9966FF', 
              '#FF9F40',
            ],
          },
        ],
      };
    }
  };

  return (
    <div style={{ width: '40%', margin: 'auto' }}>
      {/* <h2>Enrollment Distribution</h2> */}
      <Radio.Group onChange={handleChartTypeChange} value={chartType}>
        <Space direction="horizontal">
          {/* <Radio.Button value="services">Services</Radio.Button> */}
          {/* <Radio.Button value="contacts">Common Primary Contacts</Radio.Button> */}
        </Space>
      </Radio.Group>
      <Pie data={getChartData()} />
    </div>
  );
};

export default PieChartComponent;
