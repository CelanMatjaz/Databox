import * as express from 'express';
import * as path from 'path';

const app = express.default();

const PORT = process.env.PORT || 2000;

app.use(express.static(path.resolve('build/client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build/client/index.html'));
});

app.listen(PORT, () => console.log('Server started on port', PORT));
