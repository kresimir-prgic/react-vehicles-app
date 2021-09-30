import { action, computed, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";

class VehicleModelStore {
  isLoading = true;
  vehicleModelData = [];
  status = "initial";
  searchQuery = "";
  filter = "";
  urlParams = "";
  selected = "";
  formVisible = true;

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
      urlParams: observable,
      selected: observable,
      selectHandler: action
    })
  }

  getVehicleModels = async () => {
    try {
      this.isLoading = true;
      // var params = {
      //   pageNumber: this.vehicleModelData.pageNumber,
      //   searchQuery: this.searchQuery
      // };
      // const urlParams = new URLSearchParams(Object.entries(params));
      const urlParams = '';
      // const urlParams = 'abrv=Ford';
      const data = await this.vehicleModelService.get(urlParams);
      runInAction(() => {
        this.vehicleModelData = data;
        // console.log(data);
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

  selectHandler = async (event) => {
    this.selected = event.target.value;
    this.isLoading = true;
    if (this.selected) {
      const data = await this.vehicleModelService.get("makeId=" + this.selected);
      runInAction(() => {
        this.vehicleModelData = data;
        this.isLoading = false;
      });
    } else {
      const data = await this.vehicleModelService.get();
      runInAction(() => {
        this.vehicleModelData = data;
        this.isLoading = false;
      });
    }
  }

}

export default VehicleModelStore;