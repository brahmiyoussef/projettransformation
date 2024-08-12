import React from 'react';
import { NavbarMinimal } from '../components/Navbar/NavbarMinimal';
import Image from 'next/image';
import logo from '../footer.png';
import styles from './home.module.css'; 

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <NavbarMinimal className={styles.navbar} />
      <div className={styles.container}>
        <div className={styles.centeredCard}>
          <h1 className={styles.title}>Welcome to AttijariWafa Bank!</h1>
          <Image src={logo.src} alt="Logo" width={600} height={200} />
        </div>
      </div>
      <div className={styles.movingCircle}></div> {/* Cercle animé */}
    </div>
  );
};

export default Dashboard;
