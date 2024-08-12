import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Flex, Pagination } from '@mantine/core';
import Cookies from 'js-cookie';
import { NavbarMinimal } from '../components/Navbar/NavbarMinimal';
import { TableSort } from '../components/history/TableSort';
import styles from './history.module.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const authToken = Cookies.get('authToken');
      const response = await axios.get('http://localhost:8081/api/convert/history', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching file history', error);
      alert('Error fetching file history: ' + error.message);
    }
  };

  const fetchOutput = async (id) => {
    try {
      const authToken = Cookies.get('authToken');
      const response = await axios.get(`http://localhost:8081/api/convert/output/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setOutput(response.data);
    } catch (error) {
      console.error('Error fetching file output', error);
      alert('Error fetching file output: ' + error.message);
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const paginatedData = history.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Flex className={styles.page}>
      <NavbarMinimal style={{ width: '250px', flexShrink: 0 }} /> {/* Navbar added */}
      <Container className={styles.container}>
        <Paper className={styles.card} padding="lg" shadow="md" withBorder>
          <TableSort data={paginatedData} onShowOutput={fetchOutput} />
          <Pagination
            total={Math.ceil(history.length / itemsPerPage)}
            page={activePage}
            onChange={handlePageChange}
            color="#ed5f49"
            radius="md"
            withEdges
            mt="lg"
          />
        </Paper>
      </Container>
    </Flex>
  );
};

export default HistoryPage;
