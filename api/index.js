const { startVercel } =  require('../src');

export default async function handle(req, res) {
  try {
    await startVercel(req, res);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
    console.error(e.message);
  }
}