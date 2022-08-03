export const mockInitIndex = jest.fn();
export const mockSaveObjects = jest.fn();
export const mockSaveObject = jest.fn();
export const mockPartialUpdateObjects = jest.fn();
export const mockPartialUpdateObject = jest.fn();
export const mockDeleteObjects = jest.fn();
export const mockDeleteObject = jest.fn();
export const mockListApiKeys = jest.fn();

export const mockAlgoliaIndex = jest.fn().mockReturnValue({
  saveObjects: mockSaveObjects,
  saveObject: mockSaveObject,
  partialUpdateObjects: mockPartialUpdateObjects,
  partialUpdateObject: mockPartialUpdateObject,
  deleteObjects: mockDeleteObjects,
  deleteObject: mockDeleteObject,
  listApiKeys: mockListApiKeys
});

export const mockAlgolia = jest.fn().mockReturnValue({
  initIndex: mockAlgoliaIndex,
});

export default mockAlgolia