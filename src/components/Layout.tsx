import React from 'react';
import styles from './App.module.css';
import logo from './logo.png';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className={styles.container}>
    <header className={styles.center}>
      <a href="https://idmji.org/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="IDMJI logo" style={{ height: '100px' }} />
      </a>
    </header>
    <main className={styles.center}>{children}</main>
    <footer className={styles.center}>
      Aplicación multicanal de interpretaciones
    </footer>
  </div>
);

export default Layout;
