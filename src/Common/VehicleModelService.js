const apiUrl = "https://retoolapi.dev/SaKAaw/vehicles";

class VehicleModelService {
  get = async (urlParams) => {
    const options = {
      method: "GET"
    }
    const request = new Request(apiUrl + urlParams, options);
    const response = await fetch(request);
    const res = {
      data: await response.json(),
      totalCount: Number(response.headers.get('X-Total-Count'))
    }
    return res;
  }

  post = async (model) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    var options = {
      method: "POST",
      headers,
      body: JSON.stringify(model)
    }
    const request = new Request(apiUrl, options);
    const response = await fetch(request);
    return response;
  }

  put = async (model) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json");
    var options = {
        method: "PUT",
        headers,
        body: JSON.stringify(model)
    }
    const request = new Request(apiUrl + "/" + model.id, options);
    const response = await fetch(request);
    return response;
  }

  delete = async (id) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers
    }
    const request = new Request(apiUrl + "/" + id, options);
    const response = await fetch(request);
    return response;
  }

}

export default VehicleModelService;