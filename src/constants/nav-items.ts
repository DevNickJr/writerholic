import { RxDashboard } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineArticle, MdOutlineComment, MdOutlineCategory, MdOutlinePersonPin } from 'react-icons/md';
import { CgTrack } from 'react-icons/cg';

const navItems = [
  {
    id: 1,
    title: "",
    navItems: [
      {
        id: 1,
        title: "Dashboard",
        link: "/dashboard",
        Icon: RxDashboard,
      },
      {
        id: 2,
        title: "Posts",
        link: "/dashboard/posts",
        Icon: MdOutlineArticle,
      },
      {
        id: 3,
        title: "Categories",
        link: "/dashboard/categories",
        Icon: MdOutlineCategory,
      },
      {
        id: 4,
        title: "Tags",
        link: "/dashboard/tags",
        Icon: MdOutlineCategory,
      },
    ],
  },
  {
    id: 2,
    title: "User Management",
    navItems: [
      {
        id: 1,
        title: "Admins",
        link: "/dashboard/admins",
        Icon: MdOutlinePersonPin,
      },
      {
        id: 2,
        title: "Users",
        link: "/dashboard/users",
        Icon: MdOutlinePersonPin,
      },
      {
        id: 3,
        title: "Comments",
        link: "/dashboard/comments",
        Icon: MdOutlineComment,
      },
    ],
  },
  {
    id: 3,
    title: "Analytics",
    navItems: [
      {
        id: 1,
        title: "Post Statistics",
        link: "/dashboard/post-stats",
        Icon: CgTrack,
      },
      {
        id: 2,
        title: "User Activity",
        link: "/dashboard/user-activity",
        Icon: CgTrack,
      },
    ],
  },
  {
    id: 4,
    title: "",
    navItems: [
      {
        id: 3,
        title: "Settings",
        link: "/dashboard/settings",
        Icon: FiSettings,
      },
    ],
  },
];

export {
  navItems
};
