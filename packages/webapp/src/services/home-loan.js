import ApiService from "./ApiService";
const PRIFIX = "home-loan";

export async function getHomeLoans(options = {}) {
  const params = new URLSearchParams(options);
  return ApiService.fetchData({
    url: `${PRIFIX}/get-all?${params}`,
    method: "get",
  });
}

export async function saveHomeLoan(data) {
  return ApiService.fetchData({
    url: `${PRIFIX}/save`,
    method: "post",
    data,
  });
}

export async function deleteHomeLoan(id) {
  return ApiService.fetchData({
    url: `${PRIFIX}/delete/${id}`,
    method: "delete",
  });
}
