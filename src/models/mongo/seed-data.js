export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret",
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret",
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret",
      }
    },

    categories: {
      _model: "Category",
      excellent: {
        waterQuality: "Excellent"
      }
    },

    beaches: {
      _model : "Beach",
      Silverstrand: {
      name: "Silverstrand",
      waterQuality: "Good",
      beachLength: 5,
      description: "Beach located in Galway",
      longitude: -0.9,
      latitude: 2
    }
  }
  };