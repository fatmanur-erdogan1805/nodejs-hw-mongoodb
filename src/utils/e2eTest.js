(async () => {
  const base = 'http://localhost:3000';
  const email = `e2e+${Date.now()}@example.com`;
  try {
    console.log('1) Registering user', email);
    let res = await fetch(`${base}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'E2E User', email, password: 'password123' }) });
    console.log('  register', res.status);
    const regJson = await res.json();

    console.log('2) Logging in');
    res = await fetch(`${base}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'password123' }) });
    const loginText = await res.text();
    console.log('  login', res.status, loginText);
    const rawSetCookie = res.headers.get('set-cookie') || '';
    const refreshCookie = rawSetCookie.split(';')[0];
    const loginJson = JSON.parse(loginText);
    const accessToken = loginJson.data?.accessToken;
    if (!accessToken) throw new Error('No access token from login');

    const authHeader = { Authorization: `Bearer ${accessToken}` };

    console.log('3) Create a contact (valid)');
    res = await fetch(`${base}/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader }, body: JSON.stringify({ name: 'Alice', phoneNumber: '123456', contactType: 'friend' }) });
    console.log('  create valid', res.status);
    const created = await res.json();
    const contactId = created.data?._id;

    console.log('4) Create a contact (invalid) expecting 400');
    res = await fetch(`${base}/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader }, body: JSON.stringify({ name: 'Al', phoneNumber: '12', contactType: 'friend' }) });
    console.log('  create invalid', res.status);
    const invalidBody = await res.text();
    console.log('  invalid body:', invalidBody);

    console.log('5) Get contacts with pagination + filter');
    res = await fetch(`${base}/contacts?page=1&perPage=5&sortBy=name&sortOrder=asc&type=friend&isFavourite=false`, { headers: authHeader });
    console.log('  get list', res.status);
    console.log('  body', await res.text());

    if (!contactId) throw new Error('Contact not created');

    console.log('6) Get contact by id');
    res = await fetch(`${base}/contacts/${contactId}`, { headers: authHeader });
    console.log('  get by id', res.status, await res.text());

    console.log('7) Patch contact');
    res = await fetch(`${base}/contacts/${contactId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...authHeader }, body: JSON.stringify({ name: 'Alice Updated' }) });
    console.log('  patch', res.status, await res.text());

    console.log('8) Delete contact');
    res = await fetch(`${base}/contacts/${contactId}`, { method: 'DELETE', headers: authHeader });
    console.log('  delete', res.status);

    console.log('9) Refresh token using cookie');
    res = await fetch(`${base}/auth/refresh`, { method: 'POST', headers: { Cookie: refreshCookie } });
    console.log('  refresh', res.status, await res.text());

    console.log('10) Logout (using cookie)');
    res = await fetch(`${base}/auth/logout`, { method: 'POST', headers: { Cookie: refreshCookie } });
    console.log('  logout', res.status);

    console.log('E2E tests completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('E2E FAILED', err);
    process.exit(2);
  }
})();
