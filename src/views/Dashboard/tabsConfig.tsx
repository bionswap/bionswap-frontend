import AllocationIcon from "assets/icons/AllocationIcon"
import LaunchpadIcon from "assets/icons/LaunchpadIcon"
import OverviewIcon from "assets/icons/OverviewIcon"
import MyProject from "views/MyProject"
import Allocation from "views/Dashboard/views/Allocation/Allocation"
import Overview from "views/Dashboard/views/Overview/Overview"
import MyProjectsIcon from "assets/icons/MyProjectsIcon"

const tabsConfig = [
    {
        label: 'Overview',
        href: '/dashboard/overview',
        icon: OverviewIcon,
        component: <Overview/>
    },
    {
        label: 'Allocation',
        href: '/dashboard/allocation',
        icon: AllocationIcon,
        component: <Allocation/>
    },
    {
        label: 'My Projects',
        href: '/dashboard/my-project',
        icon: MyProjectsIcon,
        component: <MyProject/>
    },
]

export default tabsConfig