import redaxios from 'redaxios';
import testAuthentication from '../../../src/commands/data/testAuthentication';

jest.mock('redaxios');

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    redaxios.get.mockResolvedValue(badStatus);
    expect.assertions(1);
    return expect(testAuthentication('test', 'test')).rejects.toEqual(Error(`unknown server response while authenticating: ${badStatus}`));
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200
    };
    redaxios.get.mockResolvedValue(goodStatus);
    expect.assertions(1);
    return expect(testAuthentication('test', 'test')).resolves.toEqual({
        authenticated: true
    });
});

test('Rejection handled', () => {
    redaxios.get.mockRejectedValue('test error');
    expect.assertions(1);
    return expect(testAuthentication('test', 'test')).rejects.toEqual('test error');
});
