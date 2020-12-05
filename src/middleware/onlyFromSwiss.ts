import { IRouterContext } from 'koa-router';
import { getCountryFromIp } from '../services';
import requestIP from 'request-ip';

const allowedCountry = ['CH', 'FR'];
const allowedIpAddresses = ['::1' || '127.0.0.1'];

const onlyFromSwiss =
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async (ctx: IRouterContext, next: () => Promise<unknown>) => {

    const ip = ctx.ip || requestIP.getClientIp(ctx.req);
    // For localhost tests for ipv4 and ipv6
    // TODO: is it secure like this?
    if (!ip) {
      ctx.throw(400)
    }
    if (allowedIpAddresses.includes(ip)) {
      return next();
    }

    const countryCode = await getCountryFromIp(ip);
    if (!countryCode || !allowedCountry.includes(countryCode)) {
      ctx.throw(400)
    }
    await next();
  };

export default onlyFromSwiss