import ApiService from "./ApiService";
const PRIFIX = 'home-loan'

export async function deleteHomeLoan(id) {
  return ApiService.fetchData({
    url: `${PRIFIX}/delete/${id}`,
    method: "delete",
  });
}
