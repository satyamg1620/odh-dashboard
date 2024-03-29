import * as React from 'react';
import { Breadcrumb, Button } from '@patternfly/react-core';
import { useNavigate, useParams } from 'react-router-dom';
import { CogIcon } from '@patternfly/react-icons';
import { BreadcrumbItemType } from '~/types';
import ApplicationsPage from '~/pages/ApplicationsPage';
import MetricsPageTabs from '~/pages/modelServing/screens/metrics/MetricsPageTabs';
import { MetricsTabKeys } from '~/pages/modelServing/screens/metrics/types';
import { PerformanceMetricType } from '~/pages/modelServing/screens/types';
import { TrustyAIContext } from '~/concepts/trustyai/context/TrustyAIContext';
import ServerMetricsPage from '~/pages/modelServing/screens/metrics/performance/ServerMetricsPage';
import { getBreadcrumbItemComponents } from './utils';

type MetricsPageProps = {
  title: string;
  breadcrumbItems: BreadcrumbItemType[];
  type: PerformanceMetricType;
};

const MetricsPage: React.FC<MetricsPageProps> = ({ title, breadcrumbItems, type }) => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const {
    hasCR,
    apiState: { apiAvailable },
  } = React.useContext(TrustyAIContext);

  return (
    <ApplicationsPage
      title={title}
      breadcrumb={<Breadcrumb>{getBreadcrumbItemComponents(breadcrumbItems)}</Breadcrumb>}
      loaded
      description={null}
      empty={false}
      headerAction={
        tab === MetricsTabKeys.BIAS && (
          <Button
            isDisabled={!hasCR || !apiAvailable}
            variant="link"
            icon={<CogIcon />}
            onClick={() => navigate('../configure', { replace: true })}
          >
            Configure
          </Button>
        )
      }
    >
      {type === PerformanceMetricType.SERVER ? <ServerMetricsPage /> : <MetricsPageTabs />}
    </ApplicationsPage>
  );
};

export default MetricsPage;
