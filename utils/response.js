function response({ res, message = 'successfully operation', body = {}, status = 200 }) {
	return res.status(status).json({ message, body });
}

module.exports = response;
