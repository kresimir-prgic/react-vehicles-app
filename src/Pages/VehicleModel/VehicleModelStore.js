import { action, computed, makeObservable, observable, runInAction } from "mobx";
import VehicleModelService from "../../Common/VehicleModelService";
import VehicleMakeService from "../../Common/VehicleMakeService";
import routing from "../../Stores/Routing";

class VehicleModelStore {
  isLoading = true;
  vehicleModelData = [];
  vehicleMakeData = [];
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
    })
  }

  getVehicleModels = async () => {
    try {
      this.isLoading = true;
      // const urlParams = '?_page=1&_limit=' + this.perPage;
      const urlParams = '';
      const data = await this.vehicleModelService.get(urlParams);
      const allData = await this.vehicleModelService.get('');
      runInAction(() => {
        this.totalPages = Math.ceil(allData.length/this.perPage);
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

  fetchCurrentPage = async (currentPage) => {
    try {
      this.isLoading = true;
      const urlParams = '?_page=' + currentPage + '&_limit=' + this.perPage;
      console.log(urlParams);
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

  pageChangeHandler = async (data) => {
    let currentPage = data.selected + 1;
    console.log(currentPage);
    // this.fetchCurrentPage(currentPage);
  }

  getVehicleBrands = async () => {
    const urlParams = '';
    const data = await this.vehicleMakeService.get(urlParams);
    runInAction(() => {
      this.vehicleMakeData = data;
      // console.log(data);
    });
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
    this.isLoading = true;
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
    if ((model.makeId && model.name) !== '') {
      await this.vehicleModelService.post(model);
      runInAction(() => {
        this.formIsValid = true;
        this.formMessage = "Model is successfuly added to list. ";
        this.getFilteredList(this.selected);
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