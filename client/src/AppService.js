const URL = 'http://localhost:3001/'

export const startBulkEmail = (payload) =>{
  return fetch(`${URL}sendEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payload }),
  });
}