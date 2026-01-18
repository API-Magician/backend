export const home = (req, res, next) => {
  res.send(`your id is ${req.user.id}`);
  console.log(req.user);
};
