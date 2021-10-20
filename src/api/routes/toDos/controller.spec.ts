import { Request, Response } from 'express';

import { getToDoList, addToDo, toggleToDo } from './controller';
import { getData } from './utils';

import { AppData, ToDoData } from '../../types';

jest.mock('./utils', () => {
  const originalModule = jest.requireActual('./utils');

  return {
    ...originalModule,
    getData: jest.fn(),
  };
});

const mockGetData = getData as jest.MockedFunction<typeof getData>;

const mockAppData: AppData = {
  data: [
    {
      id: '123abc',
      title: 'Test',
      isDone: false,
    },
    {
      id: '234bcd',
      title: 'Test',
      isDone: false,
    },
  ],
};

describe('getToDoList', () => {
  test('when data is received, 200 status is set and data is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);

    const mockReq: Partial<Request> = {};
    const mockRes: Partial<Response> = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    getToDoList(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockAppData);
  });

  test('when data is not received, 500 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(undefined);

    const mockReq: Partial<Request> = {};
    const mockRes: Partial<Response> = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };

    getToDoList(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Something went wrong :(');
  });
});

describe('addToDo', () => {
  test('when body is OK, data is saved', () => {
    mockGetData.mockReturnValueOnce(mockAppData);
  
    const newToDo: ToDoData = {
      id: '345cde',
      title: 'Test',
      isDone: false,
    };
    const newAppData: AppData = { data: mockAppData.data.concat(newToDo) };
    const mockReq: Partial<Request> = { body: newToDo };
    const mockRes: Partial<Response> = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn(),
    };

    addToDo(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(newAppData);
  });

  test('when body is not OK, 400 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);
  
    const newToDo = {
      id: '345cde',
      isDone: false,
    };
    const mockReq: Partial<Request> = { body: newToDo };
    const mockRes: Partial<Response> = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn(),
    };

    addToDo(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Bad request :(');
  });

  test('when data is not received, 500 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(undefined);

    const mockReq: Partial<Request> = {};
    const mockRes: Partial<Response> = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn(),
    };

    addToDo(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Something went wrong :(');
  });
});

describe('toggleToDo', () => {
  test('when id exists in saved data, isDone value is changed and data is sent', () => {
    mockGetData.mockReturnValueOnce(mockAppData);
  
    const newToDo: ToDoData = {
      id: '345cde',
      title: 'Test',
      isDone: false,
    };
    const newAppData: AppData = { data: mockAppData.data.concat(newToDo) };
    const mockReq: Partial<Request> = { params: { id: '123abc' } };
    const mockRes: Partial<Response> = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
      send: jest.fn(),
    };
    
    toggleToDo(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(newAppData);
  });

  test('', () => {});

  test('', () => {});
});
