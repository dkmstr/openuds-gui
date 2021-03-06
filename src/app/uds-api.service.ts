import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UDSConfig, Downloadable, Info } from './types/config';
import { Observable } from 'rxjs';
import {
  JSONServicesInformation,
  JSONEnabledService,
  JSONStatusService,
  JSONService,
  JSONTransportURLService,
} from './types/services';
import { UDSGuiService } from './gui/uds-gui.service';
import { Plugin } from './helpers/plugin';

import { UDSApiServiceType } from './uds-api.service-type';

import { environment } from '../environments/environment';

declare const udsData: any;

@Injectable()
export class UDSApiService implements UDSApiServiceType {
  readonly user: User;
  transportsWindow: Window;
  plugin: Plugin;

  constructor(
    private http: HttpClient,
    public gui: UDSGuiService,
    public router: Router
  ) {
    this.user = new User(udsData.profile);
    this.transportsWindow = null;
    this.plugin = new Plugin(this);
  }
  /**
   * Gets configuration data from uds.js file
   */
  get config(): UDSConfig {
    return udsData.config;
  }

  /**
   * Gets staff information
   */
  get staffInfo(): Info | undefined {
    return udsData.info;
  }

  /**
   * Gets plugins list
   */
  get plugins(): Downloadable[] {
    return udsData.plugins;
  }

  /**
   * Gets actors list
   */
  get actors(): Downloadable[] {
    return udsData.actors;
  }

  /**
   * Actor errors. Empty array it no errors.
   *
   * @readonly
   * @type {string[]}
   * @memberof UDSApiService
   */
  get errors(): string[] {
    return udsData.errors;
  }

  /* Client enabler */
  enabler(serviceId: string, transportId: string) {
    const enabler = this.config.urls.enabler
      .replace('param1', serviceId)
      .replace('param2', transportId);
    return this.http.get<JSONEnabledService>(enabler);
  }

  /* Check userService status */
  status(
    serviceId: string,
    transportId: string
  ): Observable<JSONStatusService> {
    const status = this.config.urls.status
      .replace('param1', serviceId)
      .replace('param2', transportId);
    return this.http.get<JSONStatusService>(status);
  }

  /* Services resetter */
  action(action: string, serviceId: string) {
    const actionURL = this.config.urls.action
      .replace('param1', serviceId)
      .replace('param2', action);
    return this.http.get<JSONService>(actionURL);
  }

  transportUrl(url: string): Observable<JSONTransportURLService> {
    return this.http.get<JSONTransportURLService>(url);
  }

  /* Images & static related */
  galleryImageURL(imageId: string) {
    return this.config.urls.galleryImage.replace('param1', imageId);
  }

  transportIconURL(transportId: string) {
    return this.config.urls.transportIcon.replace('param1', transportId);
  }

  staticURL(url: string) {
    if (environment.production) {
      return this.config.urls.static + url;
    } else {
      return '/static/' + url;
    }
  }

  /**
   * Gets services information
   */
  getServicesInformation(): Observable<JSONServicesInformation> {
    return this.http.get<JSONServicesInformation>(this.config.urls.services);
  }

  /**
   * Executes custom javascript for service launch if it is available
   */
  executeCustomJSForServiceLaunch(): void {
    // Executes a defined JS on launch servic event if defined
    // this is in fact a hook
    if (udsData.customJSForServiceLaunch !== undefined) {
      // eslint-disable-next-line no-eval
      eval(udsData.customJSForServiceLaunch);
    }
  }

  gotoAdmin() {
    window.location.href = this.config.urls.admin;
  }

  logout() {
    window.location.href = this.config.urls.logout;
  }

  launchURL(udsURL: string): void {
    this.plugin.launchURL(udsURL);
  }

  /**
   * Gets auth custom html code
   *
   * @param authId if of the authenticator
   * @returns  Observable
   */
  getAuthCustomHtml(authId: string) {
    return this.http.get(this.config.urls.customAuth + authId, {
      responseType: 'text',
    });
  }
}
