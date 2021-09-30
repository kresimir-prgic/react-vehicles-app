import { makeObservable, observable, runInAction } from "mobx";
import VehicleMakeService from '../../Common/VehicleMakeService';

class VehicleMakeStore {
  isLoading = true;
  vehicleMakeData = [];
  status = "initial";
  urlParams = "";
  // filter = "";
  // selected = "";

  constructor() {
    this.vehicleMakeService = new VehicleMakeService();
    runInAction(async () => await this.getVehicleBrands());
    makeObservable(this, {
      isLoading: observable,
      status: observable,
      vehicleMakeData: observable,
      // filter: observable,
      // filteredVehicleBrands: computed,
      urlParams: observable,
    })
  }

  getVehicleBrands = async () => {
    try {
      this.isLoading = true;
      const urlParams = '';
      const data = await this.vehicleMakeService.get(urlParams);
      runInAction(() => {
        this.vehicleMakeData = data;
        // console.log(data);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      })
    }
  }

  // get filteredVehicleBrands() {
  //   var matchesFilter = new RegExp(this.filter, "i");
  //   return this.vehicleMakeData.filter(make => {
  //     return matchesFilter.test(make.abrv) || matchesFilter.test(make.name)
  //   });
  // }
}

export default VehicleMakeStore;