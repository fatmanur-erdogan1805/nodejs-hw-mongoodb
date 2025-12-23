(async () => {
  try {
    const res = await fetch('http://localhost:3000/');
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
  } catch (err) {
    console.error('ERROR', err.message);
    process.exit(1);
  }
})();
