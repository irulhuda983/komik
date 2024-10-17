import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'Unauthorized');
  }
}

export default WrongAuthenticationTokenException;