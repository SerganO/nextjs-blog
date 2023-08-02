import xfetch from "functions/xfetch";

class Entity {
    private _schema;
    private _entityName;

   /* constructor(opts: any) {
        super(opts);
        this.initSchema(
            ENTITY.STAGE_PAUSE,
            {
                eventId: new schema.Entity(ENTITY.EVENT),
            },
            {idAttribute: 'uuid'},
        );
        this.successCheckCount = 0;
    }

    async function _xfetch(url: string, additionalProperties = {}) {
        const uri = '/api/v2/' + BASE_URL + url;
        return fetch(uri, additionalProperties).then((response) =>
          response.json()
        ) .catch((error) => {
          throw error;
        });
    }

        protected xFetch(
            endpoint: string,
            method: HTTP_METHOD,
            data = {},
            token?: string
        ) {
            let fullUrl = `${config.baseUrl}/api${endpoint}`;
    
            const headers : any = {
                'Access-Control-Allow-Origin':'*'
            };
            if (token) {
                headers['Authorization'] = 'bearer ' + token; // get token from cookies
            }
    
            const controller = new AbortController();
            const params: any = {
                method,
                credentials: 'same-origin',
                headers,
                signal: controller.signal,
            };
    
            if (method !== HTTP_METHOD.GET) {
                params.headers['content-type'] = 'application/json';
                params.body = JSON.stringify(data);
            } else {
                const opts = Object.entries(data)
                    .map(([key, val]) => `${key}=${val}`)
                    .join('&');
                fullUrl += opts.length > 0 ? `?${opts}` : '';
            }
    
            const timeoutId = setTimeout(() => {
                console.log('Request rejected due to the timeout');
                controller.abort();
            }, 5000);
            console.log(method, fullUrl, params);
            return fetch(fullUrl, params)
                .then((response) => {
                    clearTimeout(timeoutId);
                    return response.json().then((json) => ({ json, response }));
                })
                .then(({ json, response }) =>
                    Promise.resolve({
                        success: !!response.ok,
                        response: json,
                    })
                ).catch((e) => {
                    controller.abort();
                    console.error('request excption',fullUrl, e);
                    clearTimeout(timeoutId);
                    return Promise.resolve({
                        success: false,
                        response: {},
                    });
                });
        }

        public xSave = (uri: string, data: any = {}) => {
            actionRequesst(, POST)
        }

            public xRead = (
                uri: string,
                data: any = {},
                method: HTTP_METHOD = HTTP_METHOD.GET
            ) => {
                return actionRequesst()
            }
        
          public xDelete = (uri: string, data: any = {}) => {
          }

        private actionRequesst(url, post/get, data) {
            const data = xfetch(url, );
            nData  = normalize()
            yield put({ type: actionTypes.ADD_FEEDBACK_TO_PRODUCT_SUCCEEDED, payload: { data } });
        }*/
}