import { Request, Response } from 'express';

import { getToDoList, addToDo, toggleToDo } from './controller';
import { getData, saveData } from './utils';
import { ERROR_MESSAGE, BAD_REQUEST_MESSAGE, NOT_FOUND_MESSAGE } from '../../constants';

import { AppData, ToDoData } from '../../types';

jest.mock('./utils', () => {
  const originalModule = jest.requireActual('./utils');

  return {
    ...originalModule,
    getData: jest.fn(),
    saveData: jest.fn(),
  };
});

const mockGetData = getData as jest.MockedFunction<typeof getData>;
const mockSaveData = saveData as jest.MockedFunction<typeof saveData>;

const mockAppData: AppData = {
  data: [
    {
      id: '123abc',
      title: 'Test',
      isDone: false,
    },
  ],
};
let mockRes: Partial<Response>;

beforeEach(() => {
  mockRes = {
    // @ts-ignore: Unreachable code error
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    send: jest.fn(),
  };
});

describe('getToDoList', () => {
  test('when data is received, 200 status is set and data is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);

    const mockReq: Partial<Request> = {};

    getToDoList(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockAppData);
  });

  test('when data is not received, 500 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(undefined);

    const mockReq: Partial<Request> = {};

    getToDoList(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(ERROR_MESSAGE);
  });
});

describe('addToDo', () => {
  test('when body is OK, data is saved', () => {
    mockGetData.mockReturnValueOnce(mockAppData);
  
    const newToDo: ToDoData = {
      id: '234bcd',
      title: 'Test',
      isDone: false,
    };
    const expectedAppData: AppData = { data: mockAppData.data.concat(newToDo) };
    const mockReq: Partial<Request> = { body: newToDo };

    addToDo(mockReq as Request, mockRes as Response);

    expect(mockSaveData).toHaveBeenCalledWith(expectedAppData);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expectedAppData);
  });

  test('when body is not OK, 400 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);
  
    const newToDo = {
      id: '345cde',
      isDone: false,
    };
    const mockReq: Partial<Request> = { body: newToDo };

    addToDo(mockReq as Request, mockRes as Response);

    expect(mockSaveData).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(BAD_REQUEST_MESSAGE);
  });

  test('when data is not received, 500 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(undefined);

    const mockReq: Partial<Request> = {};

    addToDo(mockReq as Request, mockRes as Response);

    expect(mockSaveData).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(ERROR_MESSAGE);
  });
});

describe('toggleToDo', () => {
  test('when id exists in saved data, isDone value is changed and data is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);

    const expectedAppData: AppData = {
      data: [
        {
          id: '123abc',
          title: 'Test',
          isDone: true,
        },
        {
          id: '234bcd',
          title: 'Test',
          isDone: false,
        }
      ],
    };
    const mockReq: Partial<Request> = { params: { id: '123abc' } };
    
    toggleToDo(mockReq as Request, mockRes as Response);

    expect(mockSaveData).toHaveBeenCalledWith(expectedAppData);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expectedAppData);
  });

  test('when id doesnt exist, 404 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);

    const mockReq: Partial<Request> = { params: { id: 'XXX' } };
    
    toggleToDo(mockReq as Request, mockRes as Response);

    expect(mockSaveData).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith(NOT_FOUND_MESSAGE);
  });

  test('when data is not received, 500 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(undefined);

    const mockReq: Partial<Request> = { params: { id: '123abc' } };

    toggleToDo(mockReq as Request, mockRes as Response);

    expect(mockSaveData).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(ERROR_MESSAGE);
  });
});
