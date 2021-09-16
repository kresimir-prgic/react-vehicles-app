const apiUrl = "https://retoolapi.dev/SaKAaw/vehicles";

class VehicleModelService {
  get = async (urlParams) => {
    const options = {
      method: "GET",
    }
    const request = new Request(apiUrl + "?" + urlParams, options);
    const response = await fetch(request);
    return response.json();
  }
}

export default VehicleModelService;