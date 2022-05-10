import { createHmac } from 'node:crypto';

function hmac(payload) {
  return createHmac('sha256', process.env.DISCOURSE_CONNECT_SECRET).update(payload).digest('hex');
}

export function encode(params) {
  const payload = new Buffer.from(new URLSearchParams(params).toString()).toString('base64');

  const data = {
    sso: payload,
    sig: hmac(payload),
  };
  return { data, query: new URLSearchParams(data).toString() };
}

export function decode({ sso, sig }) {
  const payload = new Buffer.from(sso, 'base64').toString('ascii');
  const data = [...new URLSearchParams(payload).entries()].reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  return {
    data,
    isValid: hmac(payload) === sig,
  };
}
