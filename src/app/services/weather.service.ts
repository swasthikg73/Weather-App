import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { CurrentTempData } from '../Models/CurrentTemparatureData';
import { TodayData } from '../Models/TodayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs';
import { EnviromentVariables } from '../Environment/EnvironmentVariables';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //Variables which will be filled by API end points
  locationDetails?: LocationDetails;
  weathearDetails?: WeatherDetails;

  // Varaiables that have the extracted data from the API Endpoint variables
  TemparatureData?: CurrentTempData = new CurrentTempData();

  todayData?: TodayData[] = []; //Right containerData
  weekData?: WeekData[] = []; //Right containerData
  todayHighlight?: TodaysHighlight = new TodaysHighlight(); //Right containerData


  //Varables used for Api Calls
  cityName: string = 'Mangaluru';
  language: string = 'en-Us';
  date: string = '20250526';
  units: string = 'm';

  //Varaiable holding current time
  cutrrentTime: Date;

  //variables to control metric value
  celsius: boolean = true;
  fahrenhiet: boolean = false;

  constructor(private http: HttpClient) {
    this.getData();
  }


  getSummaryImage(summary: string): string {
    //base folder Address containing the images
    var baseAddress = "/Images/";

    //respective Image names
    var cloudySunny = 'cloudy Sunny.png';
    var rainSunny = 'rain and-sun.png'
    var windy = 'windy.png';
    var sunny = 'sun.png';
    var rainy = 'heavy-rain.png';

    if (String(summary).includes("Partly Cloudy") || String(summary).includes("P Cloudy")) return baseAddress + cloudySunny;
    else if (String(summary).includes("Partly Rainy") || String(summary).includes("P Rainy")) return baseAddress + rainSunny;
    else if (String(summary).includes("wind")) return baseAddress + windy;
    else if (String(summary).includes("rain")) return baseAddress + rainy;
    else if (String(summary).includes("Sun")) return baseAddress + sunny;
    return baseAddress + cloudySunny;
  }

  //Method to create a chunk for left container using model CurrentTemparatureData
  fillTemparatureModel() {
    //Setting left Container Data Model Properties
    this.cutrrentTime = new Date();
    this.TemparatureData.day = this.weathearDetails['v3-wx-observations-current'].dayOfWeek;
    this.TemparatureData.time = `${String(this.cutrrentTime.getHours()).padStart(2, '0')}:${String(this.cutrrentTime.getMinutes()).padStart(2, '0')}`;
    this.TemparatureData.temparature = this.weathearDetails['v3-wx-observations-current'].temperature;
    this.TemparatureData.location = `${this.locationDetails.location.city[0]},${this.locationDetails.location.country[0]}`
    this.TemparatureData.rainPercent = this.weathearDetails['v3-wx-observations-current'].precip24Hour;
    this.TemparatureData.summaryPhrase = this.weathearDetails['v3-wx-observations-current'].wxPhraseShort;
    this.TemparatureData.summaryImage = this.getSummaryImage(this.TemparatureData.summaryPhrase);
  }


  //Method to create a chunk for Right container using model Week Data
  fillWeekData() {
    var weekCount = 0;
    while (weekCount < 7) {
      this.weekData.push(new WeekData());
      this.weekData[weekCount].day = this.weathearDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0, 3);
      this.weekData[weekCount].tempMax = this.weathearDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount];
      this.weekData[weekCount].tempMin = this.weathearDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount];
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weathearDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
      weekCount++;
    }
  }


  //Method to create a chunk for Right container using model Today Data
  fillTodayData() {
    var todayCount = 0;
    while (todayCount < 7) {
      this.todayData.push(new TodayData());
      this.todayData[todayCount].time = this.weathearDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount].slice(11, 16);
      this.todayData[todayCount].temprautre = this.weathearDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weathearDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount]);
      todayCount++;
    }

  }

  getTimeFromString(localTime: string) {
    return localTime.slice(12, 17);
  }



  //Method to get today's highlight from the base Varaiable
  fillTodayHighlight() {
    this.todayHighlight.airQuality = this.weathearDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todayHighlight.humidity = this.weathearDetails['v3-wx-observations-current'].precip24Hour;
    this.todayHighlight.sunrise = this.getTimeFromString(this.weathearDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todayHighlight.sunset = this.getTimeFromString(this.weathearDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todayHighlight.uiIndex = this.weathearDetails['v3-wx-observations-current'].uvIndex;
    this.todayHighlight.humidity = this.weathearDetails['v3-wx-observations-current'].precip24Hour;
    this.todayHighlight.visibility = this.weathearDetails['v3-wx-observations-current'].visibility;
    this.todayHighlight.windStatus = this.weathearDetails['v3-wx-observations-current'].windSpeed;
  }

  celsiusTofahrenheit(cel: number): number {
    return +((cel * 1.8) + 32).toFixed(2);
  }

  fahrenheitToCelsius(fah: number): number {
    return +((fah - 32) * 0.555).toFixed(2);
  }

  //Method to ceeate useful chunks for UI using the data recieved from the API's
  prepareData(): void {
    this.fillTemparatureModel();
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodayHighlight();
    //console.log(this.weathearDetails);
    // console.log(this.weekData);
    //console.log("Todays data :", this.todayData);

  }

  //Method to get location detsils from the API
  getLocationDetails(cityName: string, language: string): Observable<LocationDetails> {
    return this.http.get<LocationDetails>(EnviromentVariables.WeatherApiLocationBaseUrl, {
      headers: new HttpHeaders()
        .set(EnviromentVariables.xRapidApiKeyName, EnviromentVariables.xRapidApiKeyValue)
        .set(EnviromentVariables.xRapidApiHostName, EnviromentVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('query', cityName)
        .set('language', language)
    })
  }

  getWeatherReport(date: string, latitude: number, longitude: number, language: string, units: string): Observable<WeatherDetails> {
    return this.http.get<WeatherDetails>(EnviromentVariables.WeatherApiForcastUrl, {
      headers: new HttpHeaders()
        .set(EnviromentVariables.xRapidApiKeyName, EnviromentVariables.xRapidApiKeyValue)
        .set(EnviromentVariables.xRapidApiHostName, EnviromentVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('date', date)
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('language', language)
        .set('units', units)
    })
  }

  getData() {
    var latitude = 0;
    var longitude = 0;

    this.todayData = [];
    this.weekData = [];
    this.TemparatureData = new CurrentTempData();
    this.todayHighlight = new TodaysHighlight();

    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;
        latitude = this.locationDetails?.location.latitude[0];
        longitude = this.locationDetails?.location.longitude[0];
        // console.log("Locatin Details: ", this.locationDetails);
        // console.log("Latitiude", this.locationDetails?.location.latitude[0]);
        // console.log("longitude", this.locationDetails?.location.longitude[0]);

        //once we get the values for lat and long we can call for the getWeatherReport method
        this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
          next: (res) => {
            this.weathearDetails = res;
            //console.log("Weather Details :", res);
            this.prepareData()
          },
          error: (error: HttpErrorResponse) => { console.log(error.message); }
        })
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });
  }

}
