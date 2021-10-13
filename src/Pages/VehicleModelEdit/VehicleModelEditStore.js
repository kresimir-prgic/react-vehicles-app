import { action, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";
import VehicleMakeService from "../../Common/VehicleMakeService";
import routing from "../../Stores/Routing";

class VehicleModelEditStore {

  isLoading = true;
  urlParams = "";
  modelData = [];
  selected = "";
  makeData = [];
  name = "";
  abrv = "";
  isValid = true;

  constructor() {
    this.vehicleModelService = new VehicleModelService();
    this.vehicleMakeService = new VehicleMakeService();
    runInAction(async () => await this.getVehicleBrands());
    this.selected = 1;
    makeObservable(this, {
      isLoading: observable,
      modelData: observable,
      deleteModel: action,
      selectHandler: action,
      changeNameHandler: action,
      selected: observable,
      makeData: observable,
      updateModel: action,
      name: observable,
      abrv: observable,
      isValid: observable,
    });
  };

  getModelData = async (id) => {
    this.isLoading = true;
    const data = await this.vehicleModelService.get('/' + id);
    runInAction(() => {
      this.vehicleModelData = data.data;
      console.log(data);
      this.isLoading = false;
      this.selected = parseInt(data.data.makeId);
      this.name = data.data.name;
      this.abrv = data.data.abrv;
    });
  }

  getVehicleBrands = async () => {
    const urlParams = '';
    this.isLoading = true;
    const data = await this.vehicleMakeService.get(urlParams);
    runInAction(() => {
      this.makeData = data;
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

  selectHandler = async (event) => {
    this.selected = event.target.value;
    if (this.selected) {
      const data = await this.vehicleMakeService.get("/" + this.selected);
      runInAction(() => {
        this.abrv = data.abrv;
      });
    }
  }

  changeNameHandler(event) {
    this.name = event.target.value;
  }

  updateModel = async (id) => {
    let data = {
      id: id,
      abrv: this.abrv,
      name: this.name,
      makeId: this.selected
    }
    console.log(data);
    if (this.name !== '') {
      await this.vehicleModelService.put(data);
      runInAction(() => {
        this.isValid = true;
        routing.push("/");
      });
    } else {
        this.isValid = false;
    }
  }

}

export default VehicleModelEditStore;