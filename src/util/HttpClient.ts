import {Axios} from "axios";

export function getBaseUrl(): string {
    if (process.env.NODE_ENV === 'development') {
        //return 'http://localhost:8080';
        //return 'http://127.0.0.1:8080';
        return 'http://127.0.0.1:8080';
    }

    // eslint-disable-next-line no-restricted-globals
    return location.origin
}


export function doPost(url: string, data: any) {
    const client: Axios = new Axios({baseURL: getBaseUrl()});
    return client.request({
        url: url, data: JSON.stringify(data),
        method: "POST",
        headers: {
            "Content-Type":
                "application/json"
        }
    }).then((res) => {
        const p: any = JSON.parse(res.data)
        if (p.success) {
            return Promise.resolve(p.data);
        } else {
            return Promise.reject(p.errorMsg)
        }
    }).catch(err => {
        return Promise.reject(err)
    })
}
