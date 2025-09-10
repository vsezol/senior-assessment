const API_BASE_URL = "http://localhost:4001/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};

export const fetchItems = async ({ pageParam = 1, queryKey }) => {
  const [, searchQuery] = queryKey;

  const params = new URLSearchParams({
    page: pageParam.toString(),
    pageSize: "20",
  });

  if (searchQuery) {
    params.append("q", searchQuery);
  }

  const response = await fetch(`${API_BASE_URL}/items?${params}`);
  const data = await handleResponse(response);

  return {
    data: data.data || [],
    pagination: data.pagination,
    nextPage: data.pagination?.hasNextPage ? pageParam + 1 : undefined,
  };
};

export const fetchStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return handleResponse(response);
};

export const fetchItemById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);
  return handleResponse(response);
};
