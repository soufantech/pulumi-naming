import * as pulumi from '@pulumi/pulumi';

import { createNaming } from '../index';

jest.mock('@pulumi/pulumi');
Object.defineProperty(pulumi, 'getProject', { value: jest.fn().mockReturnValue('network') });
Object.defineProperty(pulumi, 'getStack', { value: jest.fn().mockReturnValue('lab') });

describe('with radical and without resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const naming = createNaming({ radical: 'main', suffix: 'dev', defaultSuffix: true });
        expect(naming()).toBe('main-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const naming = createNaming({ radical: 'main', suffix: 'dev' });
        expect(naming()).toBe('main-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const naming = createNaming({ radical: 'main', defaultSuffix: true });
        expect(naming()).toBe('main-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const naming = createNaming({ radical: 'main' });
        expect(naming()).toBe('main');
    });
});

describe('without radical and without resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const naming = createNaming({ suffix: 'dev', defaultSuffix: true });
        expect(naming()).toBe('network-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const naming = createNaming({ suffix: 'dev' });
        expect(naming()).toBe('network-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const naming = createNaming({ defaultSuffix: true });
        expect(naming()).toBe('network-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const naming = createNaming({});
        expect(naming()).toBe('network');
    });
});

describe('with radical and with resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const naming = createNaming({ radical: 'main', suffix: 'dev', defaultSuffix: true });
        expect(naming('vpc-flow-logs')).toBe('main-vpc-flow-logs-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const naming = createNaming({ radical: 'main', suffix: 'dev' });
        expect(naming('vpc-flow-logs')).toBe('main-vpc-flow-logs-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const naming = createNaming({ radical: 'main', defaultSuffix: true });
        expect(naming('vpc-flow-logs')).toBe('main-vpc-flow-logs-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const naming = createNaming({ radical: 'main' });
        expect(naming('vpc-flow-logs')).toBe('main-vpc-flow-logs');
    });
});

describe('without radical and with resource name', () => {
    it('with suffix and with defaultSuffix', () => {
        const naming = createNaming({ suffix: 'dev', defaultSuffix: true });
        expect(naming('vpc-flow-logs')).toBe('network-vpc-flow-logs-dev');
    });

    it('with suffix and without defaultSuffix', () => {
        const naming = createNaming({ suffix: 'dev' });
        expect(naming('vpc-flow-logs')).toBe('network-vpc-flow-logs-dev');
    });

    it('without suffix and with defaultSuffix', () => {
        const naming = createNaming({ defaultSuffix: true });
        expect(naming('vpc-flow-logs')).toBe('network-vpc-flow-logs-lab');
    });

    it('without suffix and without defaultSuffix', () => {
        const naming = createNaming({});
        expect(naming('vpc-flow-logs')).toBe('network-vpc-flow-logs');
    });
});
