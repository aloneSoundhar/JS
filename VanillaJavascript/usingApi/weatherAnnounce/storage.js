class Store {
    constructor() {
        this.city;
        this.state;
        this.defaultCity = 'Coimbatore';
        this.defaultState = 'TN';
    }

    // Get location data
    getLocationData() {
        if(localStorage.getItem('city') === null) {
            this.city = this.defaultCity;
        } else {
            this.city = localStorage.getItem('city');
        }

        if(localStorage.getItem('state') === null) {
            this.state = this.defaultState;
        } else {
            this.state = localStorage.getItem('state');
        }

        return {
            city: this.city,
            state: this.state
        };
    }

    // Set location data
    setLocationData(city, state) {
        localStorage.setItem('city', city);
        localStorage.setItem('state', state);
    }
}