import { action, computed, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";
import VehicleMakeService from "../../Common/VehicleMakeService";
import routing from "../../Stores/Routing";

class VehicleModelStore {
  isLoading = true;
  vehicleModelData = [];
  vehicleMakeData = [];
  urlParams = "";
  status = "initial";
  searchQuery = "";
  filter = "";
  selected = "";
  formVisible = false;
  selectedMake = "";
  selectedMakeAbrv = "";
  inputName = "";
  formMessage = "";
  formIsValid = false;
  totalPages = 0;
  perPage = 8;
  currentPage = 1;

  constructor() {
    this.vehicleModelService = new VehicleModelService();
    this.vehicleMakeService = new VehicleMakeService();
    runInAction(async () => await this.getVehicleModels());
    runInAction(async () => await this.getVehicleBrands());
    makeObservable(this, {
      isLoading: observable,
      status: observable,
      searchQuery: observable,
      vehicleModelData: observable,
      vehicleMakeData: observable,
      urlParams: observable,
      filter: observable,
      filteredVehicleModels: computed,
      filterHandler: action,
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
      formIsValid: observable,
      editModel: action,
      totalPages: observable,
      perPage: observable,
      fetchCurrentPage: action,
      currentPage: observable,
      pageChangeHandler: action
    })
  }

  getVehicleModels = async () => {
    try {
      this.isLoading = true;
      const urlParams = '?_page=1&_limit=' + this.perPage;
      const data = await this.vehicleModelService.get(urlParams);
      runInAction(() => {
        this.totalPages = Math.ceil(data.totalCount/this.perPage);
        this.vehicleModelData = data.data;
        console.log(data);
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

  fetchCurrentPage = async (currentPage) => {
    try {
      this.isLoading = true;
      this.urlParams = '?_page=' + currentPage + '&_limit=' + this.perPage;
      if (this.selected) {
        this.urlParams = '?makeId=' + this.selected + '&_page=' + currentPage + '&_limit=' + this.perPage;
      }
      const data = await this.vehicleModelService.get(this.urlParams);
      runInAction(() => {
        this.vehicleModelData = data.data;
        this.totalPages = Math.ceil(data.totalCount/this.perPage);
        // console.log(data);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      })
    }
  }

  pageChangeHandler = async (data) => {
    this.currentPage = data.selected + 1;
    // console.log(this.currentPage);
    this.fetchCurrentPage(this.currentPage);
  }

  getVehicleBrands = async () => {
    const urlParams = '';
    const data = await this.vehicleMakeService.get(urlParams);
    runInAction(() => {
      this.vehicleMakeData = data;
      // console.log(data);
    });
  }

  filterHandler(event) {
    this.filter = event.target.value;
  }

  selectHandler = async (event) => {
    this.selected = event.target.value;
    this.isLoading = true;
    this.currentPage = 1;
    this.fetchCurrentPage(this.currentPage);
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
    if ((model.makeId && model.name) !== '') {
      await this.vehicleModelService.post(model);
      runInAction(() => {
        this.formIsValid = true;
        this.formMessage = "Model is successfuly added to list. ";
        this.fetchCurrentPage(this.currentPage);
      });
    } else {
      this.formIsValid = false;
      this.formMessage = "All fields must be valid!";
    }
  }

  editModel(modelId) {
    routing.push("/model/" + modelId);
  }

}

export default VehicleModelStore;