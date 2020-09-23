export default {
  // prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Groceries: {
            screens: {
              GroceriesScreen: 'one',
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: 'two',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'three',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
