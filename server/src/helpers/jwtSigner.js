import jwt from 'jsonwebtoken';

const jwtSigner = ({ id }) => jwt.sign({ id }, process.env.SECRET);

export default jwtSigner;
