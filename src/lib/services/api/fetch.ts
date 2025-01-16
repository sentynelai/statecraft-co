// Utility for making API requests with retries and error handling
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`Attempt ${i + 1} failed:`, lastError.message);
      
      if (i === retries - 1) {
        throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }

  throw lastError!;
}