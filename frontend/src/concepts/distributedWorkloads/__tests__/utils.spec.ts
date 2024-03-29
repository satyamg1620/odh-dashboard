import { mockWorkloadK8sResource } from '~/__mocks__/mockWorkloadK8sResource';
import { getStatusCounts, getStatusInfo } from '~/concepts/distributedWorkloads/utils';

describe('getStatusInfo', () => {
  it('provides correct info for completed workload', () => {
    const wl = mockWorkloadK8sResource({ k8sName: 'test-workload' });
    const info = getStatusInfo(wl);
    expect(info.color).toBe('green');
    expect(info.message).toBe('Job finished successfully');
    expect(info.status).toBe('Succeeded');
  });
});

describe('getStatusCounts', () => {
  it('correctly aggregates counts of workload statuses', () => {
    const workloads = [
      mockWorkloadK8sResource({ k8sName: 'test-workload' }),
      mockWorkloadK8sResource({ k8sName: 'test-workload-2' }),
    ];
    const statusCounts = getStatusCounts(workloads);
    expect(statusCounts).toEqual({
      Inadmissible: 0,
      Pending: 0,
      Running: 0,
      Succeeded: 2,
      Failed: 0,
      Unknown: 0,
    });
  });
});
