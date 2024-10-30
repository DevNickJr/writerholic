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
        link: "/admin",
        Icon: RxDashboard,
      },
      {
        id: 3,
        title: "Topics",
        link: "/admin/topics",
        Icon: MdOutlineCategory,
      },
      {
        id: 2,
        title: "Blogs",
        link: "/admin/blogs",
        Icon: MdOutlineArticle,
      },
      {
        id: 4,
        title: "Tags",
        link: "/admin/tags",
        Icon: MdOutlineCategory,
      },
      {
        id: 5,
        title: "Comments",
        link: "/admin/comments",
        Icon: MdOutlineComment,
      }
    ],
  },
  // {
  //   id: 2,
  //   title: "User Management",
  //   navItems: [
  //     {
  //       id: 1,
  //       title: "Admins",
  //       link: "/admin/admins",
  //       Icon: MdOutlinePersonPin,
  //     },
  //     {
  //       id: 2,
  //       title: "Users",
  //       link: "/admin/users",
  //       Icon: MdOutlinePersonPin,
  //     },
  //     {
  //       id: 3,
  //       title: "Comments",
  //       link: "/admin/comments",
  //       Icon: MdOutlineComment,
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "Analytics",
  //   navItems: [
  //     {
  //       id: 1,
  //       title: "Post Statistics",
  //       link: "/admin/post-stats",
  //       Icon: CgTrack,
  //     },
  //     {
  //       id: 2,
  //       title: "User Activity",
  //       link: "/admin/user-activity",
  //       Icon: CgTrack,
  //     },
  //   ],
  // },
  {
    id: 4,
    title: "",
    navItems: [
      {
        id: 3,
        title: "Settings",
        link: "/admin/settings",
        Icon: FiSettings,
      },
    ],
  },
];

export {
  navItems
};
