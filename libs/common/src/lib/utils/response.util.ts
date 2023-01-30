import { Operations, responses } from "../constants";
import { IResponse } from "../interfaces";

export class ResponseUtil {
    public static prepareAsyncResponse(operation: Operations, data?: any[] | any): Promise<IResponse> {
        return new Promise<IResponse>((resolve) => resolve(ResponseUtil.prepareResponse(operation, data)));       
    }

    public static prepareResponse(operation: Operations, data?: any[]| any): IResponse {
        return {...responses[operation], data}
    }
}