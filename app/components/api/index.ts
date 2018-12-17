export abstract class DefaultAPIClass {

    public errorObject = (errorText = "", errorCode = 400, isObject = false) => {
        let result = {
            "success": false,
            "data": null,
            "error": {
                "code": errorCode,
                "message": errorText
            }
        };
        if (isObject) {
            result.error.message = '';
            result.error['fullError'] = errorText;
        }
        return result;
    };

    public successObject = (successData = null, isParams = false, params = {}) => {
        let result = {
            "success": true,
            "data": successData
        };
        if (isParams){
            result = {
                ...result,
                ...params
            }
        }
        return result;
    };

    public validateFields = (fieldsObject = [], data = {}) => {
        const result = {
            notFull: false,
            fields: ""
        };
        let isFirst = true;
        fieldsObject.forEach((item) => {
            if (!Object.hasOwnProperty.call(data, item) || !data[item]) {
                result.notFull = true;
                result.fields += (isFirst ? '' : ', ') + item;
                isFirst = false;
            }
        });
        return result
    };

}