import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class LOcalStrategy extends PassportStrategy(Strategy) {}