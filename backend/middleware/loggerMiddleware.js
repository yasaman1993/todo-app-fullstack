export function logger(req, res, next) {
  console.log(`Method: ${req.method}, Path: ${req.path}`);
  next();
}
