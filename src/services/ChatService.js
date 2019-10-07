import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:3cc9105b-d271-42a0-b988-183d695f9861';
const CHATKIT_TOKEN_PROVIDER =
  'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3cc9105b-d271-42a0-b988-183d695f9861/token';

export let currentUser;

const getPusherManager = async userId => {
  const data = await new ChatManager({
    instanceLocator: CHATKIT_INSTANCE_LOCATOR,
    userId,
    tokenProvider: new TokenProvider({ url: CHATKIT_TOKEN_PROVIDER })
  }).connect();
  currentUser = data;
  return { ok: true, data };
};

export default {
  getPusherManager
};
