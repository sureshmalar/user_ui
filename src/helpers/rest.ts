export class Rest {
    static getHeaders(type: string) {
       
        const APPLICATION_JSON = 'APPLICATION_JSON';
        let headers = {};
        switch (type) {
            
            case APPLICATION_JSON:
                headers = {
                    'Content-Type': 'application/json',
                }
                return headers;
            default:
                return headers;
        }
    }
}
export enum RestHeader {
    APPLICATION_JSON = 'APPLICATION_JSON',
}