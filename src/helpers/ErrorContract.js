class ErrorContract {
  NO_API_FOLDER = "No API folder directory found. Please provide an API folder under the src/ directory containing your Application's Exposed API endpoints.";

  NO_API_FILES = 'No API files found under the API folder directory. Start by creating a folder for your endpoint inside the API folder.';

  INVALID_BEARER_TOKEN = 'Please provide a valid bearer token to access this resource';
}

module.exports = new ErrorContract();
