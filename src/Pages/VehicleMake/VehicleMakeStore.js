import { computed, action, makeObservable, observable, runInAction } from "mobx";
import VehicleMakeService from '../../Common/VehicleMakeService';
import routing from "../../Stores/Routing";

class VehicleMakeStore {
  isLoading = true;
  vehicleMakeData = [];
  status = "initial";
  urlParams = "";
  filter = "";
  selected = "";
  selectMakeData = [];
  formMessage = "";
  formVisible = false;
  formIsValid = false;
  inputName = "";
  inputAbrv = "";

  constructor() {
    this.vehicleMakeService = new VehicleMakeService();
    runInAction(async () => await this.getVehicleBrands());
    makeObservable(this, {
      isLoading: observable,
      status: observable,
      vehicleMakeData: observable,
      filter: observable,
      filteredVehicleMake: computed,
      urlParams: observable,
      selected: observable,
      filterHandler: action,
      selectHandler: action,
      newFormHandler: action,
      formMessage: observable,
      formVisible: observable,
      formIsValid: observable,
      inputName: observable,
      inputAbrv: observable
    })
  }

  getVehicleBrands = async () => {
    try {
      this.isLoading = true;
      const urlParams = '';
      const data = await this.vehicleMakeService.get(urlParams);
      runInAction(() => {
        this.vehicleMakeData = data;
        this.selectMakeData = data;
        // console.log(data);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      })
    }
  }

  filterHandler(event) {
    this.filter = event.target.value;
  }

  get filteredVehicleMake() {
    var matchesFilter = new RegExp(this.filter, "i");
    return this.vehicleMakeData.filter(make => {
      return matchesFilter.test(make.abrv) || matchesFilter.test(make.name)
    });
  }

  getFilteredList = async (selected) => {
    this.isLoading = true;
    let params = "";
    if (selected) {
      params = "?id=" + selected;
    }
    const data = await this.vehicleMakeService.get(params);
    runInAction(() => {
      this.vehicleMakeData = data;
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

  changeNameHandler(event) {
    this.inputName = event.target.value;
  }

  changeAbrvHandler(event) {
    this.inputAbrv = event.target.value;
  }

  addNewMake = async (event) => {
    event.preventDefault();
    let make = {
      abrv: this.inputAbrv,
      name: this.inputName
    };
    if ((make.abrv && make.name) !== '') {
      await this.vehicleMakeService.post(make);
      runInAction(() => {
        this.formIsValid = true;
        this.formMessage = "Make is successfuly added to list. ";
        this.getFilteredList(this.selected);
      });
    } else {
      this.formIsValid = false;
      this.formMessage = "All fields must be valid!";
    }
  }

  editMake(id) {
    routing.push("/make/" + id);
  }

}

export default VehicleMakeStore;