import React from 'react'
import Allocation from "views/Dashboard/views/Allocation/Allocation";
import { useRouter } from 'next/router';
import Sidebar from 'components/Sidebar';
import MyProject from 'views/MyProject';
import tabsConfig from 'views/Dashboard/tabsConfig';

const AssetRef = () => {

  return (
    <Sidebar menuItems={tabsConfig}>
        <MyProject />
    </Sidebar>
  )
}

export default AssetRef