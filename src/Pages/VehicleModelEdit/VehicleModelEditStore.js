import { action, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";
// import VehicleMakeService from "../../Common/VehicleMakeService";
import routing from "../../Stores/Routing";

class VehicleModelEditStore {

  isLoading = true;
  urlParams = "";
  modelData = [];

  constructor() {
    this.vehicleModelService = new VehicleModelService();
    makeObservable(this, {
      modelData: observable,
      deleteModel: action
    });
  };

  getModelData = async (id) => {
    this.isLoading = true;
    const data = await this.vehicleModelService.get('/' + id);
    runInAction(() => {
      this.vehicleModelData = data;
      console.log(data);
      this.isLoading = false;
    });
  }

  deleteModel = async (id) => {
    if (window.confirm("Are you sure you want to delete?") === true) {
			await this.vehicleModelService.delete(id);
      runInAction(() => {
        routing.push("/");
      });
		}
  }

}

export default VehicleModelEditStore;