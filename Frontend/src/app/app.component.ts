import { Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { BehaviorSubject, Observable, catchError, map, of, startWith, timestamp } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { Status } from './enum/status.enum';
import { NgForm } from '@angular/forms';
import { Server } from './interface/server';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  appState$: Observable<AppState<CustomResponse>>  = of({ dataState: DataState.LOADING_STATE }); // This is going to be the initial state of the app "of" let us create an observable from a value.

  readonly DataState = DataState; // This is to be able to use the enum in the html, we wont use this in this ts file
  readonly Status = Status; // This is to be able to use the enum in the html, we wont use this in this ts file

  private filterSubject = new BehaviorSubject<string>(''); // This is going to be the initial value of the filter
  private dataSubject = new BehaviorSubject<CustomResponse>({ timeStamp: new Date(), statusCode: 0, status: '', reason: '', message: '', developerMessage: '', data: { servers: [] } });
  filterStatus$ = this.filterSubject.asObservable(); // This is going to be the observable that we are going to use in the html

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable(); // This is going to be the observable that we are going to use in the html

  // private readonly notifier = NotifierService;

  constructor(private serverService: ServerService, private notifier: NotificationService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.servers$
      .pipe(
        map(response => {
          this.notifier.onInfo(response.message);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED_STATE, appData: { ...response, data: { servers: response.data.servers?.reverse () } } }
        }),
        startWith({ dataState: DataState.LOADING_STATE }), // This is going to be the initial state of the app
        catchError((error: string) => {
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error: error });
        })
      );
  }

  pingServer(ipAddr: string): void {
    this.filterSubject.next(ipAddr);
    this.appState$ = this.serverService.ping$(ipAddr)
      .pipe(
        map(response => {
          this.notifier.onDefault("Pinging server...");  // TODO: Handle the delay of the pinging server message
          const index = this.dataSubject.value.data.servers!.findIndex(server => server.id === response.data.server!.id);
          this.dataSubject.value.data.servers![index] = response.data.server!;
          if (response.data.server!.status === Status.SERVER_UP) {
            this.notifier.onSuccess(response.message);
          } else {
            this.notifier.onError(response.message);
          }
          this.filterSubject.next(''); // This is to reset the filter
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}), // This is going to be the initial state of the app
        catchError((error: string) => {
          this.filterSubject.next(''); // This is to reset the filter
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error: error });
        })
      );
  }

  saveServer(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.appState$ = this.serverService.save$(<Server>serverForm.value) // <Server> is to cast the value to Server. But bot (serverForm.value) and (serverForm.value as Server) are ok
      .pipe(
        map(response => {
          this.dataSubject.next(
            {...response, data: {servers: [response.data.server!, ...this.dataSubject.value.data.servers!]}} // TODO: Handle the exclamaition marks in a better way
          );
          this.notifier.onSuccess(response.message);
          document.getElementById('closeModal')?.click();
          serverForm.resetForm({status: this.Status.SERVER_DOWN});
          this.isLoading.next(false); // We want to stop the spinner
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }), // This is going to be the initial state of the app
        catchError((error: string) => {
          this.isLoading.next(false); // We want to stop the spinner
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error: error });
        })
      );
  }

  filterServers(status: Status): void {
    this.appState$ = this.serverService.filter$(status, this.dataSubject.value)
      .pipe(
        map(response => {
          this.notifier.onDefault(response.message);
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }), // This is going to be the initial state of the app
        catchError((error: string) => {
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error: error });
        })
      );
  }

  deleteServer(server: Server): void {
    this.appState$ = this.serverService.delete$(server.id)
      .pipe(
        map(response => {
          this.dataSubject.next(
            {...response, data:
              {servers: this.dataSubject.value.data.servers!.filter(s => s.id !== server.id)}} // TODO: Handle the exclamaition marks in a better way
            );
          this.notifier.onSuccess(response.message);
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }), // This is going to be the initial state of the app
        catchError((error: string) => {
          this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error: error });
        })
      );
  }

  printReport(): void {
    this.notifier.onDefault('Printing report...');
    /// for printing ( also works for pdf download, save as pdf option in the print dialog )
    // window.print();

    /// for xls download
    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('servers');
    let tableHTML = tableSelect!.outerHTML.replace(/ /g, '%20'); // Replace all white spaces with %20 // TODO: Handle the exclamaition marks in a better way
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = 'server-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
    this.notifier.onSuccess('Report printed');
  }
}
