const path = require('path');
const express = require('express');
const app = express();
const port = 8080;

app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
