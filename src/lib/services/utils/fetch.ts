export async function fetchWithRetry(
  url: string, 
  options: RequestInit = {}, 
  retries = 3,
  delay = 1000
): Promise<Response> {
  let lastError: Error;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        }
      });

      // Check for specific error cases
      if (response.status === 403) {
        throw new Error('Access denied. Please check API key and permissions.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (i === retries - 1) {
        throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }

  throw lastError!;
}