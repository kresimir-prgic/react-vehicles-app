import { action, makeObservable, observable, runInAction } from "mobx";
import VehicleMakeService from "../../Common/VehicleMakeService";
import routing from "../../Stores/Routing";

class VehicleMakeEditStore {

  isLoading = true;
  urlParams = "";
  makeData = [];
  name = "";
  abrv = "";
  isValid = true;

  constructor() {
    this.vehicleMakeService = new VehicleMakeService();
    runInAction(async () => await this.getVehicleBrands());
    this.selected = 1;
    makeObservable(this, {
      isLoading: observable,
      deleteMake: action,
      changeNameHandler: action,
      changeAbrvHandler: action,
      makeData: observable,
      updateMake: action,
      name: observable,
      abrv: observable,
      isValid: observable,
    });
  };

  getModelData = async (id) => {
    this.isLoading = true;
    const data = await this.vehicleMakeService.get('/' + id);
    runInAction(() => {
      this.vehicleMakeData = data;
      // console.log(data);
      this.isLoading = false;
      this.name = data.name;
      this.abrv = data.abrv;
    });
  }

  getVehicleBrands = async () => {
    const urlParams = '';
    this.isLoading = true;
    const data = await this.vehicleMakeService.get(urlParams);
    runInAction(() => {
      this.makeData = data;
      // console.log(data);
      this.isLoading = false;
    });
  }

  deleteMake = async (id) => {
    if (window.confirm("Are you sure you want to delete?") === true) {
			await this.vehicleMakeService.delete(id);
      runInAction(() => {
        routing.push("/make");
      });
		}
  }

  changeNameHandler(event) {
    this.name = event.target.value;
  }

  changeAbrvHandler(event) {
    this.abrv = event.target.value;
  }

  updateMake = async (id) => {
    let data = {
      id: id,
      abrv: this.abrv,
      name: this.name,
    }
    // console.log(data);
    if (this.name !== '') {
      await this.vehicleMakeService.put(data);
      runInAction(() => {
        this.isValid = true;
        routing.push("/make");
      });
    } else {
        this.isValid = false;
    }
  }

}

export default VehicleMakeEditStore;