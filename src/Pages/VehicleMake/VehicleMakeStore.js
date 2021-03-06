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
  totalPages = 0;
  perPage = 4;
  currentPage = 1;

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
      inputAbrv: observable,
      totalPages: observable,
      perPage: observable,
      currentPage: observable,
      pageChangeHandler: action
    })
  }

  getVehicleBrands = async () => {
    try {
      this.isLoading = true;
      this.urlParams = '?_page=' + this.currentPage + '&_limit=' + this.perPage;
      if (this.selected) {
        this.urlParams = '?id=' + this.selected + '&_page=' + this.currentPage + '&_limit=' + this.perPage;
      }
      const data = await this.vehicleMakeService.get(this.urlParams);
      const allData = await this.vehicleMakeService.get('');
      runInAction(() => {
        this.totalPages = Math.ceil(data.totalCount/this.perPage);
        this.vehicleMakeData = data.data;
        this.selectMakeData = allData.data;
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
    this.getVehicleBrands();
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

  selectHandler = async (event) => {
    this.selected = event.target.value;
    this.isLoading = true;
    this.currentPage = 1;
    this.getVehicleBrands();
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
        this.getVehicleBrands();
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