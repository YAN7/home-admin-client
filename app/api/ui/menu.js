module.exports = [
  {
    key: 'pages',
    name: 'Pages',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'blog',
        name: 'Blog',
        title: true,
      },
      {
        key: 'blog_list',
        name: 'Blog Home',
        link: '/blog',
        icon: 'ios-home-outline'
      },
      {
        key: 'blog_detail',
        name: 'Article',
        link: '/blog/article',
        icon: 'ios-list-box-outline'
      },
    ]
  },
];
