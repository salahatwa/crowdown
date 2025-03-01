
import { environment } from "src/environments/environment";

// export default class Adapter {
//     loader;
//     reader;
//     config;
//     constructor(loader, config) {
//         this.loader = loader;
//         this.config = config;



//         console.log(config);
//     }


//     public async upload(): Promise<any> {
//         const value = await this.loader.file;
//         console.log(value);
//         return this.read(value);
//     }

//     read(file) {
//         console.log(file);
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();

//             reader.onload = function () {
//                 resolve({ default: reader.result });
//             };

//             reader.onerror = function (error) {
//                 reject(error);
//             };

//             reader.onabort = function () {
//                 reject();
//             };
//             reader.readAsDataURL(file);
//         });
//     }

//     abort() {
//         if (this.reader) {
//             this.reader.abort();
//         }
//     }
// }


export default class Adapter {
    loader;
    url;
    xhr;
    reader;

    constructor(loader) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;

        // URL where to send files.
        this.url = `${environment.URL}/attachments/uploads`;
    }

    // Starts the upload process.
    async upload() {
        const value = await this.loader.file;
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        });
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response?.data[0].thumbPath
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    async _sendRequest() {
        const data = new FormData();

       
        // let file = await this.loader.file;
        // const reader = new FileReader();
        data.append('files', await this.loader.file);
        // Authorization: `Bearer ${token}`,
        let token = JSON.parse(localStorage.getItem('auth'))?.accessToken;
        this.xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        this.xhr.send(data);
    }
}

