export function responseFromThrownError(res, err) {
  const error = typeof err === "string" ? JSON.parse(err) : err;

  return res.status(error.code ?? 500).json({
    message: error.message,
    error: [{ type: error.type ?? "server", message: error.message }],
  });
}

