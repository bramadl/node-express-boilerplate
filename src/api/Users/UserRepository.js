const user = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  role: {
    select: {
      id: true,
      name: true,
    },
  },
};

const filter = (filterValue) => ({
  OR: [
    {
      firstName: {
        contains: filterValue,
      },
    },
    {
      lastName: {
        contains: filterValue,
      },
    },
    {
      email: {
        contains: filterValue,
      },
    },
    {
      phoneNumber: {
        contains: filterValue,
      },
    },
  ],
});

module.exports = {
  user,
  filter,
};
