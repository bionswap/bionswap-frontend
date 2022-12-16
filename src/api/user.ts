import { authRequest, request } from 'api';

export async function updateAvatar(avatarId: string) {
  const result = await authRequest.post<{ data: { url: string } }>('/user/update-avatar', {
    avatarId: avatarId,
  });

  return result.data.data;
}

export async function getUserInfo() {
  const result = await authRequest.get('/user/me');

  return result.data.data;
}

export async function addReferrer(referrer: string) {
  const result = await authRequest.post('/user/add-referrer', {
    referrer: referrer,
  });

  return result.data.data;
}
