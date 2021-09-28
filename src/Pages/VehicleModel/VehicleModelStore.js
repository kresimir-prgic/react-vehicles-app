import { action, computed, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";

class VehicleModelStore {
  isLoading = true;
  vehicleModelData = [];
  status = "initial";
  searchQuery = "";
  filter = "";

  constructor() {
    this.vehicleModelService = new VehicleModelService();
    runInAction(async () => await this.getVehicleModels());
    makeObservable(this, {
      isLoading: observable,
      status: observable,
      searchQuery: observable,
      vehicleModelData: observable,
      filter: observable,
      filteredVehicleModels: computed,
      filterHandler: action,
    })
  }

  getVehicleModels = async () => {
    try {
      this.isLoading = true;
      var params = {
        pageNumber: this.vehicleModelData.pageNumber,
        searchQuery: this.searchQuery
      };
      const urlParams = new URLSearchParams(Object.entries(params));
      const data = await this.vehicleModelService.get(urlParams);
      runInAction(() => {
        this.vehicleModelData = data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      })
    }
  }

  get filteredVehicleModels() {
    var matchesFilter = new RegExp(this.filter, "i");
    return this.vehicleModelData.filter(vehicle => {
      return matchesFilter.test(vehicle.abrv) || matchesFilter.test(vehicle.name)
    });
  }

  filterHandler(event) {
    this.filter = event.target.value;
  }

}

export default VehicleModelStore;