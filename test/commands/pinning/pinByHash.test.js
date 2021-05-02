import redaxios from 'redaxios';
import pinByHash from '../../../src/commands/pinning/pinByHash';

jest.mock('redaxios');

//common values
const badHashToPin = 'test';
const goodHashToPin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

test('No hashToPin value is provided should error', () => {
    expect(() => {
        pinByHash('test', 'test');
    }).toThrow();
});

test('Invalid HashToPin value is provided', () => {
    expect(() => {
        pinByHash('test', 'test', badHashToPin);
    }).toThrow();
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    redaxios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinByHash('test', 'test', goodHashToPin)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    redaxios.post.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinByHash('test', 'test', goodHashToPin)).rejects.toEqual(Error(`unknown server response while adding to pin queue: ${badStatus}`));
});

test('Rejection handled', () => {
    redaxios.post.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinByHash('test', 'test', goodHashToPin)).rejects.toEqual('test error');
});


