import React from 'react';
import Menu from '../components/Menu';
import "../styles/styles.scss"


const Layout = ({children}) => {
  return (
    <>
      <header className="header">
          <div className="logo">Next<span>.js</span></div>
          <Menu />
      </header>
      
      <main className="main">
        {children}
      </main>
      
      {/* <footer className="footer">
        footer
      </footer> */}

    </>
  )
}

export default Layout;