import VehicleModelService from "../Common/VehicleModelService";
import VehicleMakeService from "../Common/VehicleMakeService";
import { makeObservable, observable } from "mobx";

class ItemListStore {

  isLoading = true;
  urlParams = "";
  status = "";
  currentPage = 1;
  totalPages = 1;
  perPage = 8;

  constructor() {
    this.vehicleModelService = new VehicleModelService();
    this.vehicleMakeService = new VehicleMakeService();
    makeObservable(this, {
      isLoading: observable,
      urlParams: observable,
      status: observable,
      currentPage: observable,  
      totalPages: observable,
    });
  }

  pageChangeHandler = async (data) => {
    this.currentPage = data.selected + 1;
    // console.log(this.currentPage);
  }

}

export default ItemListStore;