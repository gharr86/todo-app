import { Request, Response } from 'express';

import { getToDoList, addToDo, toggleToDo } from './controller';
import { getData } from './utils';

import { AppData, ToDoData } from '../../types';

jest.mock('./utils');

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
  mockGetData.mockReturnValueOnce(mockAppData);

  const newToDo: ToDoData = {
    id: '345cde',
    title: 'Test',
    isDone: false,
  };
  const mockReq: Partial<Request> = { body: newToDo };
  const mockRes: Partial<Response> = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };
});
