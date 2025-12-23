(async () => {
  try {
    const res = await fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Al', phoneNumber: '12', contactType: 'friend' })
    });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
  } catch (err) {
    console.error('ERROR', err.message);
    process.exit(1);
  }
})();
