export const profileSections = [{
    label: 'Account info:',
    type: 'category',
    list: [
      {
        label: 'Profile',
        name: 'accountInformation',
        type: 'route',
      },
      {
        label: 'Transactions',
        name: 'transactionHistory',
        type: 'route',
      },
      {
        label: 'Orders',
        name: 'myOrders',
        type: 'route',
      },
      {
        label: 'Notifications',
        name: 'notificationHistory',
        type: 'route',
      },
      {
        label: 'Allerts',
        name: 'allertList',
        type: 'route',
      },
    ],
  },
  {
    label: 'Verification',
    name: 'verification',
    type: 'route',
  },
  // {
  //   label: 'Verification (admin)',
  //   name: 'verificationAdmin',
  //   category: 'user info',
  // },
  {
    label: 'Security settings',
    name: 'securitySettings',
    type: 'route',
  },
  {
    label: 'Security log',
    name: 'securityLog',
    type: 'route',
  },
  {
    label: 'FAQ',
    type: 'link',
    link: 'https://blog.atlant.io/',
  },
];
