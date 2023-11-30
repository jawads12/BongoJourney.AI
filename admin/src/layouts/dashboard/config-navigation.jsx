import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Tourists',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Places',
    path: '/a', 
    icon: icon('ic_cart'),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
   {
    title: 'Announcements',
    path: '/a',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/a',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
