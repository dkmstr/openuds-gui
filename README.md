# Uds

This project is related to the web interface of OpenUDS from version 3.0 onwards. This is not usable on previous versions of UDS, so don't try to use it!! :).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

## Development server

Remember editing the "proxy.conf.json" file and adapt it to your needings.

Currently, you will need to use a running UDS server backend in order to run the development environment.

Run `yarn start` for a dev server. Navigate to `http://[YOUR_IP]:9000/`. The app will automatically reload if you change any of the source files.

## Importing into OpenUDS

For importing into UDS, you will need to have python3 available before proceding.

Run `yarn build`. After building is finished, copy the `dist/uds` folder to your uds folder.

## Notes

* The `dist/uds` folder will contain two folders, that will be copied over the existing ones on the `uds` folder of OpenUDS. Do not delete the destination folder, just overwrite existing files, because the build process only build PART of the content on those folders.
* Currently Angular 6 has issues with firefox previous to 50. In order to build for this platforms support, use `yarn f45build`. (This build procedure has only been tested on Linux). The problems are not in fact related to Angular, but related to uglify-js. Angular 7 will probably solve this issue.:

