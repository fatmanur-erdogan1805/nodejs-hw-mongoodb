(async () => {
  try {
    const res = await fetch('http://localhost:3000/contacts?page=1&perPage=2&sortBy=name&sortOrder=asc&type=friend&isFavourite=true');
    const json = await res.json();
    console.log('STATUS', res.status);
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('ERROR', err.message);
    process.exit(1);
  }
})();
