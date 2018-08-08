export const profileSections = [
  {
    label: 'Account info:',
    type: 'category',
    list: [
      {
        name: 'accountInformation',
        label: 'Profile',
        type: 'route',
      },
      {
        name: 'transactionHistory',
        label: 'Transactions',
        type: 'route',
      },
      {
        name: 'myOrders',
        label: 'Orders',
        type: 'route',
      },
      {
        name: 'notificationHistory',
        label: 'Notifications',
        type: 'route',
      },
      {
        name: 'alertsList',
        label: 'Allerts',
        type: 'route',
      },
    ],
  },
  {
    name: 'verification',
    label: 'Verification',
    type: 'route',
  },
  // {
  //   name: 'verificationAdmin',
  //   label: 'Verification (admin)',
  //   type: 'route',
  // },
  {
    name: 'securitySettings',
    label: 'Security settings',
    type: 'route',
  },
  {
    name: 'securityLog',
    label: 'Security log',
    type: 'route',
  },
  {
    name: 'faq',
    label: 'FAQ',
    type: 'globalLink',
    href: 'https://blog.atlant.io/',
    icon: 'icon-link',
  },
];
