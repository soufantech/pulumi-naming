import * as pulumi from '@pulumi/pulumi';

import { naming } from '../index';

jest.mock('@pulumi/pulumi');
Object.defineProperty(pulumi, 'getProject', { value: jest.fn().mockReturnValue('network') });
Object.defineProperty(pulumi, 'getStack', { value: jest.fn().mockReturnValue('lab') });

describe('with radical and without resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const name = naming({ radical: 'main', suffix: 'dev', defaultSuffix: true });
        expect(name).toBe('main-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const name = naming({ radical: 'main', suffix: 'dev' });
        expect(name).toBe('main-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const name = naming({ radical: 'main', defaultSuffix: true });
        expect(name).toBe('main-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const name = naming({ radical: 'main' });
        expect(name).toBe('main');
    });
});

describe('without radical and without resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const name = naming({ suffix: 'dev', defaultSuffix: true });
        expect(name).toBe('network-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const name = naming({ suffix: 'dev' });
        expect(name).toBe('network-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const name = naming({ defaultSuffix: true });
        expect(name).toBe('network-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const name = naming({});
        expect(name).toBe('network');
    });
});

describe('with radical and with resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const name = naming({ radical: 'main', suffix: 'dev', defaultSuffix: true }, 'vpc-flow-logs');
        expect(name).toBe('main-vpc-flow-logs-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const name = naming({ radical: 'main', suffix: 'dev' }, 'vpc-flow-logs');
        expect(name).toBe('main-vpc-flow-logs-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const name = naming({ radical: 'main', defaultSuffix: true }, 'vpc-flow-logs');
        expect(name).toBe('main-vpc-flow-logs-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const name = naming({ radical: 'main' }, 'vpc-flow-logs');
        expect(name).toBe('main-vpc-flow-logs');
    });
});

describe('without radical and with resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const name = naming({ suffix: 'dev', defaultSuffix: true }, 'vpc-flow-logs');
        expect(name).toBe('network-vpc-flow-logs-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const name = naming({ suffix: 'dev' }, 'vpc-flow-logs');
        expect(name).toBe('network-vpc-flow-logs-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const name = naming({ defaultSuffix: true }, 'vpc-flow-logs');
        expect(name).toBe('network-vpc-flow-logs-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const name = naming({}, 'vpc-flow-logs');
        expect(name).toBe('network-vpc-flow-logs');
    });
});
