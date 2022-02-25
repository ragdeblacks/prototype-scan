import { DataInfoTest } from '../core/models/dataInfoTest';
import Data from '../mocks/jsonMocks/data.json';
export class MockDataInfo {
    dataResponses: DataInfoTest;
    testingData() {
      const data = Data;
      this.dataResponses = data;
      return this.dataResponses;
    }

}
