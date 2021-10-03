import { action, computed, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";
import VehicleMakeService from "../../Common/VehicleMakeService";

class VehicleModelStore {
  isLoading = true;
  vehicleModelData = [];
  status = "initial";
  searchQuery = "";
  filter = "";
  urlParams = "";
  selected = "";
  formVisible = false;
  selectedMake = "";
  selectedMakeAbrv = "";
  inputName = "";
  formMessage = "";
  formIsValid = false;

  constructor() {
    this.vehicleModelService = new VehicleModelService();
    this.vehicleMakeService = new VehicleMakeService();
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
      selectHandler: action,
      formVisible: observable,
      newFormHandler: action,
      selectedMake: observable,
      selectedMakeAbrv: observable,
      inputName: observable,
      newFormSelectHandler: action,
      changeNameHandler: action,
      addNewModel: action,
      formMessage: observable,
      formIsValid: observable
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

  getFilteredList = async (selected) => {
    let params = "";
    if (selected) {
      params = "?makeId=" + selected;
    }
    const data = await this.vehicleModelService.get(params);
    runInAction(() => {
      this.vehicleModelData = data;
      this.isLoading = false;
    });
  }

  selectHandler = async (event) => {
    this.selected = event.target.value;
    this.isLoading = true;
    this.getFilteredList(this.selected);
  }

  newFormHandler(event) {
    event.preventDefault();
    this.formVisible = !this.formVisible;
    this.formMessage = "";
  }

  newFormSelectHandler = async (event) => {
    this.selectedMake = event.target.value;
    if (this.selectedMake) {
      const data = await this.vehicleMakeService.get("/" + this.selectedMake);
      runInAction(() => {
        this.selectedMakeAbrv = data.abrv;
      });
    }
  }

  changeNameHandler(event) {
    this.inputName = event.target.value;
  }

  addNewModel = async (event) => {
    event.preventDefault();
    let model = {
      makeId: this.selectedMake,
      abrv: this.selectedMakeAbrv,
      name: this.inputName
    };
    console.log(model);
    if ((model.makeId && model.name) !== '') {
      const data = await this.vehicleModelService.post(model);
      runInAction(() => {
        console.log(data);
        this.formIsValid = true;
        this.formMessage = "Model is successfuly added to list. ";
        this.getFilteredList(this.selected);
      });
    } else {
        this.formIsValid = false;
        this.formMessage = "All fields must be valid!";
    }
  }

}

export default VehicleModelStore;