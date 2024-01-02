import ApiService from "./ApiService";
const PRIFIX = "auth";

export async function createSubscription(data) {
  return ApiService.fetchData({
    url: `${PRIFIX}/create-subcription`,
    method: "post",
    data,
  });
}

export async function updateSubscriptionStatus(data) {
  return ApiService.fetchData({
    url: `${PRIFIX}/update-subscription-status`,
    method: "post",
    data,
  });
}
