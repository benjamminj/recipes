/**
 * Creates a controller wrapper for NextJS serverless functions with simple error
 * handling.
 *
 * NextJS sets up its API-route serverless functions via the filesystem, so each
 * file is basically a controller for the given API path.
 */
export function createControllerFunction(cb) {
  return async function controller(req, res) {
    try {
      await cb(req, res)
    } catch (error) {
      console.error(error)
      // If there was a validation error from the model, return the validation error.
      if (error.statusCode) {
        res
          .status(error.statusCode)
          .json({ name: error.name, error: error.data })
      } else {
        // Otherwise internal server error
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}
