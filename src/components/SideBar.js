import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData.js';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
// import Navbar from './Navbar';
// import PieChart from './PieChart';
// import BarChart from './BarChart';
// import ExpenseChart from './ExpenseChart';
// import  { Report } from './Report';
// import data from './data.json';

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  display: flex;
  justify-content: center;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
`;

const SidebarWrap = styled.div`
  width: 100%;
  height: 100vh;
`;



const Sidebar = () => {
  const [sidebar] = useState(true);
  //const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {/* <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon> */}
            
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
      {/* <div className="content">
        <div>
          
        </div>
        <div className="charts_container">
          <PieChart />
          <BarChart />
          <ExpenseChart />
        </div>
        <Report data={data} />
      </div> */}
    </>
  );
};

export default Sidebar;