export default {
  data: {
    username: "admin",
    password: "admin",
    role: "admin",
    token: Math.random(),
    expiredAt: new Date(new Date().getTime() + 30 * 60 * 1000),
  },
};
